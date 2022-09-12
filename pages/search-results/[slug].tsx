import { get } from "lodash";
import { useEffect, useState } from "react";

import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Loader from "components/Loader/Loader";
import Pagination from "components/Pagination/Pagination";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import BizlistingApi from "services/biz-listing";

import TabsHorizontal from "components/TabsHorizontal/TabsHorizontal";
import { categories } from "constant";
import { CategoryText } from "enums";
import { useRouter } from "next/router";
import styles from "styles/Home.module.scss";
import {
  changeToSlug,
  formatBizlistingArray,
  formatCardItemProps,
  getListingUrl,
} from "utils";

type Object = {
  [key: string]: any;
};

const allTab = [{ label: "All", value: undefined }];
const categoryTabList: any[] = categories.map((item) => ({
  label: item.slug,
  value: item.slug,
}));
const tabList: any[] = allTab.concat(categoryTabList);

const Collection = (props) => {
  const { slug } = props;
  const router = useRouter();

  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<CategoryText | undefined>();
  const [pagination, setPagination] = useState(defaultPagination);
  const [collection, setCollection] = useState<Object[]>([]);
  const [collectionDetail, setCollectionDetail] = useState<Object>({});
  const [listing, setListing] = useState<Object[]>([]);

  useEffect(() => {
    getData(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, slug, selectedTab]);

  const getData = async (search) => {
    setLoading(true);
    let params: any = {
      search: changeToSlug(search),
      page: pagination.page,
      limit: pagination.limit,
    };
    if (selectedTab) {
      params.categories = selectedTab;
    }
    const data = await BizlistingApi.getListingCustom(params);
    if (data) {
      const rawListing = formatBizlistingArray(get(data, "data.data"));
      setListing(rawListing);
      setLoading(false);
      setPagination({
        ...pagination,
        total: get(data, "data.meta.pagination.total"),
      });
    }
  };

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  return (
    <div>
      <SectionLayout className="py-0 pb-3">
        <div className={styles.breadcrumbs}>
          <span onClick={() => router.push("/")}>Home</span>{" "}
          <Icon icon="carret-right" size={14} color="#7F859F" />
          Collection
        </div>
      </SectionLayout>
      <SectionLayout title="Search">
        <h5>
          {pagination.total} Result{pagination.total > 0 && "s"} for{" "}
          {'"' + slug + '"'}
        </h5>
      </SectionLayout>
      <SectionLayout>
        <div className="flex">
          <TabsHorizontal
            tablist={tabList}
            type="secondary-no-outline"
            selectedTab={selectedTab}
            className="pt-[6px]"
            onChangeTab={(e: CategoryText) => setSelectedTab(e)}
          />
        </div>
      </SectionLayout>
      <SectionLayout>
        <div className="flex flex-wrap gap-3 md:gap-2 lg:gap-5">
          {Array.isArray(listing) &&
            listing.map((item) => (
              <div key={item?.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(item)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(item, "categories[0]"),
                        get(item, "categoryLinks[0].attributes.value"),
                        item.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
        </div>
        <TopSearches />
      </SectionLayout>
      <SectionLayout show={pagination.total > 1}>
        <Pagination
          limit={28}
          currentPage={pagination.page}
          key={pagination.page}
          total={pagination.total}
          onPageChange={(selected) =>
            setPagination({ ...pagination, page: selected.selected })
          }
        />
      </SectionLayout>
      {/* <Filter onClose={() => setShowFilter(false)} visible={showFilter} /> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  const { slug } = context.query;
  return { props: { slug: slug } };
}

export default Collection;

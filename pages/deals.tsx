import get from "lodash/get";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Loader from "components/Loader/Loader";
import Pagination from "components/Pagination/Pagination";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";

import TabsHorizontal from "components/TabsHorizontal/TabsHorizontal";
import { categories } from "constant";
import { Categories } from "enums";
import Head from "next/head";
import bizListingApi from "services/biz-listing";
import styles from "styles/Home.module.scss";
import {
  formatBizlistingArray,
  formatCardItemProps,
  getListingUrl,
} from "utils";

const allTab = [{ label: "All", value: undefined }];
const categoryTabList: any[] = categories.map((item) => ({
  label: item.slug,
  value: item.value,
}));
const tabList: any[] = allTab.concat(categoryTabList);

const Deals = () => {
  const router = useRouter();
  const { query } = router;

  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [metaTitle, setMetaTitle] = useState(
    "Deals of the Day | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Explore and discover deals from Muslim Friendly brands!"
  );

  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<Categories>();
  const [pagination, setPagination] = useState(defaultPagination);
  const [listingsHaveDeals, setListingsHaveDeals] = useState<{
    [key: string]: any;
  }>([]);

  useEffect(() => {
    const getListingsHaveDeals = async () => {
      const response = await bizListingApi.getListingCustom({
        idCategory: selectedTab,
        limit: 28,
        hasDeals: true,
        page: pagination.page,
      });
      const mappedData = formatBizlistingArray(get(response, "data.data"));
      setPagination({
        ...pagination,
        total: get(response, "data.meta.pagination.total"),
      });
      setListingsHaveDeals(mappedData);
      setLoading(false);
    };

    getListingsHaveDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, selectedTab]);

  if (loading) {
    return (
      <SectionLayout childrenClassName="flex justify-center">
        <Loader />
      </SectionLayout>
    );
  }

  const handleHref = (item: any) => {
    const url = `/${getListingUrl(
      get(item, "categories[0]"),
      get(item, "categoryLinks[0].attributes.value"),
      item.slug
    )}`;
    router.push(
      {
        pathname: url,
        query: { referrer: "deals" },
      },
      url
    );
  };

  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <SectionLayout className="py-0 pb-3">
        <div className={styles.breadcrumbs}>
          <span onClick={() => router.push("/")}>Home</span>{" "}
          <Icon icon="carret-right" size={14} color="#7F859F" />
          Deals
        </div>
      </SectionLayout>
      <SectionLayout className={styles.collection_banner}>
        <Image
          src={require("public/images/deals-banner.svg")}
          alt="deals-banner"
          layout="fill"
          objectFit="cover"
          className={styles.collection_banner_img}
        />
        <div className={styles.collection_context_container}>
          <h1 className={styles.collection_name}>Exclusive deals</h1>
          <h2 className={styles.collection_description}>
            Get the hottest and earliest promotions
          </h2>
        </div>
      </SectionLayout>
      <SectionLayout childrenClassName="flex justify-between flex-wrap">
        <div className="flex">
          <TabsHorizontal
            tablist={tabList}
            type="secondary-no-outline"
            selectedTab={selectedTab}
            className="pt-[6px]"
            onChangeTab={(e: Categories) => setSelectedTab(e)}
          />
        </div>
      </SectionLayout>
      <SectionLayout>
        <div className="flex flex-wrap justify-between sm:justify-start sm:gap-10">
          {Array.isArray(listingsHaveDeals) &&
            listingsHaveDeals.map((item) => (
              <div key={item?.title} className="sm:pb-5 m:pl-3 pt-3">
                <InforCard
                  {...formatCardItemProps(item)}
                  onClick={() => handleHref(item)}
                />
              </div>
            ))}
        </div>
        <TopSearches />
      </SectionLayout>
      <SectionLayout show={pagination.total > 1}>
        <Pagination
          limit={30}
          total={pagination.total}
          onPageChange={(selected) =>
            setPagination({ ...pagination, page: selected.selected })
          }
        />
      </SectionLayout>
    </div>
  );
};

export default Deals;

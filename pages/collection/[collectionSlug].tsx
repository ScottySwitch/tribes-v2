import { get } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";

import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Loader from "components/Loader/Loader";
import Pagination from "components/Pagination/Pagination";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import CollectionApi from "services/collection";

import { categories } from "constant";
import { CategoryText } from "enums";
import { useRouter } from "next/router";
import styles from "styles/Home.module.scss";
import {
  changeToSlug,
  formatBizlistingArray,
  formatCardItemProps,
  getListingUrl,
  isArray,
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
  const { collectionSlug } = props;
  const router = useRouter();

  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<CategoryText | undefined>();
  const [pagination, setPagination] = useState(defaultPagination);
  const [collection, setCollection] = useState<Object[]>([]);
  const [collectionDetail, setCollectionDetail] = useState<Object>({});
  const [listing, setListing] = useState<Object[]>([]);

  useEffect(() => {
    const getCollection = async () => {
      const response = await CollectionApi.getAllCollectionByCollectionSlug(
        collectionSlug
      );
      const listingsOfCollection = get(
        response,
        "data.data[0].attributes.biz_listings.data"
      );
      const banner = get(
        response,
        "data.data[0].attributes.banner.data.attributes.url"
      );
      const bannerMobile =
        get(
          response,
          "data.data[0].attributes.banner_mobile.data.attributes.url"
        ) || banner;
      const collectionName = get(response, "data.data[0].attributes.name");
      const description = get(response, "data.data[0].attributes.description");

      const collectionDetailObject = {
        collectionName,
        description,
        banner,
        bannerMobile,
      };
      const mappedListings = isArray(listingsOfCollection)
        ? formatBizlistingArray(listingsOfCollection)
        : [];
      setCollection(mappedListings);
      setListing(mappedListings);
      setLoading(false);
      if (collectionName && description && banner) {
        setCollectionDetail(collectionDetailObject);
      }
    };

    getCollection();
  }, [pagination, collectionSlug]);

  useEffect(() => {
    const arrayFilterListing = collection.filter(
      (item) => changeToSlug(get(item, "categories[0]")) === selectedTab
    );
    selectedTab ? setListing(arrayFilterListing) : setListing(collection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

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
      <SectionLayout className={styles.collection_banner}>
        {collectionDetail.banner && (
          <Image
            src={collectionDetail.banner}
            alt="banner"
            layout="fill"
            objectFit="cover"
            className={`${styles.collection_banner_img} ${styles.collection_banner_desktop}`}
          />
        )}
        {collectionDetail.bannerMobile && (
          <Image
            src={collectionDetail.bannerMobile}
            alt="banner"
            layout="fill"
            objectFit="cover"
            className={styles.collection_banner_mobile}
          />
        )}
        <div className={styles.collection_context_container}>
          <h1 className={styles.collection_name}>
            {collectionDetail.collectionName}
          </h1>
          <h2 className={styles.collection_description}>
            {collectionDetail.description}
          </h2>
        </div>
      </SectionLayout>
      {/* <SectionLayout>
        <div className="flex">
          <TabsHorizontal
            tablist={tabList}
            type="secondary-no-outline"
            selectedTab={selectedTab}
            className="pt-[6px]"
            onChangeTab={(e: CategoryText) => setSelectedTab(e)}
          />
        </div>
      </SectionLayout> */}
      <SectionLayout>
        <div className="flex flex-wrap gap-3 md:gap-2 lg:gap-5">
          {Array.isArray(listing) &&
            listing.map((item) => (
              <div key={item?.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(item)}
                  onClick={() => {
                    router.push(
                      `/${getListingUrl(
                        get(item, "categories[0]"),
                        get(item, "categoryLinks[0].attributes.value"),
                        item.slug
                      )}`
                    );
                  }}
                />
              </div>
            ))}
        </div>
        <TopSearches />
      </SectionLayout>
      <SectionLayout show={pagination.page > 1}>
        <Pagination
          limit={30}
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
  const { collectionSlug } = context.query;
  return { props: { collectionSlug: collectionSlug } };
}

export default Collection;

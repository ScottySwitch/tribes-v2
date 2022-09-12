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

import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import { categories } from "constant";
import { Categories } from "enums";
import bizListingApi from "services/biz-listing";
import styles from "styles/Home.module.scss";
import { formatCardItemProps } from "utils";

const categoryTabList: ITab[] = categories.map((item) => ({
  label: item.slug,
  value: item.value,
  content: <div></div>,
}));

const Deals = () => {
  const router = useRouter();
  const { query } = router;

  const defaultPagination = { page: 1, total: 0, limit: 28 };

  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<Categories>(Categories.BUY);
  const [pagination, setPagination] = useState(defaultPagination);
  const [listingsHaveDeals, setListingsHaveDeals] = useState<{
    [key: string]: any;
  }>([]);

  useEffect(() => {
    const getListingsHaveDeals = async () => {
      const response = await bizListingApi.getBizListingsHaveDealsByCategoryId(
        selectedTab
      );
      const mappedData =
        Array.isArray(get(response, "data.data")) &&
        get(response, "data.data").map((item) => ({
          images: get(item, "attributes.images") || [],
          title: get(item, "attributes.name"),
          slug: get(item, "attributes.slug"),
          isVerified: get(item, "attributes.is_verified"),
          address: get(item, "attributes.address"),
          country: get(item, "attributes.country"),
          description: get(item, "attributes.description"),
          price: get(item, "attributes.min_price") || "",
          currency: get(item, "attributes.currency") || "",
        }));
      setListingsHaveDeals(mappedData);
      setLoading(false);
    };

    getListingsHaveDeals();
  }, [pagination, selectedTab]);

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
          Deals
        </div>
      </SectionLayout>
      <SectionLayout className={styles.collection_banner}>
        <Image
          src={require("public/images/deals-banner.svg")}
          alt="collections-banner"
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
            tablist={categoryTabList}
            type="secondary-no-outline"
            selectedTab={selectedTab}
            className="pt-[6px]"
            onChangeTab={(e: Categories) => setSelectedTab(e)}
          />
        </div>
      </SectionLayout>
      <SectionLayout>
        <div className="flex flex-wrap gap-10">
          {Array.isArray(listingsHaveDeals) &&
            listingsHaveDeals.map((item) => (
              <div key={item?.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(item)}
                  onClick={() => router.push(`/biz/home/${item.slug}`)}
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
    </div>
  );
};

export default Deals;

import get from "lodash/get";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import Carousel from "components/Carousel/Carousel";
import CollectionCard from "components/CollectionCard/CollectionCard";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import {
  categories,
  curatedList,
  homeBannerResponsive,
  homeCuratedResponsive,
  infoCardResponsive,
} from "constant";
import { UserInforContext } from "Context/UserInforContext";
import { CategoryText } from "enums";
import BannerApi from "services/banner";
import BizListingApi from "services/biz-listing";
import CollectionApi from "services/collection";
import {
  formatBanner,
  formatCardItemProps,
  formatListingArray,
  getListingUrl,
  isArray,
} from "utils";

import { NextPage } from "next";
import styles from "styles/Home.module.scss";

const Home: NextPage = (props: any) => {
  const { listingExclusiveDeal, listBanners, listCollections, listingData } =
    props;

  const { user } = useContext(UserInforContext);
  const { location } = user;

  const router = useRouter();
  const { locale } = router;
  const [listings, setListings] = useState(
    listingData[location || "singapore"]
  );

  useEffect(() => {
    setListings(listingData[location]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const metaDescription =
    "Register. Don't have a Tribes account yet? Join now to gain access to exclusive deals from Muslim Friendly brands around the world!";
  const metaTitles = {
    en: "Tribes: Get travel information and recommendation for what to eat, buy, things to do, where to stay and how to get there",
    sg: "Tribes: Get travel information and recommendation for what to eat, buy, things to do, where to stay and how to get there",
    id: "Tribes: Get travel information and recommendation for what to eat, buy, things to do, where to stay and how to get there",
  };

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
        <title>{metaTitles[locale || "sg"]}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      {isArray(listBanners) && (
        <SectionLayout>
          <Carousel responsive={homeBannerResponsive}>
            {listBanners.map((img, index) => (
              <div
                key={index}
                className={styles.banner_card}
                onClick={() => router.push(`${img.linkActive}`)}
              >
                <Image
                  alt="banner"
                  layout="fill"
                  src={img.imgUrl}
                  objectFit="contain"
                  quality={65}
                  priority={index < 3}
                  sizes="(min-width: 75em) 33vw,
                  (min-width: 48em) 50vw,
                  100vw"
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      <SectionLayout title="Explore BESTS" childrenClassName={styles.bests}>
        {categories.map((item) => (
          <div
            key={item.slug}
            className={styles.category}
            onClick={() => router.push(item.slug)}
          >
            <div className={styles.category_icon}>
              <Icon size={60} icon={item.icon} />
            </div>
            <div className={styles.category_label}>{item.label}</div>
          </div>
        ))}
      </SectionLayout>
      {isArray(listingExclusiveDeal) && (
        <SectionLayout
          title="Brands With Exclusive Deals For You"
          seeMore="/deals"
        >
          <Carousel responsive={infoCardResponsive}>
            {listingExclusiveDeal.map((card) => (
              <div key={card.name} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() => handleHref(card)}
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(listCollections) && (
        <SectionLayout backgroundColor title="Specially Curated For You">
          <Carousel responsive={homeCuratedResponsive}>
            {listCollections.map((item, index) => (
              <div key={item.slug}>
                <CollectionCard
                  slug={item.slug}
                  title={item.title}
                  imgUrl={item.imgUrl}
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(get(listings, "buy")) && (
        <SectionLayout title="Where to Buy" seeMore={CategoryText.BUY}>
          <Carousel responsive={infoCardResponsive}>
            {listings.buy.map((card, index) => {
              return (
                <div key={card.title} className="pb-5 pt-3 pl-3">
                  <InforCard
                    {...formatCardItemProps(card)}
                    onClick={() =>
                      router.push(
                        `/${getListingUrl(
                          get(card, "categories[0]"),
                          get(card, "categoryLinks[0]"),
                          card.slug
                        )}`
                      )
                    }
                  />
                </div>
              );
            })}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(get(listings, "seeAndDo")) && (
        <SectionLayout title="What to See" seeMore={CategoryText.SEE_AND_DO}>
          <Carousel responsive={infoCardResponsive}>
            {listings.seeAndDo.map((card, index) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        card.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {/* <SectionLayout backgroundColor title="Featured Articles">
        <Carousel responsive={homeCuratedResponsive}>
          {listHomeArticles.map((item, index) => (
            <div key={index} className="pb-5 pt-3 pl-3">
              <ArticleCard
                title={item.title}
                imgUrl={item.imgUrl}
                time={item.time}
                onClick={() => router.push(`/articles/${item.slug}`)}
              />
            </div>
          ))}
        </Carousel>
      </SectionLayout> */}
      {isArray(get(listings, "eat")) && (
        <SectionLayout title="What to Eat" seeMore={CategoryText.EAT}>
          <Carousel responsive={infoCardResponsive}>
            {listings.eat.map((card, index) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        card.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(get(listings, "transport")) && (
        <SectionLayout
          title="Access to Transport"
          seeMore={CategoryText.TRANSPORT}
        >
          <Carousel responsive={infoCardResponsive}>
            {listings?.transport.map((card, index) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        card.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {isArray(get(listings, "stay")) && (
        <SectionLayout title="Where to Stay" seeMore={CategoryText.STAY}>
          <Carousel responsive={infoCardResponsive}>
            {listings.stay.map((card, index) => (
              <div key={card.title} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  onClick={() =>
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        card.slug
                      )}`
                    )
                  }
                />
              </div>
            ))}
          </Carousel>
        </SectionLayout>
      )}
      {/* {isArray(listingForYou) && (
        <div>
          <SectionLayout className={styles.for_you}>
            <div className={styles.for_you_tag}>
              <Icon
                icon="user-fill-1"
                size={30}
                className={styles.for_you_icon}
              />
              <div>For you</div>
            </div>
          </SectionLayout>
          <SectionLayout childrenClassName={styles.for_you_container}>
            {listingForYou?.map((card, index) => (
              <div key={card.title} className="pb-5 pt-3">
                 <InforCard 
                  imgUrl={card.images[0]}
                  title={card.title}
                  rate={card.rate}
                  rateNumber={card.rateNumber}
                  followerNumber={card.followerNumber}
                  price={card.price}
                  currency={card?.currency?.toUpperCase()}
                  categories={card.categories}
                  tags={card.tags}
                  isVerified={card.isVerified}
                  description={card.description}
                  onClick={() => router.push(`/biz/home/${card.slug}`)}
                />
              </div>
            ))}
          </SectionLayout>
          <SectionLayout childrenClassName="flex justify-center">
            <Button
              isLoading={loading}
              variant={loading ? "primary" : "outlined"}
              text="Load more"
              width={400}
              onClick={() => getBizListingForYou()}
            />
          </SectionLayout>
        </div>
      )} */}
      <div className={styles.introduction}>
        <SectionLayout transparent>
          <h1 className={styles.header}>
            A <span>Curated Platform & Experience</span>
            <p>For The Muslim Lifestyle</p>
          </h1>
          {curatedList.map((item, index) => (
            <div key={index} className="flex gap-3 mt-5">
              <Icon icon="star-2" color="#e60112" />
              <div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.content}>{item.content}</div>
              </div>
            </div>
          ))}
        </SectionLayout>
      </div>
      <SectionLayout>
        <TopSearches />
      </SectionLayout>
    </div>
  );
};

export async function getServerSideProps(context) {
  const getListingsByLocation = async (location) => {
    const data = await BizListingApi.getAllBizlitingPinnedByCategory(location);

    const buyListingArray = formatListingArray(get(data, "data.data[0]"));
    const seeListingArray = formatListingArray(get(data, "data.data[1]"));
    const eatListingArray = formatListingArray(get(data, "data.data[2]"));
    const stayListingArray = formatListingArray(get(data, "data.data[4]"));
    const transportListingArray = formatListingArray(get(data, "data.data[3]"));

    return {
      buy: buyListingArray,
      eat: eatListingArray,
      seeAndDo: seeListingArray,
      stay: stayListingArray,
      transport: transportListingArray,
    };
  };

  const listingData = {
    singapore: await getListingsByLocation("singapore"),
    malaysia: await getListingsByLocation("malaysia"),
    indonesia: await getListingsByLocation("indonesia"),
  };

  // Pass data to the page via props
  const dataBanners = await BannerApi.getBannerCustom({
    pinnedHomepage: true,
  });
  const dataExclusiveDeal =
    await BizListingApi.getAllBizListingsHaveExclusiveDeal();
  const dataCollections = await CollectionApi.getCollection({
    pinnedHomepage: true,
  });

  const rawListBanners = get(dataBanners, "data.data");
  const rawListCollections = get(dataCollections, "data.data");

  const exclusiveDealListingArray = formatListingArray(
    get(dataExclusiveDeal, "data.data")
  );
  const bannerArray = formatBanner(rawListBanners);
  const collectionArray =
    Array.isArray(rawListCollections) &&
    rawListCollections.map((item) => ({
      imgUrl: item.thumbnail || null,
      slug: item.slug,
      title: item.name,
    }));

  return {
    props: {
      listingExclusiveDeal: exclusiveDealListingArray,
      listBanners: JSON.parse(JSON.stringify(bannerArray)),
      listCollections: collectionArray,
      listingData: listingData,
      // listHomeArticles: homeArticleArray,
    },
  };
}

export default Home;

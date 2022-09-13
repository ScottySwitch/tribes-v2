import classNames from "classnames";
import ArticleCard from "components/ArticleCard/ArticleCard";
import AuthPopup from "components/AuthPopup/AuthPopup";
import Carousel from "components/Carousel/Carousel";
import DealsDetailsModal, {
  IDealsDetails,
} from "components/DealDetailModal/DealDetailModal";
import DividerSection from "components/DividerSection/DividerSection";
import InforCard from "components/InforCard/InforCard";
import Loader from "components/Loader/Loader";
import BannerLayout1 from "components/MicrositePage/Layout1/Banner";
import BannerLayout2 from "components/MicrositePage/Layout2/Banner";
import ProductDetailsModal from "components/ProductDetailModal/ProductDetailModal";
import PromotionCard from "components/PromotionCard/PromotionCard";
import ScrollingBox from "components/ScrollingBox/ScrollingBox";
import SectionLayout from "components/SectionLayout/SectionLayout";
import style from "components/SectionLayout/SectionLayout.module.scss";
import { homeCuratedResponsive, micrositeBannerResponsive } from "constant";
import { MicrositeLayouts } from "enums";
import { orderBy, trim } from "lodash";
import get from "lodash/get";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PromotionApi from "services/promotion";
import styles from "styles/Promotions.module.scss";
import {
  formatArrayImages,
  formatArticle,
  formatCardItemProps,
  formatListingItems,
  getListingUrl,
  isArray,
} from "utils";

const PromotionsPage = () => {
  const [showModalDealsDetails, setShowModalDealsDetails] = useState<boolean>();
  const [dealsDetails, setDealsDetails] = useState<IDealsDetails>(
    {} as IDealsDetails
  );
  const [showModalProductDetails, setShowModalProductDetails] =
    useState<boolean>();

  const router = useRouter();

  const handleDealsDetails = (value: boolean, dealInfo?: any) => {
    setShowModalDealsDetails(value);
    if (dealInfo) {
      setDealsDetails(dealInfo);
    }
  };

  const handleShare = () => {
    console.log("handleShare");
  };

  const handleFavourite = () => {
    console.log("handleFavourite");
  };

  const {
    query: { slug },
  } = useRouter();

  interface IType {
    [key: string]: any;
  }
  [];
  const [bizListings, setBizListings] = useState<any>([]);
  const [promotion, setPromotion] = useState<any>([]);
  const [banners, setBanners] = useState<any>([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [backgroundColorBar, setBackgroundColorBar] = useState([]);
  const [titleColor, setTitleColor] = useState([]);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [articleArray, setArticleArray] = useState<IType[]>([]);
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [products, setProducts] = useState<{ [key: string]: any }[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [layout, setLayout] = useState("");
  const [content, setContent] = useState("");
  const [sliderBanner, setSliderBanner] = useState<string[]>([]);
  const [orderLayout, setOrderLayout] = useState<string[]>([]);
  const [listing, setListing] = useState<any>();

  useEffect(() => {
    const getPromotionBySlug = async (slug) => {
      const data = await PromotionApi.getPromotionBySlug(slug);
      const promotionData = get(data, "data.data");
      if (promotionData.length === 0) {
        router.push("/");
      }
      const rawArticle = formatArticle(
        get(promotionData, "[0].attributes.microsite_articles.articles.data")
      );
      const arrayImages = formatArrayImages(
        get(promotionData, "[0].attributes.main_banner.data")
      );
      const arrayBanner = formatArrayImages(
        get(promotionData, "[0].attributes.slider_banner.data")
      );
      let rawProducts = orderBy(
        get(promotionData, "[0].attributes.products.data"),
        ["is_pinned"],
        ["desc"]
      );
      const formatProducts = formatListingItems(rawProducts);
      const rawLayouts =
        get(promotionData, "[0].attributes.order_section") &&
        trim(get(promotionData, "[0].attributes.order_section")).split(",");
      setOrderLayout(rawLayouts);
      setLayout(get(promotionData, "[0].attributes.layout"));
      setContent(get(promotionData, "[0].attributes.content_banner"));
      setBanners(arrayImages);
      setSliderBanner(arrayBanner);
      setPromotion(get(promotionData, "[0].attributes"));
      setIsLoading(false);
      setBizListings(
        get(promotionData, "[0].attributes.microsite_biz_listings")
      );
      setArticleArray(rawArticle);
      setBackgroundColor(get(promotionData, "[0].attributes.background_color"));
      setBackgroundColorBar(
        get(promotionData, "[0].attributes.background_color_bar")
      );
      setTitleColor(get(promotionData, "[0].attributes.title_color"));
      setMetaTitle(get(promotionData, "[0].attributes.meta_title"));
      setMetaDescription(get(promotionData, "[0].attributes.meta_description"));
      setProducts(formatProducts);
    };
    if (slug) {
      getPromotionBySlug(slug).catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const checkLogin = () => {
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (userInfo.token) {
      handleDealsDetails(true, promotion);
    } else {
      setShowAuthPopup(true);
    }
  };

  const handleOpenDetailModal = (item) => {
    setSelectedProduct(item);
    setShowDetailModal(true);
  };

  const sectionLayoutStyle: any = {
    backgroundColor: backgroundColor ? backgroundColor : "#fef1f2",
  };
  if (isLoading) {
    return <Loader />;
  }

  const SectionBizlistings = () =>
    isArray(bizListings) &&
    bizListings.map((bizListing, index) => {
      const dataBizlisting = get(bizListing, "biz_listings.data");
      return (
        <div key={index}>
          {isArray(dataBizlisting) && (
            <SectionLayout
              className={classNames(
                styles.section_layout_inherit,
                style.special
              )}
              key={index}
            >
              <DividerSection
                color={titleColor}
                backgroundColor={backgroundColorBar}
                title={bizListing.title}
                className="mb-5 md:mb-8"
              />
              <div className={styles.lists}>
                {isArray(dataBizlisting) &&
                  dataBizlisting.map((card, index) => ( 
                    <InforCard
                      key={index} 
                      {...formatCardItemProps(card)}
                      className={styles.item_card}
                      onClick={() => {
                        router.push(
                          `/${getListingUrl(
                            get(
                              card,
                              "attributes.categories.data[0].attributes.name"
                            ),
                            get(
                              card,
                              "attributes.category_links.data[0].attributes.value"
                            ),
                            get(card, "attributes.slug")
                          )}`
                        );
                      }}
                    />
                  ))}
              </div>
            </SectionLayout>
          )}
          {index === 0 && isArray(articleArray) && (
            <SectionLayout backgroundColor title="Articles">
              <Carousel responsive={homeCuratedResponsive}>
                {articleArray.map((item, index) => (
                  <Link href={`/articles/${item.slug}`} passHref key={index}>
                    <div className="pb-5 pt-3 pl-3">
                      <ArticleCard
                        title={item.title}
                        imgUrl={item.imgUrl}
                        time={item.time}
                      />
                    </div>
                  </Link>
                ))}
              </Carousel>
            </SectionLayout>
          )}
        </div>
      );
    });

  const SectionProducts = () => (
    <SectionLayout
      className={classNames(styles.section_layout_inherit, style.special)}
      show={isArray(products)}
    >
      <DividerSection
        color={titleColor}
        backgroundColor={backgroundColorBar}
        title={
          get(promotion, "title_product")
            ? get(promotion, "title_product")
            : "PRODUCTS"
        }
        className="mb-5 md:mb-8"
      />
      <div className={styles.lists}>
        {isArray(products) &&
          products.map((card, index) => (
            <InforCard
              key={index}
              {...card}
              className={styles.item_card}
              onClick={() => handleOpenDetailModal(card)}
            />
          ))}
      </div>
    </SectionLayout>
  );

  const SectionDeals = () => {
    const deals = get(promotion, "deals.data");
    return (
      <SectionLayout
        show={isArray(deals)}
        className={classNames(
          styles.section_layout_inherit,
          style.special,
          "pt-0 pb-10"
        )}
      >
        <DividerSection
          color={titleColor}
          backgroundColor={backgroundColorBar}
          title="FEATURED VOUCHERS"
          className="mb-5 md:mb-8"
        />
        <ScrollingBox className={styles.scrolling_box_custom} maxHeight={475}>
          <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
            {isArray(deals) &&
              deals.map((promotion, index) => (
                <PromotionCard
                  key={index}
                  title={get(promotion, "attributes.name")}
                  imgUrl={get(promotion, "attributes.images[0]")}
                  endDate={`${get(promotion, "attributes.start_date")} - ${get(
                    promotion,
                    "attributes.end_date"
                  )}`}
                  type={1}
                  favourite={false}
                  size="large"
                  onClick={checkLogin}
                />
              ))}
          </div>
        </ScrollingBox>
      </SectionLayout>
    );
  };

  const SectionHotDeals = () => {
    const hotDeals = get(promotion, "hot_deals.data");
    return (
      <SectionLayout
        show={isArray(hotDeals)}
        className={classNames(
          styles.section_layout_inherit,
          style.special,
          "pt-0 pb-10"
        )}
      >
        <DividerSection
          color={titleColor}
          backgroundColor={backgroundColorBar}
          title="HOT DEALS"
          className="mb-5 md:mb-8"
        />
        <ScrollingBox className={styles.scrolling_box_custom} maxHeight={475}>
          <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
            {isArray(hotDeals) &&
              hotDeals.map((promotion, index) => (
                <PromotionCard
                  key={index}
                  title={get(promotion, "attributes.name")}
                  imgUrl={get(promotion, "attributes.images[0]")}
                  endDate={`${get(promotion, "attributes.start_date")} - ${get(
                    promotion,
                    "attributes.end_date"
                  )}`}
                  type={1}
                  favourite={false}
                  size="large"
                  onClick={checkLogin}
                />
              ))}
          </div>
        </ScrollingBox>
      </SectionLayout>
    );
  };

  const SectionMoreDeals = () => {
    const moreDeals = get(promotion, "more_deals.data");
    return (
      <SectionLayout
        show={isArray(moreDeals)}
        className={classNames(
          styles.section_layout_inherit,
          style.special,
          "pt-0 pb-10"
        )}
      >
        <DividerSection
          color={titleColor}
          backgroundColor={backgroundColorBar}
          title="Shop more deals"
          className="mb-5 md:mb-8"
        />
        <ScrollingBox className={styles.scrolling_box_custom} maxHeight={475}>
          <div className="promotion_list grid grid-cols-1 lg:grid-cols-2 gap-x-10 xl:gap-x-16">
            {isArray(moreDeals) &&
              moreDeals.map((promotion, index) => (
                <PromotionCard
                  key={index}
                  title={get(promotion, "attributes.name")}
                  imgUrl={get(promotion, "attributes.images[0]")}
                  endDate={`${get(promotion, "attributes.start_date")} - ${get(
                    promotion,
                    "attributes.end_date"
                  )}`}
                  type={1}
                  favourite={false}
                  size="large"
                  onClick={checkLogin}
                />
              ))}
          </div>
        </ScrollingBox>
      </SectionLayout>
    );
  };

  const SectionBanners = () => {
    const banners = get(promotion, "banners.data");
    return (
      <SectionLayout
        show={isArray(banners)}
        className={`${styles.section_layout_inherit} ${style.special} pt-0 pb-12 md:pb-16`}
      >
        <DividerSection
          color={titleColor}
          backgroundColor={backgroundColorBar}
          title="BANNERS"
          className="mb-5 md:mb-8"
        />
        <Carousel
          className={styles.banners}
          isMicrosite
          responsive={micrositeBannerResponsive}
        >
          {isArray(banners) &&
            banners.map((banner, index) => (
              <div key={index} className={styles.banners}>
                <Image
                  key={banner}
                  alt={banner}
                  src={
                    get(banner, "attributes.url") ||
                    require("public/images/default-thumbnail.png")
                  }
                  layout="fill"
                  className="rounded-lg"
                />
              </div>
            ))}
        </Carousel>
      </SectionLayout>
    );
  };

  const SectionListing = ({ listing }) => (
    <SectionLayout
      className={classNames(styles.section_layout_inherit, style.special)}
    >
      <DividerSection
        color={titleColor}
        backgroundColor={backgroundColorBar}
        title={listing.title}
        className="mb-5 md:mb-8"
      />
      <div className={styles.lists}>
        {isArray(get(listing, "biz_listings.data")) &&
          get(listing, "biz_listings.data").map((card, index) => (
            <InforCard
              key={index}
              {...formatCardItemProps(card)}
              className={styles.item_card}
              onClick={() => {
                router.push(
                  `/${getListingUrl(
                    get(card, "attributes.categories.data[0].attributes.name"),
                    get(
                      card,
                      "attributes.category_links.data[0].attributes.value"
                    ),
                    get(card, "attributes.slug")
                  )}`
                );
              }}
            />
          ))}
      </div>
    </SectionLayout>
  );

  const renderContent = (layout: string) => {
    let layoutContent;
    switch (layout) {
      case MicrositeLayouts.BIZ_LISTING:
        layoutContent = <SectionBizlistings />;
        break;
      case MicrositeLayouts.PRODUCTS:
        layoutContent = <SectionProducts />;
        break;
      case MicrositeLayouts.DEALS:
        layoutContent = <SectionDeals />;
        break;
      case MicrositeLayouts.HOT_DEALS:
        layoutContent = <SectionHotDeals />;
        break;
      case MicrositeLayouts.MORE_DEALS:
        layoutContent = <SectionMoreDeals />;
        break;
      case MicrositeLayouts.BANNERS:
        layoutContent = <SectionBanners />;
        break;
      default:
        // Check if there exists a layout with the same name as the title of one of the listings in the fields microsite_biz_li, return data, otherwise return nothing.
        const isVisibleListing =
          isArray(bizListings) &&
          bizListings.findIndex((item) => item.title === layout);
        if (isVisibleListing && isVisibleListing !== -1) {
          layoutContent = (
            <SectionListing listing={bizListings[isVisibleListing]} />
          );
        }
    }
    return layoutContent;
  };

  return (
    <div className={styles.wrapper_promotions} style={sectionLayoutStyle}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <SectionLayout className={styles.section_layout_inherit}>
        {layout === "layout1" ? (
          <BannerLayout1
            className={styles.banner}
            key={banners}
            banners={banners}
          />
        ) : (
          <BannerLayout2
            content={content}
            banners={sliderBanner}
            images={banners}
            firstLink={get(promotion, "title_banner1")}
            secondLink={get(promotion, "title_banner2")}
            thirdLink={get(promotion, "title_banner3")}
          />
        )}
      </SectionLayout>

      {isArray(orderLayout) &&
        orderLayout.map((section) => renderContent(section))}

      <DealsDetailsModal
        visible={showModalDealsDetails}
        data={dealsDetails}
        onClose={() => handleDealsDetails(false)}
        onShare={() => handleShare()}
        onFavourite={() => handleFavourite()}
      />
      <AuthPopup
        onClose={() => setShowAuthPopup(false)}
        visible={showAuthPopup}
      />
      {/* Product Details Modal*/}
      <ProductDetailsModal
        // isPaid={isPaid}
        visible={showDetailModal}
        data={selectedProduct}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default PromotionsPage;

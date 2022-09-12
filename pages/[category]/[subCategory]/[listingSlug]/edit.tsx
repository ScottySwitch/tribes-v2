import orderBy from "lodash/orderBy";
import get from "lodash/get";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import Banner from "components/BizHomePage/Banner/Banner";
import Contacts from "components/BizHomePage/Contacts/Contacts";
import Details from "components/BizHomePage/Details/Details";
import EditAction from "components/BizHomePage/EditAction/EditAction";
import Facilities from "components/BizHomePage/Facilities/Facilities";
import HomeOpenHours from "components/BizHomePage/HomeOpenHours/HomeOpenHours";
import HomepageReviews from "components/BizHomePage/HomepageReviews/HomepageReviews";
import ListingInforCard from "components/BizHomePage/ListingInforCard/ListingInforCard";
import RenderTabs from "components/BizHomePage/RenderTabs/RenderTabs";
import Tags from "components/BizHomePage/Tags/Tags";
import AddDeals from "components/BizInformationPage/TabContentComponents/AddDeal/AddDeals";
import AddItems from "components/BizInformationPage/TabContentComponents/AddItems/AddItems";
import AddMenu from "components/BizInformationPage/TabContentComponents/AddMenu/AddMenu";
import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Loader from "components/Loader/Loader";
import { IOpenHours } from "components/OpenHours/OpenHours";
import RemindModal from "components/RemindModal/RemindModal";
import ResultModal from "components/ReviewsPage/ResultModal/ResultModal";
import SectionLayout from "components/SectionLayout/SectionLayout";
import ShareModal from "components/ShareModal/ShareModal";
import {
  getAddItemsFields,
  optionsReportListing,
  reportResultType,
  sectionYouMightLikeResponsive,
} from "constant";
import { UserInforContext } from "Context/UserInforContext";
import { Categories, CategoryText, ListingHomePageScreens } from "enums";
import Head from "next/head";
import { IAddListingForm } from "pages/add-listing";
import BizListingRevision from "services/biz-listing-revision";
import ReviewApi from "services/review";
import { IOption, IReviewData } from "type";
import {
  checkHasSocialLink,
  formatCardItemProps,
  formatDeals,
  formatListingArray,
  formatListingItems,
  formatMenu,
  formatOptions,
  formatSubmittedDeals,
  formatSubmittedListingItem,
  getIndex,
  getListingUrl,
  getParentId,
  getSlugsOfCategoryLink,
  getSlugsOfProductType,
  isArray,
  isEmptyObject,
  isPaidUser,
} from "utils";
import ReportModal from "../../../../components/ReportModal/ReportModal";
import BizListingApi from "../../../../services/biz-listing";
import DealApi from "../../../../services/deal";
import MenuApi from "../../../../services/menu";
import ProductApi from "../../../../services/product";
import ReportApi from "../../../../services/report";

import CompleteProfileCard from "components/BizHomePage/CompleteBizUserCard/CompleteBizUserCard";
import Carousel from "components/Carousel/Carousel";
import EditPageTabBar from "components/EditPageTabBar/EditPageTabBar";
import InforCard from "components/InforCard/InforCard";
import pointApi from "services/point";
import styles from "styles/BizHomepage.module.scss";

const EditListingHomepage = (props: { isViewPage?: boolean }) => {
  const { isViewPage } = props;
  const { user, updateUser } = useContext(UserInforContext);
  const { locale } = useRouter();

  const [metaTitle, setMetaTitle] = useState(
    "Tribes: Get travel information and recommendation for what to eat, buy, things to do, where to stay and how to get there"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Explore and discover Muslim Friendly eateries"
  );

  const router = useRouter();
  const { query, asPath } = router;
  const { categoryLink, listingSlug, referrer } = query;

  const [showShareModal, setShowShareModal] = useState(false);
  const [category, setCategory] = useState(Categories.EAT);
  const [screen, setScreen] = useState(ListingHomePageScreens.HOME);
  const [description, setDescription] = useState<string>("");
  const [facilities, setFacilities] = useState<IAddListingForm | undefined>();
  const [tags, setTags] = useState<IOption[]>([]);
  const [tagOptions, setTagOptions] = useState<IOption[]>([]);
  const [openHours, setOpenHours] = useState<IOpenHours>([]);
  const [reviews, setReviews] = useState<{ [key: string]: any }[]>([]);
  const [listingRate, setListingRate] = useState(1);
  const [klookUrl, setKlookUrl] = useState<string>("");
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
    currency: "",
  });
  const [socialInfo, setSocialInfo] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [action, setAction] = useState({ label: "", value: "" });
  const [itemList, setItemList] = useState<{ [key: string]: any }[]>([]);
  const [menuList, setMenuList] = useState<{ [key: string]: any }[]>([]);
  const [dealList, setDealList] = useState<{ [key: string]: any }[]>([]);
  const [bizInvoices, setBizInvoices] = useState<{ [key: string]: any }[]>([]);
  const [facilitiesData, setFacilitiesData] = useState();

  const [bizListing, setBizListing] = useState<any>({});
  const [listingMightLikes, setlistingMightLikes] = useState<any>([]);
  const [listingImages, setListingImages] = useState<any>([]);
  const [logo, setLogo] = useState<any>([user.avatar]);

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRevision, setIsRevision] = useState<boolean>(false);
  const [directUrl, setDirectUrl] = useState("");

  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<boolean>(false);
  const [showRemindModal, setShowRemindModal] = useState<boolean>(false);

  useEffect(() => {
    const element = document.querySelector("#renderTabs");
    if (element && referrer === "deals") {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    switch (get(bizListing, "categories[0].slug")) {
      case CategoryText.EAT:
        switch (locale) {
          case "sg":
            setMetaTitle(`${bizListing.name} | Tribes by HHWT`);
            break;
          case "id":
            setMetaTitle(
              `Lihat ${bizListing.name} Halal dan cek ${bizListing.name} Menu Online | Tribes`
            );
            break;
          default:
            setMetaTitle(`${bizListing.name} | Tribes by HHWT`);
            break;
        }
        setMetaDescription(
          "Enjoy limited-time exclusive offers. Find out more today!"
        );
        break;
      case CategoryText.BUY:
        setMetaTitle(`${bizListing.name} | Tribes by HHWT`);
        setMetaDescription(
          "Enjoy limited-time exclusive offers. Find out more today!"
        );
        break;
      case CategoryText.TRANSPORT:
        setMetaTitle(`${bizListing.name} | Tribes by HHWT`);
        setMetaDescription(
          "Explore and discover flights, ferries, buses and other modes of transport!"
        );
        break;
      case CategoryText.STAY:
        setMetaTitle(`${bizListing.name} | Tribes by HHWT`);
        setMetaDescription("Explore and discover the best places to stay!");
        break;
      case CategoryText.SEE_AND_DO:
        setMetaTitle(`${bizListing.name} | Tribes by HHWT`);
        setMetaDescription(
          "Explore and discover exciting activities and sight-seeing spots!"
        );
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bizListing, locale]);

  useEffect(() => {
    const getListingData = async (listingSlug) => {
      const listing = isViewPage
        ? await BizListingApi.getInfoBizListingBySlug(listingSlug)
            .then((res) => get(res, "data.data[0]"))
            .catch((error) => {})
        : await BizListingApi.getInfoOwnerBizListingBySlug(listingSlug)
            .then((res) => {
              get(res, "data.is_revision") && setIsRevision(true);
              //they will be redirected to home if do not own the listing
              !get(res, "data.is_owner") && (window.location.href = "/");
              return get(res, "data.data[0]");
            })
            .catch((error) => {});

      if (listing) {
        updateUser({
          now_biz_listing: listing,
        });
        const rawTags = listing.tags || [];
        const rawFacilities = listing.facilities_data || [];
        const rawPhoneNumber = listing.phone_number;
        const rawDeals = orderBy(listing.deals, ["is_pinned"], ["desc"]);
        let rawListingItems = orderBy(
          listing.products,
          ["is_pinned"],
          ["desc"]
        );

        const tagArray = formatOptions(rawTags);
        const formattedItems = formatListingItems(rawListingItems);
        const formattedMenu = formatMenu(listing.menus);
        const formattedDeals = formatDeals(rawDeals);
        const formattedTagOptions = formatOptions(listing.tag_options);
        const formattedBizInvoices = isArray(listing.biz_invoices)
          ? listing.biz_invoices.map((item) => ({
              id: item.id,
            }))
          : [];

        const formattedReviews: IReviewData[] = isArray(listing.reviews)
          ? listing.reviews.filter((item) => !item.is_revision)
          : [];

        setTagOptions(formattedTagOptions);
        setBizListing(listing);
        setAction(listing.action);
        setListingImages(listing.images || []);
        setCategory(get(listing, "categories[0].id") || Categories.BUY);
        setDescription(listing.description);
        setOpenHours(listing.open_hours);
        setPriceRange({
          min: listing.min_price,
          max: listing.max_price,
          currency: listing.currency ? listing.currency?.toUpperCase() : "",
        });
        setSocialInfo(listing.website);
        setKlookUrl(listing.klook_url);
        setIsVerified(listing.is_verified);
        // setDealList(listing.deals);
        setFacilitiesData(listing.facilities_data);
        setLogo(listing.logo);
        setTags(tagArray);
        setReviews(formattedReviews);
        setPhoneNumber(rawPhoneNumber);
        setFacilities(rawFacilities);
        setPhoneNumber(rawPhoneNumber);
        setItemList(formattedItems);
        setMenuList(formattedMenu);
        setDealList(formattedDeals);
        setBizInvoices(formattedBizInvoices);
        setListingRate(listing.rate);
        setIsPaid(isPaidUser(listing.expiration_date));
        getListingYouMightLikes(
          get(listing, "categories[0].slug") || "",
          getSlugsOfCategoryLink(get(listing, "category_links")),
          getSlugsOfProductType(get(listing, "product_types"))
        );
        //Check if current listing is viewed by user before or current listing id is in user's viewed listings
        const viewedListings = get(user, "viewed_listings") || [];
        const isViewed = viewedListings.includes(listing.id);
        if (!isViewed && isViewPage) {
          if (viewedListings.length === 2) {
            try {
              pointApi.create({
                type: "browsing_brand",
                point: 3,
              });
            } catch (error) {
              console.log(error);
            }
          }
          viewedListings.push(listing.id);
          updateUser({
            viewed_listings: viewedListings,
          });
        }
      }
    };

    listingSlug &&
      getListingData(listingSlug).finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingSlug, isViewPage]);

  const options = [
    {
      label: "Add at least 1 photo of your business",
      value: "photo",
      checked: isArray(listingImages),
      onClick: () => window.scroll(0, 0),
    },
    {
      label: "Add price range",
      value: "range",
      checked: !!(get(priceRange, "min") && get(priceRange, "currency")),
      onClick: () => document.getElementById("edit-price")?.click(),
    },
    {
      label: "Add social media",
      value: "media",
      checked: bizListing.social_info && !isEmptyObject(bizListing.social_info),
      onClick: () => {
        setShowRemindModal(true);
        setDirectUrl(`/biz/information/${bizListing.slug}`);
      },
    },
    {
      label: "Add description",
      value: "description",
      checked: !!bizListing?.description,
      onClick: () => document.getElementById("edit-description")?.click(),
    },
    {
      label: "Add tags",
      value: "tags",
      checked: isArray(tags),
      onClick: () => document.getElementById("edit-tags")?.click(),
    },
    {
      label: "Add relevant sub-cat 2 categorization",
      value: "sub_cat_2",
      checked: isArray(get(bizListing, "product_types")),
      onClick: () => {
        setShowRemindModal(true);
        setDirectUrl(`/biz/detail/${bizListing.slug}`);
      },
    },
    {
      label: "Add relevant sub-cat 3 categorization",
      value: "sub_cat_3",
      checked: isArray(get(bizListing, "product_brands")),
      onClick: () => {
        setShowRemindModal(true);
        setDirectUrl(`/biz/detail/${bizListing.slug}`);
      },
    },
    {
      label: "Add at least 1 product",
      value: "product",
      checked: isArray(itemList),
      onClick: () => setScreen(ListingHomePageScreens.ADD_ITEMS),
    },
    {
      label: "Add profile photo",
      value: "profile",
      checked: !!logo,
      onClick: () => window.scroll(0, 0),
    },
  ];

  const getListingYouMightLikes = async (
    categories,
    categoryLinks,
    productTypes
  ) => {
    const params = {
      slug: listingSlug,
      categories: [categories],
      categoryLinks: categoryLinks,
      productTypes: productTypes,
    };
    const data = await BizListingApi.getListingYouMightLikes(params);
    get(data, "data.data") &&
      setlistingMightLikes(formatListingArray(get(data, "data.data")));
  };

  const handleCancel = () => setScreen(ListingHomePageScreens.HOME);
  const handleSetItemList = (list: { [key: string]: string }[]) => {
    setItemList(list);
    setScreen(ListingHomePageScreens.HOME);
  };
  const handleSetDealList = (dealList: { [key: string]: string }[]) => {
    setDealList(dealList);
    setScreen(ListingHomePageScreens.HOME);
  };
  const handleSetMenu = (menu) => {
    setMenuList(menu);
    setScreen(ListingHomePageScreens.HOME);
  };

  const handleSubmitReply = (reply, review) => {
    const newReviewArray: { [key: string]: any }[] = reviews;
    const indexReviewSelected = getIndex(review.id, newReviewArray);
    newReviewArray[indexReviewSelected].isEdit = true;
    newReviewArray[indexReviewSelected].reply_reviews = reply;
    newReviewArray[indexReviewSelected].date_create_reply = new Date();
    setReviews(newReviewArray);
  };

  const handleSubmitReportBizListing = async (data?: any) => {
    const body = {
      type: "listing",
      reason: data,
      user: user.id,
      biz_listing: bizListing.id,
    };

    await ReportApi.createReport(body)
      .then((res) => {
        setSubmitResult(true);
      })
      .catch((error) => {
        setSubmitResult(false);
      })
      .finally(() => {
        setShowReportModal(false);
        setShowResultModal(true);
      });
  };

  const getCurrentList = (list) =>
    isArray(list)
      ? [...list].filter((item) => !item.isNew && !item.isEdited)
      : [];

  const getNewList = (list) =>
    isArray(list) ? list.filter((item) => item.isNew) : [];

  const getEditList = (list) =>
    isArray(list) ? list.filter((item) => !item.isNew && item.isEdited) : [];

  const handleSubmit = async () => {
    setIsLoading(true);
    const currentItemList = getCurrentList(itemList);
    const currentMenuList = getCurrentList(menuList);
    const currentDealList = getCurrentList(dealList);

    const newItemList = getNewList(itemList);
    const newMenuList = getNewList(menuList);
    const newDealList = getNewList(dealList);

    const editedItemList = getEditList(itemList);
    const editedMenuList = getEditList(menuList);
    const editedDealList = getEditList(dealList);

    const updateRevisionListingData = {
      description: description,
      min_price: parseFloat(priceRange?.min) || null,
      max_price: parseFloat(priceRange?.max) || null,
      currency: priceRange?.currency.toLocaleLowerCase() || null,
      action: action,
      images: listingImages,
      website: socialInfo,
      phone_number: phoneNumber,
      facilities_data: facilitiesData,
      open_hours: openHours,
      tags: tags.map((item) => item.id),
      is_verified: false,
      logo: logo,
      is_accepted: false,
      expiration_date: bizListing.expiration_date,
      subscription: bizListing.subscription,
      products: currentItemList.map((item) => item.id),
      menus: currentMenuList.map((item) => item.id),
      deals: currentDealList.map((item) => item.id),
      reviews: reviews.map((item) => item.id),
    };

    const createBizListingRevisionData = {
      ...updateRevisionListingData,
      name: get(bizListing, "name"),
      slug: get(bizListing, "slug"),
      biz_listing: bizListing.id.toString(),
      parent_id: bizListing.id.toString(),
      email: bizListing.email,
      city: bizListing.city,
      country: bizListing.country,
      address: bizListing.address,
      social_info: bizListing.social_info,
      biz_invoices: bizInvoices.map((item) => item.id) || [],
      categories: bizListing.categories.map((item) => item.id) || [],
    };

    let revisionId;
    if (isRevision) {
      await BizListingRevision.updateBizListingRevision(
        bizListing.id,
        updateRevisionListingData
      );
    } else {
      await BizListingRevision.createBizListingRevision(
        createBizListingRevisionData
      ).then((response) => (revisionId = get(response, "data.data.id")));
    }

    //Create items
    await Promise.all(
      newItemList.map(
        async (item) =>
          await ProductApi.createProduct(
            formatSubmittedListingItem(item, revisionId, bizListing.id)
          )
      )
    );

    //Update Items
    await Promise.all(
      editedItemList.map(async (item) => {
        const updateData = {
          parent_id: getParentId(item),
          ...formatSubmittedListingItem(item, revisionId, bizListing.id),
        };
        item.is_revision
          ? await ProductApi.updateProduct(item.id, updateData)
          : await ProductApi.createProduct(updateData);
      })
    );

    //Create menus
    await Promise.all(
      newMenuList.map(async (item) => {
        const createdMenuData = {
          biz_listing_revision: revisionId || bizListing.id,
          name: item.name,
          menu_file: item.images,
          is_revision: true,
        };
        await MenuApi.createMenu(createdMenuData);
      })
    );

    //Update menus
    await Promise.all(
      editedMenuList.map(async (item) => {
        const updateMenuData = {
          parent_id: getParentId(item),
          biz_listing_revision: revisionId || bizListing.id,
          name: item.name,
          menu_file: item.images,
          is_revision: true,
        };
        item.is_revision
          ? await MenuApi.updateMenu(item.id, updateMenuData)
          : await MenuApi.createMenu(updateMenuData);
      })
    );

    //API DealList
    await Promise.all(
      newDealList.map(
        async (item) =>
          await DealApi.createDeal(
            formatSubmittedDeals(item, revisionId, bizListing)
          )
      )
    );

    await Promise.all(
      editedDealList.map(async (item) => {
        const updateData = {
          parent_id: getParentId(item),
          ...formatSubmittedDeals(item, revisionId, bizListing),
        };
        item.is_revision
          ? await DealApi.updateDeal(item.id, updateData)
          : await DealApi.createDeal(updateData);
      })
    );

    //API Reviews
    await Promise.all(
      reviews.map(async (item) => {
        if (item.isEdit) {
          const updateData = {
            images: item.images,
            visited_date: item.visited_date,
            rating: item.rating,
            content: item.content,
            reply_reviews: item.reply_reviews,
            date_create_reply: item.date_create_reply,
            reply_accepted: false,
          };
          await ReviewApi.updateReviews(item.id, updateData);
        }
      })
    );

    directUrl ? router.push(directUrl) : window.location.reload();
  };

  if (!bizListing) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  const listingActions = [
    {
      text: "Reviews",
      icon: "chat",
      callBack: () => {
        const element = document.querySelector("#reviews");
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      },
    },
    // {
    //   text: "Direction",
    //   icon: "map-1",
    //   callBack: () => window.open("some_url_here"),
    // },
    { text: "Share", icon: "share", callBack: () => setShowShareModal(true) },
  ];

  return (
    <div className={styles.listing_homepage}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta
          property="og:image"
          content={
            listingImages[0] || require("public/images/default-thumbnail.png")
          }
        />
      </Head>
      <SectionLayout show={screen === ListingHomePageScreens.HOME}>
        <Banner
          isViewPage={isViewPage}
          isPaid={isPaid}
          listingImages={listingImages}
          listingId={bizListing.id}
          onChangeImages={(srcImages) => setListingImages(srcImages)}
        />
        <h1 className={styles.breadcrumbs}>
          <span onClick={() => router.push("/")}>Home</span>{" "}
          <Icon icon="carret-right" size={14} color="#7F859F" />
          {bizListing.name}
        </h1>
        <ListingInforCard
          isVerified={isVerified}
          key={bizListing}
          isPaid={isPaid}
          isViewPage={isViewPage}
          logo={logo}
          handleChangeLogo={(srcImages) => setLogo(srcImages)}
          bizListing={bizListing}
          priceRange={priceRange}
          socialInfo={socialInfo}
          phoneNumber={phoneNumber}
          onSetPriceRange={(priceRange) => setPriceRange(priceRange)}
          onSetSocialInfo={(socialInfo) => setSocialInfo(socialInfo)}
          onSetPhoneNumber={(phoneNumber) => setPhoneNumber(phoneNumber)}
          userInfo={bizListing}
        />
        <Break show={!isViewPage} />
        {!isViewPage && <CompleteProfileCard options={options} />}
        <Break />
        <div className="flex gap-2">
          {listingActions.map((item) => (
            <Button
              size="small"
              prefix={<Icon icon={item.icon} />}
              key={item.text}
              text={item.text}
              variant="secondary"
              width={130}
              onClick={item.callBack}
            />
          ))}
        </div>
        <div className={styles.body}>
          <div className={styles.right_col}>
            <EditAction
              listingId={bizListing.listing_id}
              klookUrl={klookUrl}
              isOwned={
                get(bizListing, "listing_roles.length") > 0 ||
                get(bizListing, "claim_listings.length") > 0
              }
              isViewPage={isViewPage}
              isLoading={isLoading}
              isPaid={isPaid}
              action={action}
              onApplyAction={(action, value) =>
                setAction({ label: action, value: value })
              }
              onPublishPage={handleSubmit}
            />
          </div>
          <div className={styles.left_col}>
            {/* <Break show={!isViewPage} /> */}
            {/* {!isViewPage && <OnboardChecklist />} */}
            <Break show={!isViewPage} />
            <Details
              isViewPage={isViewPage}
              description={description}
              onSetDescription={(description) => setDescription(description)}
            />
            <Break
              show={
                !isViewPage || (facilitiesData && isEmptyObject(facilitiesData))
              }
            />
            <Facilities
              category={category}
              isViewPage={isViewPage}
              facilities={facilitiesData}
              onSetFacilities={(facilities) => setFacilitiesData(facilities)}
            />
            <Break show={!isViewPage || isArray(tags)} />
            {((isViewPage && isArray(tags)) || !isViewPage) && (
              <Tags
                isViewPage={isViewPage}
                tags={tags}
                onSetTags={(tags) => setTags(tags)}
                tagOptions={tagOptions}
              />
            )}
            <Break show={!isViewPage} />
            {(!isViewPage || bizListing.is_online_store === true) && (
              <HomeOpenHours
                isViewPage={isViewPage}
                openHours={openHours}
                onSetOpenHours={(openHours) => setOpenHours(openHours)}
              />
            )}
            <Break />
            <>
              <RenderTabs
                id="renderTabs"
                key={category}
                isViewPage={isViewPage}
                isPaid={isPaid}
                menuList={menuList}
                category={category}
                itemList={itemList}
                dealList={dealList}
                onSetScreen={(e) => setScreen(e)}
                onDelete={(e) => console.log(e)}
              />
            </>
            <Break />
            <HomepageReviews
              key={get(reviews, "length")}
              bizListingId={bizListing.id}
              listingSlug={listingSlug}
              listingRate={listingRate}
              isPaid={isPaid}
              isViewPage={isViewPage}
              reviews={reviews}
              onSubmitReply={(value, id) => handleSubmitReply(value, id)}
              // onChangeReviewsSequence={handleChangeReviewsSequence}
            />
            <Break show={checkHasSocialLink(bizListing) || !isViewPage} />
            {checkHasSocialLink(bizListing) && (
              <Contacts
                email={bizListing?.email}
                websiteUrl={bizListing?.website}
                twitterUrl={get(bizListing, "social_info.twitter")}
                facebookUrl={get(bizListing, "social_info.facebook")}
                instagramUrl={get(bizListing, "social_info.instagram")}
              />
            )}
            <Break />
            <ReportBizListing
              optionsReportListing={optionsReportListing}
              showReportModal={showReportModal}
              onSetShowReportModal={setShowReportModal}
              handleSubmitReportBizListing={handleSubmitReportBizListing}
            />
            <ResultModal
              resultType={reportResultType}
              visible={showResultModal}
              isSuccess={submitResult}
              onClose={() => setShowResultModal(false)}
            />
            <RemindModal
              onClick={handleSubmit}
              visible={showRemindModal}
              onClose={handleSubmit}
            />
          </div>
        </div>
      </SectionLayout>
      <SectionLayout
        show={screen === ListingHomePageScreens.ADD_ITEMS}
        title={getAddItemsFields(category).title}
        childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
      >
        <AddItems
          isEdit
          isPaid={isPaid}
          multiple
          onSubmit={handleSetItemList}
          onCancel={handleCancel}
          itemList={itemList}
          placeholders={getAddItemsFields(category).placeholder}
        />
      </SectionLayout>
      <SectionLayout
        show={screen === ListingHomePageScreens.ADD_MENU}
        title="Add a menu"
        childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
      >
        <AddMenu
          isPaid={isPaid}
          multiple={true}
          menuList={menuList}
          onCancel={handleCancel}
          onSubmit={handleSetMenu}
        />
      </SectionLayout>
      <SectionLayout
        show={screen === ListingHomePageScreens.ADD_DEALS}
        title="Add deals"
        childrenClassName=" w-full sm:w-3/4 xl:w-1/2"
      >
        <AddDeals
          isEdit
          isPaid={isPaid}
          multiple
          onCancel={handleCancel}
          onSubmit={handleSetDealList}
          dealList={dealList}
        />
      </SectionLayout>
      {/* Section: You might also like this  */}
      <SectionLayout
        className={styles.section_you_likes}
        show={isViewPage && isArray(listingMightLikes)}
        title="You may also like"
      >
        <Carousel responsive={sectionYouMightLikeResponsive}>
          {isArray(listingMightLikes) &&
            listingMightLikes.map((card) => (
              <div key={card.slug} className="pb-5 pt-3 pl-3">
                <InforCard
                  {...formatCardItemProps(card)}
                  className={styles.info_card}
                  onClick={() => {
                    router.push(
                      `/${getListingUrl(
                        get(card, "categories[0]"),
                        get(card, "categoryLinks[0]"),
                        get(card, "slug")
                      )}`
                    );
                  }}
                />
              </div>
            ))}
        </Carousel>
      </SectionLayout>
      <ShareModal
        url={asPath}
        onClose={() => setShowShareModal(false)}
        visible={showShareModal}
      />
      {isViewPage && isPaid && (
        <EditPageTabBar action={action} klookUrl={klookUrl} />
      )}
    </div>
  );
};

const ReportBizListing = ({
  optionsReportListing,
  showReportModal,
  onSetShowReportModal,
  handleSubmitReportBizListing,
}) => {
  return (
    <>
      <a onClick={() => onSetShowReportModal(true)}>Report biz listing</a>
      <ReportModal
        title="Why are you reporting this listing?"
        visible={showReportModal}
        options={optionsReportListing}
        onClose={() => onSetShowReportModal(false)}
        onSubmit={handleSubmitReportBizListing}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  return {
    props: {},
  };
}

export default EditListingHomepage;

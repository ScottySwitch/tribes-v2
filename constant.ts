import { CategoryText, CurrencyValues, InformationSlugList } from "./enums";
import { UserProps } from "components/UserProfilePage/PanelAbout/PanelAbout";
import {
  Categories,
  InformationList,
  ListingHomePageScreens,
  ListingTabs,
  UserInformationList,
} from "enums";
import { IAddListingForm } from "pages/add-listing";
import { ListCardProps } from "./components/UserProfilePage/PanelContributed/PanelContributed";
import { useRouter } from "next/router";

export const idGoogleAnalytics = "G-P13Q084SXR";

export const codeGoogleAnalytics = {
  __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-P13Q084SXR');
  `,
};

export const codeHotjar = `
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:3074318,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;

export const reportResultType = [
  {
    title: "Success!",
    message:
      "Thank you for your report. We will review the report and take action within 24 hours!",
    textButton: "Close",
  },
  {
    title: "Fail!",
    message: "Oops, something wrong. Please try again later.",
    textButton: "Try again",
  },
];

export const videoExtensions = [
  ".flv",
  ".mp4",
  ".m3u8",
  ".ts",
  ".3gp",
  ".mov",
  ".avi",
  ".wmv",
  ".quicktime",
];

export const loginInforItem = "login_infor";
export const user = "user";
export const userId = "user_id";
export const token = "token";

export const sortOptions = [
  // { label: "Price (Low to high)" },
  // { label: "Price (High to low)" },
  { label: "Rating (High to low)", value: "desc" },
  { label: "Rating (Low to high)", value: "asc" },
  // { label: "Recently added" },
];

export const getFilterLabels = (filter, currency) => [
  {
    isShow: !!filter.sort,
    label: "Sort",
    value: sortOptions.find((item) => item.value === filter.sort)?.label,
  },
  {
    isShow: !!filter.maxRating,
    label: "Rating",
    value: `${filter.minRating || "0"} - ${filter.maxRating}`,
  },
  {
    isShow: !!filter.maxPrice && !!currency,
    label: "Price",
    value: `${filter.minPrice} - ${filter.maxPrice + " " + currency}`,
  },
];

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Others", value: "others" },
];

export const curatedList = [
  {
    title: "Find relevant and timely products and services to suit your needs",
    content:
      "Tribes is a curated platform for Muslims to be able to easily locate halal food purchase halal products, and more!",
  },
  {
    title: "Great deals just a click away",
    content:
      "From discovering halal Japanese food to the best travel deals and family activities, experience endless possibilities with Tribes.",
  },
  {
    title: "Be a part of an immersive and interactive community",
    content:
      "Gain insights about new brands through reviews  and ratings and get exclusive updates about the latest deals by community members.",
  },
];

export const locations = [
  {
    label: "Singapore",
    value: "singapore",
    code: "sg",
    currency: "SGD",
    max: 15000,
  },
  {
    label: "Malaysia",
    value: "malaysia",
    code: "my",
    currency: "MYR",
    max: 5000,
  },
  {
    label: "Indonesia",
    value: "indonesia",
    code: "id",
    currency: "IDR",
    max: 5000,
  },
  // { label: "India", value: "india" },
  // { label: "Thailand", value: "thailand" },
];

export const languages = [
  { label: "English", icon: "eng-flag", value: "en" },
  { label: "Indonesia", icon: "indo-flag", value: "id" },
  { label: "Singapore", icon: "sing-flag", value: "sg" },
];

export const micrositeBannerResponsive = {
  show: 1,
  scroll: 1,
  xsShow: 1,
  xsScroll: 1,
  smShow: 1,
  smScroll: 1,
  mdShow: 1,
  mdScroll: 1,
  lgShow: 1,
  lgScroll: 1,
  xlShow: 1,
  xlScroll: 1,
  xxlShow: 1,
  xxlScroll: 1,
};

export const homeCuratedResponsive = {
  xsShow: 1,
  xsScroll: 1,
  smShow: 1,
  smScroll: 1,
  mdShow: 2,
  mdScroll: 2,
  lgShow: 3,
  lgScroll: 3,
  xlShow: 4,
  xlScroll: 3,
  xxlShow: 4,
  xxlScroll: 3,
  show: 5,
  scroll: 4,
};

export const infoCardResponsive = {
  xsShow: 2,
  xsScroll: 1,
  smShow: 2,
  smScroll: 2,
  mdShow: 3,
  mdScroll: 3,
  lgShow: 4,
  lgScroll: 3,
  xlShow: 4,
  xlScroll: 3,
  xxlShow: 4,
  xxlScroll: 3,
  show: 5,
  scroll: 4,
};

export const sectionYouMightLikeResponsive = {
  xsShow: 2,
  xsScroll: 1,
  smShow: 2,
  smScroll: 2,
  mdShow: 3,
  mdScroll: 3,
  lgShow: 4,
  lgScroll: 3,
  xlShow: 4,
  xlScroll: 3,
  xxlShow: 5,
  xxlScroll: 4,
  show: 5,
  scroll: 4,
};

export const homeBannerResponsive = {
  xsShow: 1,
  xsScroll: 1,
  smShow: 2,
  smScroll: 2,
  mdShow: 2.2,
  mdScroll: 2,
  lgShow: 2.7,
  lgScroll: 2,
  xlShow: 2.7,
  xlScroll: 2,
  xxlShow: 2.7,
  xxlScroll: 2,
  show: 2.7,
  scroll: 2,
};

export const fakeSubCateList = [
  { label: "Subcate", value: "Subcate" },
  { label: "Subcate 1", value: "Subcate 1" },
  { label: "Subcate 2", value: "Subcate 2" },
  { label: "Subcate 3", value: "Subcate 3" },
  { label: "Subcate 4", value: "Subcate 4" },
];

export const reviewSequenceOptions = [
  { label: "The lastest reviews", value: "latest" },
  { label: "Rating: High to Low", value: "highest" },
  { label: "Rating: Low to High", value: "lowest" },
];

export const defaultAddlistingForm: IAddListingForm = {
  id: 0,
  category: Categories.EAT, // TODO: remove
  relationship: "",
  listing: "",
  role: "",
  isOpen: "",
  openDate: "",
  businessName: "",
  description: "",
  isOnline: "",
  city: "",
  country: "",
  address: "",
  additionalAddress: "",
  contact: "",
  email: "",
  socialMedia: "",
  currency: undefined,
  minPrice: "",
  maxPrice: "",
  categoryKind: "",
  agreePolicies: "",
  images: [],
  openHours: [
    { name: "Monday", twentyFourHours: false, openHours: [] },
    { name: "Tuesday", twentyFourHours: false, openHours: [] },
    {
      name: "Wednesday",
      twentyFourHours: false,
      openHours: [],
    },
    {
      name: "Thursday",
      twentyFourHours: false,
      openHours: [],
    },
    { name: "Friday", twentyFourHours: false, openHours: [] },
    {
      name: "Saturday",
      twentyFourHours: false,
      openHours: [],
    },
    { name: "Sunday", twentyFourHours: false, openHours: [] },
  ],

  tags: [],
  mealsKind: [],
  placeGoodFor: [],
  parking: [],
  atmosphere: [],
  payment: [],
  additionalServices: [],
  foodOptions: [],
  paryerFacilities: [],
  foodOptionsRamadan: [],
  nonHalalActivities: [],
};

export const currencyOptions = [
  { label: "USD", value: CurrencyValues.USD },
  { label: "MYR", value: CurrencyValues.MYR },
  { label: "SGD", value: CurrencyValues.SGD },
  { label: "IDR", value: CurrencyValues.IDR },
  { label: "JPY", value: CurrencyValues.JPY },
  { label: "HKD", value: CurrencyValues.HKD },
  { label: "CNY", value: CurrencyValues.CNY },
  { label: "AUD", value: CurrencyValues.AUD },
  { label: "GBP", value: CurrencyValues.GBP },
  { label: "EUR", value: CurrencyValues.EUR },
];

export const discountTypeOptions = [
  { label: "USD", value: CurrencyValues.USD },
  { label: "MYR", value: CurrencyValues.MYR },
  { label: "SGD", value: CurrencyValues.SGD },
  { label: "IDR", value: CurrencyValues.IDR },
  { label: "%", value: CurrencyValues.PERCENTAGE },
];

export const previewInfo = [
  { question: "What kind of place is this?", valueKey: "category" },
  {
    question:
      "Are you affiliated with this place as an owner, employee, or official representative?",
    valueKey: "relationship",
  },
  {
    question: "Does this place already have a listing on Tribes?",
    valueKey: "listing",
  },
  { question: "What is your role at this business?", valueKey: "role.label" },
  { question: "Is this place currently open?", valueKey: "isOpen" },
  { question: "Official place name", valueKey: "businessName" },
  { question: "Description of your property:", valueKey: "description" },
  { question: "City/Town, State/Province/Region", valueKey: "city" },
  { question: "Country", valueKey: "country" },
  { question: "Street address ", valueKey: "address" },
  { question: "Additional address information", valueKey: "additionalAddress" },
  { question: "Social Media", valueKey: "socialMedia" },
  {
    question: "What is the category that best fits this place?",
    valueKey: "categoryKind",
  },
  { question: "What type of cuisine does this place serve?", valueKey: "tags" },
  { question: "Open hours", valueKey: "openHours" },
  { question: "Select a currency", valueKey: "currency.label" },
  { question: "Max price", valueKey: "maxPrice" },
  { question: "Min price", valueKey: "minPrice" },
];

export const paidInformationList = [
  {
    label: InformationList.BUSINESS_INFORMATION,
    icon: "user-color-2",
    slug: InformationSlugList.BUSINESS_INFORMATION,
  },
  {
    label: InformationList.BUSINESS_DETAIL,
    icon: "business",
    slug: InformationSlugList.BUSINESS_DETAIL,
  },
  {
    label: InformationList.PHOTOS_VIDEOS,
    icon: "camera-color",
    slug: InformationSlugList.PHOTOS_VIDEOS,
  },
  {
    label: InformationList.PRODUCT_LISTING,
    icon: "buy-color",
    star: true,
    slug: InformationSlugList.PRODUCT_LISTING,
  },
  {
    label: InformationList.MANAGE_DEALS,
    icon: "deal",
    star: true,
    slug: InformationSlugList.MANAGE_DEALS,
  },
  {
    label: InformationList.ANALYTICS,
    icon: "chart",
    star: true,
    slug: InformationSlugList.ANALYTICS,
  },
  {
    label: InformationList.CHANGE_ACCOUNT_TIER,
    icon: "reward-color",
    slug: InformationSlugList.CHANGE_ACCOUNT_TIER,
  },
  {
    label: InformationList.VERIFICATION,
    icon: "like-color-2",
    slug: InformationSlugList.VERIFICATION,
  },
];

export const freeInformationList = [
  {
    label: InformationList.BUSINESS_INFORMATION,
    icon: "user-color-2",
    slug: InformationSlugList.BUSINESS_INFORMATION,
  },
  {
    label: InformationList.BUSINESS_DETAIL,
    icon: "business",
    slug: InformationSlugList.BUSINESS_DETAIL,
  },
  {
    label: InformationList.PHOTOS_VIDEOS,
    icon: "camera-color",
    slug: InformationSlugList.PHOTOS_VIDEOS,
  },
  {
    label: InformationList.PRODUCT_LISTING,
    icon: "buy-color",
    slug: InformationSlugList.PRODUCT_LISTING,
  },
  {
    label: InformationList.ANALYTICS,
    icon: "chart",
    slug: InformationSlugList.ANALYTICS,
  },
  {
    label: InformationList.CHANGE_ACCOUNT_TIER,
    icon: "reward-color",
    slug: InformationSlugList.CHANGE_ACCOUNT_TIER,
    star: true,
  },
  {
    label: InformationList.VERIFICATION,
    icon: "like-color-2",
    slug: InformationSlugList.VERIFICATION,
  },
];

export const userInformationList = [
  { label: UserInformationList.USER_INFORMATION, icon: "user-color-2" },
  { label: UserInformationList.CHANGE_PASSWORD, icon: "password" },
  // { label: UserInformationList.NOTIFICATION_SETTINGS, icon: "noti-color" },
  { label: UserInformationList.REFERRAL_CODE, icon: "noti-color" },
  { label: UserInformationList.POINT_HISTORY, icon: "point-color" },
  {
    label: UserInformationList.TRIBES_FOR_BUSINESSES,
    icon: "user-color-2",
    directUrl: "/claim",
  },
  {
    label: UserInformationList.SUPPORT,
    icon: "support-color",
    directUrl: "/support",
  },
  {
    label: UserInformationList.TERMS_CONDITIONS,
    icon: "user-color-2",
    directUrl: "/terms-conditions",
  },
];

export const eatTabList = [
  {
    text: "Deals",
    value: ListingTabs.DEAL,
    screen: ListingHomePageScreens.ADD_DEALS,
  },
  {
    text: "Dishes",
    value: ListingTabs.DISH,
    screen: ListingHomePageScreens.ADD_ITEMS,
  },
  {
    text: "Menu",
    value: ListingTabs.MENU,
    screen: ListingHomePageScreens.ADD_MENU,
  },
];

export const productTabList = [
  {
    text: "Deals",
    value: ListingTabs.DEAL,
    screen: ListingHomePageScreens.ADD_DEALS,
  },
  {
    text: "Products",
    value: ListingTabs.PRODUCT,
    screen: ListingHomePageScreens.ADD_ITEMS,
  },
];

export const serviceTabList = [
  {
    text: "Deals",
    value: ListingTabs.DEAL,
    screen: ListingHomePageScreens.ADD_DEALS,
  },
  {
    text: "Products",
    value: ListingTabs.SERVICE,
    screen: ListingHomePageScreens.ADD_ITEMS,
  },
];

export const homeCarousel = [
  { imgUrl: "https://picsum.photos/600", url: "" },
  { imgUrl: "https://picsum.photos/600", url: "" },
  { imgUrl: "https://picsum.photos/600", url: "" },
  { imgUrl: "https://picsum.photos/600", url: "" },
];

export const contributePopOverList = [
  { icon: "map-color", label: "Add new listing", href: "/add-listing" },
  { icon: "comment-color", label: "Add new review", href: "/reviews" },
  // { icon: "update-color", label: "Update listing", href: "/update-listing" },
];

export const reportReasons = [
  {
    label: "Offensive, hateful or sexually explicit",
    value: "Offensive, hateful or sexually explicit",
  },
  {
    label: "Legal issue",
    value: "Legal issue",
  },
  {
    label: "Privacy concern",
    value: "Privacy concern",
  },
  {
    label: "Poor quality",
    value: "Poor quality",
  },
  {
    label: "Not a photo of the place",
    value: "Not a photo of the place",
  },
  {
    label: "Other",
    value: "",
  },
];

export const categories = [
  {
    width: "w-[30px]",
    icon: "buy-color",
    label: "Buy",
    description: "Explore stores to shop",
    value: Categories.BUY,
    slug: CategoryText.BUY,
    finalTabLabel: "Product categories",
    options: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Dessert", value: "dessert" },
      { label: "Quick bites", value: "quick-bites" },
    ],
  },
  {
    width: "w-[30px]",
    icon: "eat-color",
    description: "Explore things to eat",
    label: "Eat",
    value: Categories.EAT,
    slug: CategoryText.EAT,
    finalTabLabel: "Neighbourhoods",
    options: [
      { label: "Quick bites", value: "quick-bites" },
      { label: "Restaurant", value: "restaurant" },
      { label: "Dessert", value: "dessert" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Bakeries", value: "bakeries" },
    ],
  },
  {
    width: "w-[70px]",
    icon: "camera-color",
    label: "See & Do",
    description: "Discover things to do",
    value: Categories.SEE_AND_DO,
    slug: CategoryText.SEE_AND_DO,
    finalTabLabel: "Suitable For",
    options: [
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Restaurant", value: "restaurant" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Dessert", value: "dessert" },
    ],
  },
  {
    width: "w-[80px]",
    icon: "car-color",
    description: "Find out ways to get to your destination",
    label: "Transport",
    value: Categories.TRANSPORT,
    slug: CategoryText.TRANSPORT,
    options: [
      { label: "Dessert", value: "dessert" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Restaurant", value: "restaurant" },
    ],
  },
  {
    width: "w-[30px]",
    icon: "bed-color",
    description: "Discover places to stay",
    label: "Stay",
    value: Categories.STAY,
    slug: CategoryText.STAY,
    finalTabLabel: "Stars",
    options: [
      { label: "Restaurant", value: "restaurant" },
      { label: "Quick bites", value: "quick-bites" },
      { label: "Bakeries", value: "bakeries" },
      { label: "Coffee & Tea", value: "coffee-tea" },
      { label: "Dessert", value: "dessert" },
    ],
  },
];

export const listingSearchResult = [
  {
    attributes: {
      id: "a1762871287348",
      label: "Minatoso",
      name: "Minatosu",
      value: "minatosu",
      address: "Kyoto, Japan",
      category: Categories.SEE_AND_DO,
      avatar: "https://picsum.photos/200/300",
      reviewNumber: 12,
      imageNumber: 10,
      followers: 500,
    },
  },
  {
    attributes: {
      id: "a176-871287348",
      label: "Minatoso",
      name: "Minatoso",
      value: "minatoso",
      address: "Kyoto, Japan",
      category: Categories.STAY,
      avatar: "https://picsum.photos/200/300",
      reviewNumber: 12,
      imageNumber: 10,
      followers: 500,
    },
  },
  {
    attributes: {
      id: "a8798278394",
      label: "Mina mark",
      name: "Mina mark",
      value: "mina-mark",
      address: "Mexico",
      category: Categories.TRANSPORT,
      avatar: "https://picsum.photos/200/300",
      reviewNumber: 12,
      imageNumber: 10,
      followers: 500,
    },
  },
  {
    attributes: {
      id: "ab78472bdh394",
      label: "Mina Braise",
      name: "Mina Braise",
      value: "mina-braise",
      address: "Dubai",
      category: Categories.EAT,
      avatar: "https://picsum.photos/200/300",
      reviewNumber: 12,
      imageNumber: 10,
      followers: 500,
    },
  },
  {
    attributes: {
      id: "v9vfv88472bdh",
      label: "MinaBurihako",
      name: "MinaBurihako",
      value: "minaburihako",
      address: "Lohore, Pakistan",
      category: Categories.BUY,
      avatar: "https://picsum.photos/200/300",
      reviewNumber: 12,
      imageNumber: 10,
      followers: 500,
    },
  },
];

export const roleList = [
  { label: "Owner", value: "Owner" },
  { label: "Manager", value: "manager" },
  { label: "Agency/ Consultant", value: "consultant" },
  { label: "Accounting/ Finance", value: "finance" },
  { label: "Guest service/ Front Office", value: "front-office" },
  { label: "Marketing", value: "marketing" },
];

export const educationLevels = [
  { label: "High School", value: "High School" },
  { label: "Non-Tertiary", value: "Non-Tertiary" },
  { label: "Polytechnic", value: "Polytechnic" },
  { label: "Bachelor's", value: "Bachelor's" },
  { label: "Master's", value: "Master's" },
  { label: "Doctorate", value: "Doctorate" },
];

export const industryList = [
  { label: "Accountancy", value: "Accountancy" },
  { label: "Advertising", value: "Advertising" },
  {
    label: "Agriculture & Chemical Industry",
    value: "Agriculture & Chemical Industry",
  },
  { label: "Commerce", value: "Commerce" },
  { label: "Construction", value: "Construction" },
  { label: "Design", value: "Design" },
  { label: "Edutcation", value: "Edutcation" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Financial", value: "Financial" },
  { label: "Services", value: "Services" },
  { label: "Food & Beverage Services", value: "Food & Beverage Services" },
  { label: "Health", value: "Health" },
  { label: "Information Technology", value: "Information Technology" },
  { label: "Marketing", value: "Marketing" },
  { label: "Mechanical and Electrical", value: "Mechanical and Electrical" },
  { label: "Engineering", value: "Engineering" },
  { label: "Media", value: "Media" },
  { label: "Public Services", value: "Public Services" },
  { label: "Real Estates", value: "Real Estates" },
  { label: "Social services", value: "Social services" },
  { label: "Shipping & Logistics", value: "Shipping & Logistics" },
  { label: "Tourism", value: "Tourism" },
  { label: "Transportation", value: "Transportation" },
];

export const countryList = [
  { label: "Singapore", value: "singapore" },
  { label: "Malaysia", value: "malaysia" },
  { label: "Indonesia", value: "indonesia"},
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
  { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
  { label: "Argentina", value: "Argentina" },
  { label: "Armenia", value: "Armenia" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Azerbaijan", value: "Azerbaijan" },
  { label: "Bahamas", value: "Bahamas" },
  { label: "Bahrain", value: "Bahrain" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Barbados", value: "Barbados" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belgium", value: "Belgium" },
  { label: "Belize", value: "Belize" },
  { label: "Benin", value: "Benin" },
  { label: "Bhutan", value: "Bhutan" },
  { label: "Bolivia", value: "Bolivia" },
  { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { label: "Botswana", value: "Botswana" },
  { label: "Brazil", value: "Brazil" },
  { label: "Brunei", value: "Brunei" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Burkina Faso", value: "Burkina Faso" },
  { label: "Burundi", value: "Burundi" },
  { label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
  { label: "Cabo Verde", value: "Cabo Verde" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Canada", value: "Canada" },
  { label: "Central African Republic", value: "Central African Republic" },
  { label: "Chad", value: "Chad" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "Colombia", value: "Colombia" },
  { label: "Comoros", value: "Comoros" },
  { label: "Congo (Congo-Brazzaville)", value: "Congo (Congo-Brazzaville)" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cuba", value: "Cuba" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czechia (Czech Republic)", value: "Czechia (Czech Republic)" },
  {
    label: "Democratic Republic of the Congo",
    value: "Democratic Republic of the Congo",
  },
  { label: "Denmark", value: "Denmark" },
  { label: "Djibouti", value: "Djibouti" },
  { label: "Dominica", value: "Dominica" },
  { label: "Dominican Republic", value: "Dominican Republic" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "El Salvador", value: "El Salvador" },
  { label: "Equatorial Guinea", value: "Equatorial Guinea" },
  { label: "Eritrea", value: "Eritrea" },
  { label: "Estonia", value: "Estonia" },
  { label: "Eswatini (fmr. Swaziland)", value: "Eswatini (fmr. Swaziland)" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Fiji", value: "Fiji" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Gabon", value: "Gabon" },
  { label: "Gambia", value: "Gambia" },
  { label: "Georgia", value: "Georgia" },
  { label: "Germany", value: "Germany" },
  { label: "Ghana", value: "Ghana" },
  { label: "Greece", value: "Greece" },
  { label: "Grenada", value: "Grenada" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Guinea", value: "Guinea" },
  { label: "Guinea-Bissau", value: "Guinea-Bissau" },
  { label: "Guyana", value: "Guyana" },
  { label: "Haiti", value: "Haiti" },
  { label: "Holy See", value: "Holy See" },
  { label: "Honduras", value: "Honduras" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "India", value: "India" },
  { label: "Iran", value: "Iran" },
  { label: "Iraq", value: "Iraq" },
  { label: "Ireland", value: "Ireland" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Jamaica", value: "Jamaica" },
  { label: "Japan", value: "Japan" },
  { label: "Jordan", value: "Jordan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Kenya", value: "Kenya" },
  { label: "Kiribati", value: "Kiribati" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Kyrgyzstan", value: "Kyrgyzstan" },
  { label: "Laos", value: "Laos" },
  { label: "Latvia", value: "Latvia" },
  { label: "Lebanon", value: "Lebanon" },
  { label: "Lesotho", value: "Lesotho" },
  { label: "Liberia", value: "Liberia" },
  { label: "Libya", value: "Libya" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Malawi", value: "Malawi" },
  { label: "Maldives", value: "Maldives" },
  { label: "Mali", value: "Mali" },
  { label: "Malta", value: "Malta" },
  { label: "Marshall Islands", value: "Marshall Islands" },
  { label: "Mauritania", value: "Mauritania" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Mexico", value: "Mexico" },
  { label: "Micronesia", value: "Micronesia" },
  { label: "Moldova", value: "Moldova" },
  { label: "Monaco", value: "Monaco" },
  { label: "Mongolia", value: "Mongolia" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Morocco", value: "Morocco" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Myanmar (formerly Burma)", value: "Myanmar (formerly Burma)" },
  { label: "Namibia", value: "Namibia" },
  { label: "Nauru", value: "Nauru" },
  { label: "Nepal", value: "Nepal" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Nicaragua", value: "Nicaragua" },
  { label: "Niger", value: "Niger" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "North Korea", value: "North Korea" },
  { label: "North Macedonia", value: "North Macedonia" },
  { label: "Norway", value: "Norway" },
  { label: "Oman", value: "Oman" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Palau", value: "Palau" },
  { label: "Palestine State", value: "Palestine State" },
  { label: "Panama", value: "Panama" },
  { label: "Papua New Guinea", value: "Papua New Guinea" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Peru", value: "Peru" },
  { label: "Philippines", value: "Philippines" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Qatar", value: "Qatar" },
  { label: "Romania", value: "Romania" },
  { label: "Russia", value: "Russia" },
  { label: "Rwanda", value: "Rwanda" },
  { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
  { label: "Saint Lucia", value: "Saint Lucia" },
  {
    label: "Saint Vincent and the Grenadines",
    value: "Saint Vincent and the Grenadines",
  },
  { label: "Samoa", value: "Samoa" },
  { label: "San Marino", value: "San Marino" },
  { label: "Sao Tome and Principe", value: "Sao Tome and Principe" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "Senegal", value: "Senegal" },
  { label: "Serbia", value: "Serbia" },
  { label: "Seychelles", value: "Seychelles" },
  { label: "Sierra Leone", value: "Sierra Leone" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Solomon Islands", value: "Solomon Islands" },
  { label: "Somalia", value: "Somalia" },
  { label: "South Africa", value: "South Africa" },
  { label: "South Korea", value: "South Korea" },
  { label: "South Sudan", value: "South Sudan" },
  { label: "Spain", value: "Spain" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Sudan", value: "Sudan" },
  { label: "Suriname", value: "Suriname" },
  { label: "Sweden", value: "Sweden" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Syria", value: "Syria" },
  { label: "Tajikistan", value: "Tajikistan" },
  { label: "Tanzania", value: "Tanzania" },
  { label: "Thailand", value: "Thailand" },
  { label: "Timor-Leste", value: "Timor-Leste" },
  { label: "Togo", value: "Togo" },
  { label: "Tonga", value: "Tonga" },
  { label: "Trinidad and Tobago", value: "Trinidad and Tobago" },
  { label: "Tunisia", value: "Tunisia" },
  { label: "Turkey", value: "Turkey" },
  { label: "Turkmenistan", value: "Turkmenistan" },
  { label: "Tuvalu", value: "Tuvalu" },
  { label: "Uganda", value: "Uganda" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States of America", value: "United States of America" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "Uzbekistan", value: "Uzbekistan" },
  { label: "Vanuatu", value: "Vanuatu" },
  { label: "Venezuela", value: "Venezuela" },
  { label: "Vietnam", value: "Vietnam" },
  { label: "Yemen", value: "Yemen" },
  { label: "Zambia", value: "Zambia" },
  { label: "Zimbabwe", value: "Zimbabwe" },
];

export const phoneAreaCodes = [
  { label: "Afghanistan", value: "+93" },
  { label: "Albania", value: "+355" },
  { label: "Algeria", value: "+213" },
  { label: "American Samoa", value: "1-684" },
  { label: "Andorra", value: "+376" },
  { label: "Angola", value: "+244" },
  { label: "Anguilla", value: "1-264" },
  { label: "Antarctica", value: "+672" },
  { label: "Antigua and Barbuda", value: "1-268" },
  { label: "Argentina", value: "+54" },
  { label: "Armenia", value: "+374" },
  { label: "Aruba", value: "+297" },
  { label: "Australia", value: "+61" },
  { label: "Austria", value: "+43" },
  { label: "Azerbaijan", value: "+994" },
  { label: "Bahamas", value: "1-242" },
  { label: "Bahrain", value: "+973" },
  { label: "Bangladesh", value: "+880" },
  { label: "Barbados", value: "1-246" },
  { label: "Belarus", value: "+375" },
  { label: "Belgium", value: "+32" },
  { label: "Belize", value: "+501" },
  { label: "Benin", value: "+229" },
  { label: "Bermuda", value: "1-441" },
  { label: "Bhutan", value: "+975" },
  { label: "Bolivia", value: "+591" },
  { label: "Bosnia and Herzegovina", value: "+387" },
  { label: "Botswana", value: "+267" },
  { label: "Brazil", value: "+55" },
  { label: "British Indian Ocean Territory", value: "+246" },
  { label: "British Virgin Islands", value: "1-284" },
  { label: "Brunei", value: "+673" },
  { label: "Bulgaria", value: "+359" },
  { label: "Burkina Faso", value: "+226" },
  { label: "Burundi", value: "+257" },
  { label: "Cambodia", value: "+855" },
  { label: "Cameroon", value: "+237" },
  { label: "Canada", value: "+1" },
  { label: "Cape Verde", value: "+238" },
  { label: "Cayman Islands", value: "1-345" },
  { label: "Central African Republic", value: "+236" },
  { label: "Chad", value: "+235" },
  { label: "Chile", value: "+56" },
  { label: "China", value: "+86" },
  { label: "Christmas Island", value: "+61" },
  { label: "Cocos Islands", value: "+61" },
  { label: "Colombia", value: "+57" },
  { label: "Comoros", value: "+269" },
  { label: "Cook Islands", value: "+682" },
  { label: "Costa Rica", value: "+506" },
  { label: "Croatia", value: "+385" },
  { label: "Cuba", value: "+53" },
  { label: "Curacao", value: "+599" },
  { label: "Cyprus", value: "+357" },
  { label: "Czech Republic", value: "+420" },
  { label: "Democratic Republic of the Congo", value: "+243" },
  { label: "Denmark", value: "+45" },
  { label: "Djibouti", value: "+253" },
  { label: "Dominica", value: "1-767" },
  { label: "Dominican Republic1-809, 1-829, ", value: "1-849" },
  { label: "East Timor", value: "+670" },
  { label: "Ecuador", value: "+593" },
  { label: "Egypt", value: "+20" },
  { label: "El Salvador", value: "+503" },
  { label: "Equatorial Guinea", value: "+240" },
  { label: "Eritrea", value: "+291" },
  { label: "Estonia", value: "+372" },
  { label: "Ethiopia", value: "+251" },
  { label: "Falkland Islands", value: "+500" },
  { label: "Faroe Islands", value: "+298" },
  { label: "Fiji", value: "+679" },
  { label: "Finland", value: "+358" },
  { label: "France", value: "+33" },
  { label: "French Polynesia", value: "+689" },
  { label: "Gabon", value: "+241" },
  { label: "Gambia", value: "+220" },
  { label: "Georgia", value: "+995" },
  { label: "Germany", value: "+49" },
  { label: "Ghana", value: "+233" },
  { label: "Gibraltar", value: "+350" },
  { label: "Greece", value: "+30" },
  { label: "Greenland", value: "+299" },
  { label: "Grenada", value: "1-473" },
  { label: "Guam", value: "1-671" },
  { label: "Guatemala", value: "+502" },
  { label: "Guernsey", value: "44-1481" },
  { label: "Guinea", value: "+224" },
  { label: "Guinea-Bissau", value: "+245" },
  { label: "Guyana", value: "+592" },
  { label: "Haiti", value: "+509" },
  { label: "Honduras", value: "+504" },
  { label: "Hong Kong", value: "+852" },
  { label: "Hungary", value: "+36" },
  { label: "Iceland", value: "+354" },
  { label: "India", value: "+91" },
  { label: "Indonesia", value: "+62" },
  { label: "Iran", value: "+98" },
  { label: "Iraq", value: "+964" },
  { label: "Ireland", value: "+353" },
  { label: "Isle of Man", value: "44-1624" },
  { label: "Israel", value: "+972" },
  { label: "Italy", value: "+39" },
  { label: "Ivory Coast", value: "+225" },
  { label: "Jamaica", value: "1-876" },
  { label: "Japan", value: "+81" },
  { label: "Jersey", value: "44-1534" },
  { label: "Jordan", value: "+962" },
  { label: "Kazakhstan", value: "+7" },
  { label: "Kenya", value: "+254" },
  { label: "Kiribati", value: "+686" },
  { label: "Kosovo", value: "+383" },
  { label: "Kuwait", value: "+965" },
  { label: "Kyrgyzstan", value: "+996" },
  { label: "Laos", value: "+856" },
  { label: "Latvia", value: "+371" },
  { label: "Lebanon", value: "+961" },
  { label: "Lesotho", value: "+266" },
  { label: "Liberia", value: "+231" },
  { label: "Libya", value: "+218" },
  { label: "Liechtenstein", value: "+423" },
  { label: "Lithuania", value: "+370" },
  { label: "Luxembourg", value: "+352" },
  { label: "Macau", value: "+853" },
  { label: "Macedonia", value: "+389" },
  { label: "Madagascar", value: "+261" },
  { label: "Malawi", value: "+265" },
  { label: "Malaysia", value: "+60" },
  { label: "Maldives", value: "+960" },
  { label: "Mali", value: "+223" },
  { label: "Malta", value: "+356" },
  { label: "Marshall Islands", value: "+692" },
  { label: "Mauritania", value: "+222" },
  { label: "Mauritius", value: "+230" },
  { label: "Mayotte", value: "+262" },
  { label: "Mexico", value: "+52" },
  { label: "Micronesia", value: "+691" },
  { label: "Moldova", value: "+373" },
  { label: "Monaco", value: "+377" },
  { label: "Mongolia", value: "+976" },
  { label: "Montenegro", value: "+382" },
  { label: "Montserrat", value: "1-664" },
  { label: "Morocco", value: "+212" },
  { label: "Mozambique", value: "+258" },
  { label: "Myanmar", value: "+95" },
  { label: "Namibia", value: "+264" },
  { label: "Nauru", value: "+674" },
  { label: "Nepal", value: "+977" },
  { label: "Netherlands", value: "+31" },
  { label: "Netherlands Antilles", value: "+599" },
  { label: "New Caledonia", value: "+687" },
  { label: "New Zealand", value: "+64" },
  { label: "Nicaragua", value: "+505" },
  { label: "Niger", value: "+227" },
  { label: "Nigeria", value: "+234" },
  { label: "Niue", value: "+683" },
  { label: "North Korea", value: "+850" },
  { label: "Northern Mariana Islands", value: "1-670" },
  { label: "Norway", value: "+47" },
  { label: "Oman", value: "+968" },
  { label: "Pakistan", value: "+92" },
  { label: "Palau", value: "+680" },
  { label: "Palestine", value: "+970" },
  { label: "Panama", value: "+507" },
  { label: "Papua New Guinea", value: "+675" },
  { label: "Paraguay", value: "+595" },
  { label: "Peru", value: "+51" },
  { label: "Philippines", value: "+63" },
  { label: "Pitcairn", value: "+64" },
  { label: "Poland", value: "+48" },
  { label: "Portugal", value: "+351" },
  { label: "Puerto Rico1-787, ", value: "1-939" },
  { label: "Qatar", value: "+974" },
  { label: "Republic of the Congo", value: "+242" },
  { label: "Reunion", value: "+262" },
  { label: "Romania", value: "+40" },
  { label: "Russia", value: "+7" },
  { label: "Rwanda", value: "+250" },
  { label: "Saint Barthelemy", value: "+590" },
  { label: "Saint Helena", value: "+290" },
  { label: "Saint Kitts and Nevis", value: "1-869" },
  { label: "Saint Lucia", value: "1-758" },
  { label: "Saint Martin", value: "+590" },
  { label: "Saint Pierre and Miquelon", value: "+508" },
  { label: "Saint Vincent and the Grenadines", value: "1-784" },
  { label: "Samoa", value: "+685" },
  { label: "San Marino", value: "+378" },
  { label: "Sao Tome and Principe", value: "+239" },
  { label: "Saudi Arabia", value: "+966" },
  { label: "Senegal", value: "+221" },
  { label: "Serbia", value: "+381" },
  { label: "Seychelles", value: "+248" },
  { label: "Sierra Leone", value: "+232" },
  { label: "Singapore", value: "+65" },
  { label: "Sint Maarten", value: "1-721" },
  { label: "Slovakia", value: "+421" },
  { label: "Slovenia", value: "+386" },
  { label: "Solomon Islands", value: "+677" },
  { label: "Somalia", value: "+252" },
  { label: "South Africa", value: "+27" },
  { label: "South Korea", value: "+82" },
  { label: "South Sudan", value: "+211" },
  { label: "Spain", value: "+34" },
  { label: "Sri Lanka", value: "+94" },
  { label: "Sudan", value: "+249" },
  { label: "Suriname", value: "+597" },
  { label: "Svalbard and Jan Mayen", value: "+47" },
  { label: "Swaziland", value: "+268" },
  { label: "Sweden", value: "+46" },
  { label: "Switzerland", value: "+41" },
  { label: "Syria", value: "+963" },
  { label: "Taiwan", value: "+886" },
  { label: "Tajikistan", value: "+992" },
  { label: "Tanzania", value: "+255" },
  { label: "Thailand", value: "+66" },
  { label: "Togo", value: "+228" },
  { label: "Tokelau", value: "+690" },
  { label: "Tonga", value: "+676" },
  { label: "Trinidad and Tobago", value: "1-868" },
  { label: "Tunisia", value: "+216" },
  { label: "Turkey", value: "+90" },
  { label: "Turkmenistan", value: "+993" },
  { label: "Turks and Caicos Islands", value: "1-649" },
  { label: "Tuvalu", value: "+688" },
  { label: "U.S. Virgin Islands", value: "1-340" },
  { label: "Uganda", value: "+256" },
  { label: "Ukraine", value: "+380" },
  { label: "United Arab Emirates", value: "+971" },
  { label: "United Kingdom", value: "+44" },
  { label: "United States", value: "+1" },
  { label: "Uruguay", value: "+598" },
  { label: "Uzbekistan", value: "+998" },
  { label: "Vanuatu", value: "+678" },
  { label: "Vatican", value: "+379" },
  { label: "Venezuela", value: "+58" },
  { label: "Vietnam", value: "+84" },
  { label: "Wallis and Futuna", value: "+681" },
  { label: "Western Sahara", value: "+212" },
  { label: "Yemen", value: "+967" },
  { label: "Zambia", value: "+260" },
  { label: "Zimbabwe", value: "+263" },
];

export const socialMediaOptions = [
  {
    icon: require("public/icons/twitter-color.svg"),
    label: "Twitter",
    value: "twitter",
  },
  {
    icon: require("public/icons/instagram-color.svg"),
    label: "Instagram",
    value: "instagram",
  },
  {
    icon: require("public/icons/facebook-color.svg"),
    label: "Facebook",
    value: "facebook",
  },
  // {
  //   icon: require("public/icons/whatsapp-color.svg"),
  //   label: "WhatsApp",
  //   value: "whatsapp",
  // },
  // {
  //   icon: require("public/icons/telegram-color.svg"),
  //   label: "Telegram",
  //   value: "telegram",
  // },
];

export const shareOptions = [
  {
    icon: require("public/icons/facebook-color.svg"),
    label: "Facebook",
    url: "facebook.com",
  },
  {
    icon: require("public/icons/instagram-color.svg"),
    label: "Instagram",
    url: "instagram.com",
  },
  {
    icon: require("public/icons/twitter-color.svg"),
    label: "Twitter",
    url: "twitter.com",
  },
  {
    icon: require("public/icons/whatsapp-color.svg"),
    label: "WhatsApp",
    url: "facebook.com",
  },
  {
    icon: require("public/icons/telegram-color.svg"),
    label: "Telegram",
    url: "telegram.com",
  },
  {
    icon: require("public/icons/line-color.svg"),
    label: "Line",
    url: "line.com",
  },
];

export const formattedAreaCodes = phoneAreaCodes.map((item) => ({
  label: `${item.label}  ${item.value}`,
  value: item.value,
}));

export const getAddItemsFields = (category, isEdit?: boolean) => {
  switch (category) {
    case Categories.BUY: // Buy
      return {
        title: isEdit ? "Edit product" : "Add products",
        placeholder: ["Product", "describe your product (optional)", "Submit"],
      };
    case Categories.EAT: // Eat
      return {
        title: isEdit ? "Edit dish" : "Add dishes",
        placeholder: ["Dish", "describe your dish (optional)", "Submit"],
      };
    default:
      return {
        title: isEdit ? "Edit service" : "Add services",
        placeholder: ["Service", "describe your service (optional)", "Submit"],
      };
  }
};

export const dummySavedDeals = [
  {
    imgUrl: "https://picsum.photos/300/600",
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 17, 2022",
    type: 2,
    startDate: "",
    favourite: true,
  },
  {
    imgUrl: "https://picsum.photos/300/600",
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    startDate: "",
    expiredAt: "April 17, 2022 - April 30, 2022",
    type: 2,
    favourite: true,
  },
  {
    imgUrl: "https://picsum.photos/300/600",
    title:
      "Complimentary top up set (mushroom soup with garlic bread) with every main purchased",
    expiredAt: "April 17, 2022 - April 24, 2022",
    startDate: "",
    type: 2,
    favourite: true,
  },
];

export const optionsReportPhoto = [
  { id: "photo-1", label: "Offensive, hateful or sexually explicit" },
  { id: "photo-2", label: "Legal issue" },
  { id: "photo-3", label: "Privacy concern" },
  { id: "photo-4", label: "Poor quality" },
  { id: "photo-5", label: "Not a photo of the place" },
  { id: "other-photo", label: "Other" },
];

export const optionsReportReview = [
  { id: "review-1", label: "Digress" },
  { id: "review-2", label: "Not suitable" },
  { id: "review-3", label: "Causing a conflict of interest" },
  { id: "review-4", label: "Impolite" },
  { id: "review-5", label: "Bullying or harassing" },
  { id: "review-6", label: "Discrimination or hate speech" },
  { id: "review-7", label: "Personal information" },
  { id: "review-8", label: "Not helpful" },
  { id: "other", label: "Other" },
];

export const optionsReportListing = [
  { id: "listing-1", label: "Content that is dishonest or inaccurate" },
  { id: "listing-2", label: "This place is not real" },
  { id: "other-listing", label: "Other" },
];

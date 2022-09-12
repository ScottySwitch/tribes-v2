import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import get from "lodash/get";
import Head from "next/head";
import Script from "next/script";

import type { AppProps } from "next/app";
import Footer from "components/Footer/Footer";
import Header from "components/TheHeader/Header";
import { Tiers, UserTypes } from "enums";
import { UserInforProvider } from "Context/UserInforContext";
import CategoryApi from "services/category";
import HamModal from "components/HamModal/HamModal";
import ContributeTabBar from "components/ContributeTabBar/ContributeTabBar";
import Toast from "components/Toast/Toast";
import { idGoogleAnalytics, codeHotjar, codeGoogleAnalytics } from "constant";

import "../styles/globals.css";
import styles from "styles/App.module.scss";

export type ILoginInfor = {
  token?: string;
  type?: UserTypes;
  tier?: Tiers;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  listing_follow_ids?: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const { code } = router.query;
  const notAuthPages = [
    "/login",
    "/signup",
    "/forgot-password",
    "/forgot-password/otp",
    "/forgot-password/reset",
    "/signup/otp",
    "/signup/setup-profile",
    "/biz/verify",
  ];
  const isAuthPage = !notAuthPages.includes(pathname);

  const [loginInfor, setLoginInfo] = useState<ILoginInfor>({});
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showHamModal, setShowHamModal] = useState(false);
  const [navList, setNavList] = useState<{ [key: string]: any }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const stringyLoginInfo = localStorage.getItem("user");
    const localLoginInfo = stringyLoginInfo ? JSON.parse(stringyLoginInfo) : {};

    const getMenuList = async () => {
      const dataCategories = await CategoryApi.getItemCategory();
      const rawCategories = get(dataCategories, "data.data");
      const categoryArray = await rawCategories.map((item) => ({
        category: get(item, "attributes.name"),
        icon: get(item, "attributes.icon"),
        slug: get(item, "attributes.slug"),
        id: item.id,
        items: Array.isArray(get(item, "attributes.category_links.data"))
          ? get(item, "attributes.category_links.data").map((navItem) => ({
              label: get(navItem, "attributes.label"),
              value: get(navItem, "attributes.value"),
              href: `/${get(item, "attributes.slug")}/${get(
                navItem,
                "attributes.value"
              )}`,
            }))
          : [],
      }));
      setNavList(categoryArray);
    };

    setIsMobile(screen.width < 501);
    setLoginInfo(localLoginInfo.token ? localLoginInfo : {});
    setTimeout(() => {
      getMenuList();
      setShowAuthPopup(!localLoginInfo.token);
      const script: any = document.createElement("script");
      script.dangerouslySetInnerHTML = codeHotjar;
      script.defer = true;
      document.body.appendChild(script);
    }, 6500);

    getMenuList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (code) {
      sessionStorage.setItem("referralCode", JSON.stringify(code));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  //handle logic hide header when scroll, not hide when in desktop || when setShowOpenHoursModal ham modal || in unAuthPages
  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    const header = document.getElementById("header") as any;
    const handleScroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos < currentScrollPos && !showHamModal && isAuthPage) {
        header.style.top = header && screen.width < 501 ? "-120px" : "-60px";
      } else {
        header.style.top = "0";
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHamModal, isAuthPage]);

  const AuthPopup = dynamic(import("../components/AuthPopup/AuthPopup"));

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${idGoogleAnalytics}`}
        strategy="lazyOnload"
      />
      <Script
        id="gg-analytics"
        dangerouslySetInnerHTML={codeGoogleAnalytics}
        strategy="lazyOnload"
      />
      {/* <Script
        id="hotjar"
        dangerouslySetInnerHTML={codeHotjar}
        strategy="lazyOnload"
      /> */}
      <UserInforProvider>
        <Head>
          <meta
            property="og:image"
            content="https://exploretribes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdefault-thumbnail.1402cbdd.png&w=1920&q=75"
          />
        </Head>
        <div className={styles.app}>
          <Header
            id="header"
            loginInfor={loginInfor}
            navList={navList}
            onOpenHamModal={() => setShowHamModal(!showHamModal)}
          />
          <Component {...pageProps} />
          <AuthPopup
            onClose={() => setShowAuthPopup(false)}
            visible={isAuthPage && showAuthPopup && !loginInfor.token}
          />
          <HamModal
            loginInfor={loginInfor}
            showHamModal={showHamModal}
            onSetShowHamModal={(e: boolean) => setShowHamModal(e)}
          />
          <ContributeTabBar visible={!showHamModal && isAuthPage && isMobile} />
          <Footer
            navList={navList}
            visible={isAuthPage}
            backgroundColor={pathname !== "/biz/[information]/[listingSlug]"}
          />
          <Toast />
        </div>
      </UserInforProvider>
    </>
  );
}

export default MyApp;

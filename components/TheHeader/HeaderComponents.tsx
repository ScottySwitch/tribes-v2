import classNames from "classnames";
import { isArray } from "lodash";
import get from "lodash/get";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Menu from "components/Menu/Menu";
import Popover from "components/Popover/Popover";
import { contributePopOverList, languages } from "constant";
import { UserTypes } from "enums";

import Modal from "components/Modal/Modal";
import { UserInforContext } from "Context/UserInforContext";

import { ILoginInfor } from "pages/_app";
import defaultAvatar from "public/images/default-avatar.svg";
import { getListingUrl, isPaidUser } from "utils";
import styles from "./Header.module.scss";

export const formatLanguages = () => {
  return languages.map((lang) => ({
    label: (
      <div className="flex gap-2 items-center">
        <Icon icon={lang.icon} size={30} /> {lang.label}
      </div>
    ),
    value: lang.value,
  }));
};

export const Categories = (props: {
  currentCategory?: string;
  onSetCurrentCategory: (e: string) => void;
  navList: { [key: string]: any }[];
}) => {
  const { onSetCurrentCategory, currentCategory, navList } = props;
  const router = useRouter();

  return (
    <React.Fragment>
      {navList.map((cat) => {
        const isSelected = currentCategory === cat.category;
        const categoryContent = (
          <React.Fragment>
            {cat.items.map((value) => (
              <div
                key={value.value}
                onClick={() => router.push(`/${cat.slug}/${value.value}`)}
              >
                {value.label}
              </div>
            ))}
          </React.Fragment>
        );
        return (
          <Popover key={cat.category} content={categoryContent} hoverable>
            <div
              className={classNames(styles.category, {
                [styles.selected]: isSelected,
              })}
              onClick={() => router.push(`/${cat.slug}`)}
            >
              <Icon icon={cat.icon} size={20} className={styles.icon} />
              <div className={cat.width}>{cat.category}</div>
            </div>
          </Popover>
        );
      })}
    </React.Fragment>
  );
};

export const ContributeContent = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      {contributePopOverList.map((item) => (
        <div key={item.label} onClick={() => router.push(item.href)}>
          <Icon icon={item.icon} size={20} />
          {item.label}
        </div>
      ))}
    </React.Fragment>
  );
};

export const SwitchAccountsContent = () => {
  const router = useRouter();
  const { user, updateUser } = useContext(UserInforContext);

  const ownerListing = isArray(get(user, "owner_listings"))
    ? get(user, "owner_listings").map((item) => item.attributes)
    : [];

  const { query } = router;
  const { listingSlug } = query;

  const handleSwitchToNormalUser = async () => {
    router.push("/");
    updateUser({
      avatar: user.user_avatar,
      current_listing_slug: undefined,
      user_type: UserTypes.NORMAL_USER,
    });
  };

  const handleSwitchListing = async (item) => {
    updateUser({
      avatar: get(item, "logo[0]"),
      current_listing_slug: get(item, "slug"),
      user_type: UserTypes.BIZ_USER,
      is_paid: isPaidUser(item.expiration_date),
    });
    router.push(
      `/${getListingUrl(
        get(item, "categories.data[0].attributes.name"),
        get(item, "category_links.data[0].attributes.value"),
        get(item, "slug")
      )}/edit`
    );
  };

  return (
    <React.Fragment>
      {ownerListing.map((item) => (
        <div
          key={item.name}
          className={styles.wrapper_content}
          onClick={() => handleSwitchListing(item)}
        >
          <div className={styles.listing_icon}>
            <Image
              alt="logo"
              layout="fill"
              src={
                get(item, "logo[0]") ||
                require("public/images/default-page-avatar.svg")
              }
            />
          </div>
          <div className={styles.name}>
            {item.name}
            {listingSlug === item.slug && (
              <Icon icon="icon-check-bold" size={14} color="#4acc8f" />
            )}
          </div>
        </div>
      ))}
      <div className={styles.user_account} onClick={handleSwitchToNormalUser}>
        <div className={styles.user_account_icon}>
          <Image
            layout="fill"
            src={user.user_avatar || defaultAvatar}
            alt="avatar"
          />
        </div>
        <div>
          <strong className={styles.user_name}>
            {user.first_name} {user.last_name}
          </strong>
          <p className="text-xs">User account</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export const UserInfor = ({ loginInfor = {} }: { loginInfor: ILoginInfor }) => {
  const router = useRouter();
  const { user, updateUser } = useContext(UserInforContext);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const handleSwitchToBizUser = () => {
    const hasOwnedListings = get(user, "owner_listings.length") > 0;
    if (hasOwnedListings) {
      return true;
    } else {
      router.push("/claim");
      return false;
    }
  };

  return (
    <>
      <div
        className={classNames(styles.gadget_group, {
          [styles.hide]: !(
            user.token && user.user_type === UserTypes.NORMAL_USER
          ),
        })}
      >
        <Popover
          content={<SwitchAccountsContent />}
          position="bottom-left"
          onBeforePopUp={handleSwitchToBizUser}
        >
          <div className="flex gap-2 items-center w-max">
            <Icon icon="business" size={20} />
            Business
          </div>
        </Popover>
        <Popover
          hoverable
          contentClassName={styles.user_point_content}
          content={"Get more points by contributing to Tribes!"}
        >
          <div
            className={styles.user_point}
            onClick={() =>
              router.push(
                {
                  pathname: `/profile/information`,
                  query: {
                    currentTab: "Point history",
                  },
                },
                `/profile/information`
              )
            }
          >
            <Image
              src={require("/public/images/championship-cup.svg")}
              alt="cup"
              height={20}
              layout="fixed"
            />
            Points<span className={styles.point}>{user.point || "0"}</span>
          </div>
        </Popover>
        <Popover content={<ContributeContent />}>
          <Button
            prefix={<Icon icon="plus" size={20} />}
            text="Contribute"
            className={styles.contribute_button}
          />
        </Popover>
        {/* <Icon icon="noti-color" size={20} /> */}
        <Popover
          content={<Menu loginInfor={loginInfor} />}
          position="bottom-left"
        >
          <div className={styles.avatar}>
            <Image
              src={user.avatar || defaultAvatar}
              alt="avatar"
              layout="fill"
            />
          </div>
        </Popover>
        <Modal
          title="Switch account"
          width={600}
          visible={showSwitchModal}
          mobilePosition="center"
          onClose={() => setShowSwitchModal(false)}
        >
          <div className="p-[30px] pt-0 flex flex-col gap-5">
            <SwitchAccountsContent />
          </div>
        </Modal>
      </div>
      <div
        className={classNames(styles.gadget_group, {
          [styles.hide]: !(user.token && user.user_type === UserTypes.BIZ_USER),
        })}
      >
        <Popover content={<SwitchAccountsContent />} position="bottom-left">
          <div className="flex gap-2 items-center w-max">
            <Icon icon="user-color" size={20} />
            Switch accounts
          </div>
        </Popover>
        <Image
          src={user.avatar || require("public/images/default-page-avatar.svg")}
          alt="avatar"
          width={40}
          height={40}
          onClick={() =>
            router.push(`/biz/information/${user.current_listing_slug}`)
          }
          className={`${styles.avatar} cursor-pointer`}
        />
      </div>
      <div
        className={classNames(styles.gadget_group, {
          [styles.hide]: user.token,
        })}
      >
        <Button
          text="Sign up"
          variant="outlined"
          onClick={() => router.push("/signup")}
        />
        <Button text="Login" onClick={() => router.push("/login")} />
      </div>
    </>
  );
};

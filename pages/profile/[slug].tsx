import Button from "components/Button/Button";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import TopSearches from "components/TopSearches/TopSearches";
import CompleteProfileCard from "components/UserProfilePage/CompleteProfileCard/CompleteProfileCard";
import CoverImage from "components/UserProfilePage/CoverImage/CoverImage";
import PanelAbout from "components/UserProfilePage/PanelAbout/PanelAbout";
import ContributedPanel from "components/UserProfilePage/PanelContributed/PanelContributed";
import FavouriedPanel from "components/UserProfilePage/PanelFavouried/PanelFavouried";
import SavedDealsPanel from "components/UserProfilePage/PanelSavedDeals/PanelSavedDeals";
import { dummySavedDeals } from "constant";
import { UserInforContext } from "Context/UserInforContext";
import { ProfileTabs } from "enums";
import get from "lodash/get";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import FollowApi from "services/user-listing-follow";

import Modal from "components/Modal/Modal";
import Popover from "components/Popover/Popover";
import ProgressUserModal from "components/ProgressUserModal/ProgressUserModal";
import PopupLevel from "components/UserProfilePage/PopupLevel/PopupLevel";
import PopupPoint from "components/UserProfilePage/PopupPoint/PopupPoint";
import Head from "next/head";
import ContributeApi from "services/contribute";
import styles from "styles/Profile.module.scss";
import { getUserLevel } from "utils";

const GroupHeadingOne = (props: {
  name: string;
  imageUrl?: string;
  points: number;
  onClick?: () => void;
}) => {
  const { name, imageUrl, points, onClick } = props;
  const [showModalLevelUser, setShowModalLevelUser] = useState(false);

  return (
    <div className={styles.group_heading_one}>
      <div className="flex items-end flex-wrap lg:flex-nowrap">
        <div className={styles.avatar}>
          <Image
            className={styles.avatar_img}
            src={imageUrl || require("public/images/default-page-avatar.svg")}
            width="100%"
            height="100%"
            layout="responsive"
            alt="avatar"
          />
        </div>
        <div className={styles.header}>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.show_desktop}>
            <Popover hoverable noneBgHover content={<PopupLevel />}>
              <div className={styles.level}>
                <Image src={getUserLevel(points)} alt="" />
              </div>
            </Popover>
          </div>
          <div className={styles.show_mobile}>
            <div
              className={styles.level}
              onClick={() => setShowModalLevelUser(true)}
            >
              <Image src={getUserLevel(points)} alt="" />
            </div>
            <Modal
              visible={showModalLevelUser}
              onClose={() => setShowModalLevelUser(false)}
            >
              <PopupLevel onClose={() => setShowModalLevelUser(false)} />
            </Modal>
          </div>
        </div>
      </div>
      <CompleteProfileCard
        icon="like-color-2"
        onClick={onClick}
        className={styles.complete_profilecard_desktop}
      />
    </div>
  );
};

const GroupHeadingTwo = (props: {
  contributions: number;
  following?: number;
  points: number;
  onClick?: () => void;
}) => {
  const { contributions, following, points, onClick } = props;
  const router = useRouter();
  const [numberFollow, setNumberFollow] = useState<number>(0);
  const [showModalPoint, setShowModalPoint] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const dataFollow = await FollowApi.getFollowByUserId();
      setNumberFollow(get(dataFollow, "data.meta.pagination.total"));
    };
    getData();
  }, []);

  return (
    <React.Fragment>
      <div className={styles.group_heading_two}>
        <div className={styles.outstanding_criteria_container}>
          <div className={styles.outstanding_criteria}>
            <h5>Contributions</h5>
            <span>{contributions}</span>
          </div>
          <div className={styles.outstanding_criteria}>
            <h5>Following</h5>
            <span>{numberFollow}</span>
          </div>
          <div className={styles.outstanding_criteria}>
            <div className={styles.show_desktop}>
              <Popover hoverable noneBgHover content={<PopupPoint />}>
                <div className={styles.point}>
                  <h5>Points</h5>
                  <span>{points}</span>
                </div>
              </Popover>
            </div>
            <div className={styles.show_mobile}>
              <div
                className={styles.point}
                onClick={() => setShowModalPoint(true)}
              >
                <h5>Points</h5>
                <span>{points}</span>
              </div>
              <Modal
                visible={showModalPoint}
                onClose={() => setShowModalPoint(false)}
              >
                <PopupPoint onClose={() => setShowModalPoint(false)} />
              </Modal>
            </div>
          </div>
        </div>
        <Button
          className={styles.btn_edit_profile}
          variant="secondary"
          text="Edit profile"
          width={164}
          onClick={() => router.push("/profile/information")}
        />
      </div>
      <CompleteProfileCard
        icon="like-color-2"
        onClick={onClick}
        className={styles.complete_profilecard_mobile}
      />
    </React.Fragment>
  );
};

interface IContributions {
  pending: any[];
  approved: any[];
}

const ProfilePage = (context) => {
  const router = useRouter();
  const { slug }: any = router.query;

  const { user } = useContext(UserInforContext);

  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>(context.slug);
  const [contributions, setContributions] = useState<IContributions>({
    pending: [],
    approved: [],
  });

  const [metaTitle, setMetaTitle] = useState("My Account | Tribes by HHWT");
  const [metaDescription, setMetaDescription] = useState(
    "Access your profile page"
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setSelectedTab(slug);
    const getUserInfor = () =>
      ContributeApi.getUserContribute()
        .then(async (res) => {
          const contributionRawData = get(res, "data.data");
          let contributionData: IContributions = {
            pending: [],
            approved: [],
          };
          Array.isArray(contributionRawData) &&
            contributionRawData.forEach((cont) => {
              cont.status === "Pending" && contributionData.pending.push(cont);
              cont.status === "Approved" &&
                contributionData.approved.push(cont);
            });
          setContributions(contributionData);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));

    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userInfo || !userInfo?.token) {
      router.push("/");
    } else {
      getUserInfor();
    }
  }, [router, slug]);

  const TabList: ITab[] = [
    {
      label: ProfileTabs.FAVOURITED,
      value: ProfileTabs.FAVOURITED,
      content: <FavouriedPanel />,
    },
    {
      label: ProfileTabs.SAVED_DEALS,
      value: ProfileTabs.SAVED_DEALS,
      content: <SavedDealsPanel data={dummySavedDeals} />,
    },
    {
      label: ProfileTabs.CONTRIBUTED,
      value: ProfileTabs.CONTRIBUTED,
      content: (
        <ContributedPanel contributions={contributions} loading={loading} />
      ),
    },
    {
      label: ProfileTabs.ABOUT,
      value: ProfileTabs.ABOUT,
      content: <PanelAbout data={user} />,
    },
  ];

  const contributionNumber =
    get(contributions, "pending.length", 0) +
    get(contributions, "approved.length", 0);

  return (
    <div className="wrapper-profile">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className={styles.section_cover_image}>
        <CoverImage
          layout="fill"
          imageUrl={require("../../public/images/default-banner-profile.png")}
        />
      </div>
      <SectionLayout
        className={styles.section_profile}
        containerClassName={styles.section_profile_container}
      >
        <GroupHeadingOne
          points={user.pointer_system || 0}
          name={
            user.display_name || `${user.first_name} ${user.last_name || ""}`
          }
          imageUrl={user.avatar}
          onClick={() => setIsVisible(true)}
        />
        <GroupHeadingTwo
          onClick={() => setIsVisible(true)}
          contributions={contributionNumber || "0"}
          points={user.pointer_system || 0}
        />
        <TabsHorizontal
          key={selectedTab}
          selectedTab={selectedTab}
          tablist={TabList}
          type="secondary-no-outline"
          className={styles.profile_tab}
          onChangeTab={(tab) =>
            router.push(`/profile/${tab}`, undefined, { shallow: false })
          }
        />
        <TopSearches className={styles.top_searches} />
        <ProgressUserModal
          visible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </SectionLayout>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      slug: context.query.slug || "",
    },
  };
}

export default ProfilePage;

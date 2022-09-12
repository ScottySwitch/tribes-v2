import Loader from "components/Loader/Loader";
import ListingInfoCardInReview from "components/ReviewsPage/ListingInfoCardInReview/ListingInfoCardInReview";
import UserReviewCard, {
  UserReviewCardProps,
} from "components/ReviewsPage/UserReviewCard/UserReviewCard";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import { format } from "date-fns";
import isArray from "lodash/isArray";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { getListingUrl } from "utils";
import styles from "./PanelContributed.module.scss";
interface IBiz {
  title: string;
  imgUrl: string;
  location: string;
  rate?: number;
  rateNumber?: number;
  followerNumber?: number;
  tags?: any[];
}
export interface ListCardProps extends UserReviewCardProps {
  biz_listing?: IBiz;
}

const formatDate = (date) => {
  return format(date ? new Date(date) : new Date(), "dd-MMM-yyyy");
};

export const ListCard = (props: { data: ListCardProps[] }) => {
  const { data } = props;

  return (
    <div className="flex flex-col gap-5">
      {isArray(data) &&
        data.map((item: ListCardProps, index) => {
          const user = get(item, "user.data.attributes") || get(item, "user");
          const reviewListing = get(item, "review") || {};
          const bizListing =
            get(item, "biz_listing.data.attributes") ||
            get(item, "biz_listing") ||
            get(item, "biz_listing_revision") ||
            {};
          return (
            <UserReviewCard
              key={index}
              isDivider
              point={get(item, "pointer")}
              user={user}
              name={user.display_name || user.first_name + " " + user.last_name}
              avatarUrl={user.avatar}
              listImage={reviewListing.images}
              actions={false}
              content={reviewListing.content}
              dateVisit={reviewListing.visited_date}
              rating={reviewListing.rating}
              createdDate={formatDate(reviewListing.date_create_reply)}
              approvedDate={formatDate(item.publishedAt)}
              status={item.status}
              displayName={reviewListing.displayName}
              className={styles.user_review_card}
              censorshipLabel={
                isEmpty(reviewListing)
                  ? "has created a listing"
                  : "has reviewed"
              }
            >
              <ListingInfoCardInReview
                listingUrl={getListingUrl(
                  get(bizListing, "categories[0]"),
                  get(bizListing, "category_links[0]"),
                  get(bizListing, "slug")
                )}
                title={bizListing.name}
                imgUrl={get(bizListing, "images[0]")}
                location={`${bizListing.address}, ${bizListing.country}`}
                rate={bizListing.rate}
                rateNumber={bizListing.rate_number}
                tags={bizListing.tags}
                followerNumber={
                  get(bizListing, "user_listing_follows.length") || "0"
                }
              />
            </UserReviewCard>
          );
        })}
    </div>
  );
};

const ContributedPanel = ({
  contributions,
  loading,
}: {
  contributions: { pending: any[]; approved: any[] };
  loading: boolean;
}) => {
  const router = useRouter();

  const TabList: ITab[] = [
    {
      label: `Pending (${get(contributions, "pending.length")})`,
      customSelected: "pending_selected",
      value: "pending",
      content: <ListCard data={contributions.pending} />,
    },
    {
      label: `Approved (${get(contributions, "approved.length")})`,
      customSelected: "approved_selected",
      value: "approved",
      content: <ListCard data={contributions.approved} />,
    },
    // { label: "Denied", value: "denied", content: <ListCard data={listCard} /> },
  ];

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.contributed_panel}>
      <TabsHorizontal
        selectedTab={TabList[0].value}
        tablist={TabList}
        type="primary-outline"
        className={styles.contributed_tab}
      />
    </div>
  );
};

export default ContributedPanel;

import styles from "./Referral.module.scss";
import Button from "components/Button/Button";
import Image from "next/image";
import Icon from "components/Icon/Icon";
import { toast } from "react-toastify";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { useEffect, useState } from "react";
import pointApi from "services/point";
import get from "lodash/get";

interface ReferralProps {
  code?: string;
}

const Referral = (props: ReferralProps) => {
  const { code } = props;
  const [refereeNumber, setRefereeNumber] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await pointApi.getRefereeNumber();
    if (get(data, "data.data")) {
      setRefereeNumber(get(data, "data.data.length"));
    }
  };

  const handleCopyUrl = () =>
    navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_DOMAIN}?code=${code}`)
      .then(() => {
        toast.success("Copied!", {
          autoClose: 2000,
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
        });
      });

  return (
    <div className={styles.referral_container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Refer a friend</h1>
        <p className={styles.text}>
          Earn 5 points with every successful referral!
        </p>
      </div>
      <div className={styles.link_wrapper}>
        <div className={styles.link_input}>
          <p className={styles.label}>URL Code</p>
          <p
            className={styles.link}
            onClick={handleCopyUrl}
          >{`https://exploretribes/${code ? code : ""}`}</p>
        </div>
        <Button
          onClick={handleCopyUrl}
          className={styles.copy}
          text="Copy"
          size="small"
        />
      </div>
      <div className={styles.sharing}>
        <FacebookShareButton
          className={styles.icon}
          url={`${process.env.NEXT_PUBLIC_DOMAIN}?code=${code}`}
        >
          <Image
            src={require("public/icons/facebook-reffer-icon.svg")}
            alt="twitter-icon"
            layout="fill"
          />
        </FacebookShareButton>
        <TwitterShareButton
          url={`${process.env.NEXT_PUBLIC_DOMAIN}?code=${code}`}
          className={styles.icon}
        >
          <Image
            src={require("public/icons/twitter-reffer-icon.svg")}
            alt="twitter-icon"
            layout="fill"
          />
        </TwitterShareButton>
      </div>
      <div className={styles.success}>
        <Icon icon="reffer-friend" size={24} />
        <p className={styles.text}>
          Successful referred friends: <strong>{refereeNumber}</strong>
        </p>
      </div>
    </div>
  );
};

export default Referral;

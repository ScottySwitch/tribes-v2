import styles from "./PopupPoint.module.scss";
import { isArray } from "utils";
import Modal from "components/Modal/Modal";
import Icon from "components/Icon/Icon";
// import { levelList} from "constant";
import classNames from "classnames";
import Image from "next/image";
import Button from "components/Button/Button";

const pointLists = [
  {
    key: "level-1",
    level: "Browsing Brands",
    point: "3 points browsing 3 brands ( once a day )",
  },
  { key: "level-2", level: "Rating", point: "1 points" },
  {
    key: "level-3",
    level: "Review with less than 200 characters",
    point: "75 points",
  },
  {
    key: "level-4",
    level: "Review with more than 200 characters",
    point: "250 points",
  },
  { key: "level-5", level: "Review with photo", point: "500 points" },
  { key: "level-6", level: "Review with video", point: "1.500 points" },
  { key: "level-7", level: "Complete profile", point: "5000 points" },
  { key: "level-8", level: "Complete profile", point: "15.000 points" },
  { key: "level-9", level: "New Place added", point: "50.000 points" },
  { key: "level-10", level: "Refer a friend", point: "100.000 points" },
];

interface PopupPointsProps {
  onClose?: () => void;
}

const PopupPoint = (props: PopupPointsProps) => {
  const { onClose } = props;

  return (
    <div className={styles.popup_point_container}>
      <div className={styles.header}>
        <div className={styles.title}>tribes contribution</div>
        <div className={classNames(styles.title, styles.title_point)}>
          POINTS
        </div>
      </div>
      <div className={styles.body}>
        {isArray(pointLists) &&
          pointLists.map((item) => (
            <div className={styles.row} key={item.key}>
              <div className={classNames(styles.cell, styles.text)}>
                {item.level}
              </div>
              <div className={classNames(styles.cell, styles.text)}>
                {item.point}
              </div>
            </div>
          ))}
        <Button
          onClick={onClose}
          className={styles.button}
          text="Close"
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default PopupPoint;

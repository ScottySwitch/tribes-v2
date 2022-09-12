import styles from "./PopupLevel.module.scss";
import { isArray } from "utils";
import Modal from "components/Modal/Modal";
import Icon from "components/Icon/Icon";
import classNames from "classnames";
import Image from "next/image";
import Button from "components/Button/Button";

const levelLists = [
  {
    key: "level-1",
    level: require("../../../public/icons/icon-level1.svg"),
    point: "0 point",
  },
  {
    key: "level-2",
    level: require("../../../public/icons/icon-level2.svg"),
    point: "15 points",
  },
  {
    key: "level-3",
    level: require("../../../public/icons/icon-level3.svg"),
    point: "75 points",
  },
  {
    key: "level-4",
    level: require("../../../public/icons/icon-level4.svg"),
    point: "250 points",
  },
  {
    key: "level-5",
    level: require("../../../public/icons/icon-level5.svg"),
    point: "500 points",
  },
  {
    key: "level-6",
    level: require("../../../public/icons/icon-level6.svg"),
    point: "1.500 points",
  },
  {
    key: "level-7",
    level: require("../../../public/icons/icon-level7.svg"),
    point: "5000 points",
  },
  {
    key: "level-8",
    level: require("../../../public/icons/icon-level8.svg"),
    point: "15.000 points",
  },
  {
    key: "level-9",
    level: require("../../../public/icons/icon-level9.svg"),
    point: "50.000 points",
  },
  {
    key: "level-10",
    level: require("../../../public/icons/icon-level10.svg"),
    point: "100.000 points",
  },
];

interface PopupLevelProps {
  onClose?: () => void;
}

const PopupLevel = (props: PopupLevelProps) => {
  const { onClose } = props;

  return (
    <div className={styles.popup_level_container}>
      <div className={styles.header}>
        <div className={styles.title}>CONTRIBUTOR LEVEL</div>
        <div className={classNames(styles.title, styles.title_point)}>
          POINTS
        </div>
      </div>
      <div className={styles.body}>
        {isArray(levelLists) &&
          levelLists.map((item) => (
            <div className={styles.row} key={item.key}>
              <div className={styles.level}>
                <Image src={item.level} alt="" />
              </div>
              <div className={classNames(styles.point, styles.level)}>
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

export default PopupLevel;

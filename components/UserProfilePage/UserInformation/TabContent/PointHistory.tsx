import isArray from "lodash/isArray";
import { ListCard } from "components/UserProfilePage/PanelContributed/PanelContributed";
import toNumber from "lodash/toNumber";
import get from "lodash/get";
import { useEffect, useState } from "react";
import pointApi from "services/point";
import Image from "next/image";

import styles from "./TabContent.module.scss";

const PointHistory = () => {
  const [pointHistory, setPointHistory] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  useEffect(() => {
    const getPointHistory = async () => {
      const response = await pointApi.getPointHistory();
      const pointHistoryData = get(response, "data.data") || [];
      let userPoints = 0;
      const formattedPointHistory = pointHistoryData.map((item) => {
        userPoints = userPoints + toNumber(get(item, "attributes.pointer"));
        return item.attributes;
      });
      setPointHistory(formattedPointHistory);
      setTotalPoints(userPoints);
    };

    getPointHistory();
  }, []);

  console.log(isArray(pointHistory) && pointHistory.length > 2);
  return (
    <div className={styles.tab_content_container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Point history</h2>
        <div className={styles.current_point}>
          <Image
            src={require("/public/images/championship-cup.svg")}
            alt="cup"
            height={25}
            layout="fixed"
          />
          Current points <span className={styles.point}>{totalPoints}</span>
        </div>
      </div>
      {isArray(pointHistory) && pointHistory.length > 0 ? (
        <ListCard data={pointHistory} />
      ) : (
        <div>"There is no activity yet"</div>
      )}
    </div>
  );
};

export default PointHistory;

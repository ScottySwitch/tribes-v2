import get from "lodash/get";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TopSearchApi from "services/top-search";
import styles from "./TopSearches.module.scss";

interface ITopSearchesProp {
  className?: string;
}

const TopSearches = (props: ITopSearchesProp) => {
  const { className } = props;
  const [keywords, setKeyWords] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await TopSearchApi.getTopSearches();
    const rawTopSearchData = get(data, "data.data");
    const topSearchArray = Array.isArray(rawTopSearchData)
      ? rawTopSearchData.map((item) => ({
          name: item.attributes.name,
          link: item.attributes.link,
        }))
      : [];
    setKeyWords(topSearchArray);
  };

  return (
    <React.Fragment>
      {keywords && (
        <div className={`${styles.top_search} ${className}`}>
          <div className={styles.top_search_label}>{"Top search"}</div>
          <ul className={styles.top_search_list}>
            {keywords?.map((keyword, index) => (
              <li
                className={`${styles.top_search_item} cursor-pointer`}
                key={keyword.name + index}
                onClick={() => router.push(`${keyword.link}`)}
              >
                <span className={styles.top_search_keyword}>
                  {keyword.name}
                </span>
                <span className={styles.divider}>|</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default TopSearches;

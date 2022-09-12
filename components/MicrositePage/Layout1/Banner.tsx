import classNames from "classnames";
import Album from "components/Album/Album";
import Carousel from "components/Carousel/Carousel";
import Icon from "components/Icon/Icon";
import Modal from "components/Modal/Modal";
import Upload from "components/Upload/Upload";
import {
  homeBannerResponsive,
  homeCuratedResponsive,
  micrositeBannerResponsive,
} from "constant";
import get from "lodash/get";
import Image from "next/image";
import React, { useState } from "react";
import { detectIsVideo, isArray } from "utils";
import styles from "./Banner.module.scss";
interface BannerProps {
  banners: string[];
  className?: string;
}

const Banner = (props: BannerProps) => {
  const { banners, className } = props;

  return (
    <React.Fragment>
      <Carousel
        isMicrosite
        responsive={micrositeBannerResponsive}
        key={get(banners, "length")}
        isShow={isArray(banners)}
        className={classNames(styles.banners, styles.special, className)}
      >
        {isArray(banners) &&
          banners.map((img, index) => (
            <div key={index}>
              <div className={classNames(styles.banner_card, className)}>
                {detectIsVideo(img) ? (
                  <video controls={true} src={img} autoPlay={true} />
                ) : (
                  <Image src={img} layout="fill" alt="image" />
                )}
              </div>
            </div>
          ))}
      </Carousel>
    </React.Fragment>
  );
};

export default Banner;

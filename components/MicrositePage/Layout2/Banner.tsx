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
import showdown from "showdown";
import { useRouter } from "next/router";

interface BannerProps {
  images: string[];
  className?: string;
  content: string;
  banners: string[];
  firstLink?: string;
  secondLink?: string;
  thirdLink?: string;
}

const Banner = (props: BannerProps) => {
  const {
    images,
    className,
    content,
    banners,
    firstLink,
    secondLink,
    thirdLink,
  } = props;
  const router = useRouter();

  const defaultImage = require("public/images/default-thumbnail.png");
  const firstImage = get(images, "[0]") || defaultImage;
  const secondImage = get(images, "[1]") || defaultImage;
  const thirdImage = get(images, "[2]") || defaultImage;

  const converter = new showdown.Converter();

  return (
    <div className={className}>
      <div className={styles.content}>
        <div
          className={styles.content_banner}
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(content),
          }}
        />
        <Carousel
          isMicrosite={get(banners, "length") === 1 ? "hiddenButton" : true}
          responsive={micrositeBannerResponsive}
          key={get(banners, "length")}
          isShow={isArray(banners)}
          className={styles.content_slider}
        >
          {isArray(banners) &&
            banners.map((img, index) => (
              <div key={index} className={styles.slider_container}>
                <div className={styles.banner_card}>
                  {detectIsVideo(img) ? (
                    <video controls={true} src={img} autoPlay={true} />
                  ) : (
                    <Image src={img} layout="fill" alt="image-banners" />
                  )}
                </div>
              </div>
            ))}
        </Carousel>
      </div>
      <div className={styles.images}>
        <div
          className={styles.first_image}
          onClick={() => firstLink && window.open(firstLink)}
        >
          <Image layout="fill" src={firstImage} alt="image-banners" />
        </div>
        <div className={styles.right}>
          <div
            className={styles.second_image}
            onClick={() => secondLink && window.open(secondLink)}
          >
            <Image layout="fill" src={secondImage} alt="image-banners" />
          </div>
          <div
            className={styles.second_image}
            onClick={() => thirdLink && window.open(thirdLink)}
          >
            <Image layout="fill" src={thirdImage} alt="image-banners" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

import React, { FC, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { LinkedButton } from '../../../Buttons/LinkedButton';
import PictureSaves from './PictureSaves';
import styles from './styles.module.scss';

type Props = {
  spotName: string;
  images: {
    id: number;
    src: string;
    savesNumber: number;
    saved: boolean;
    author: string;
  }[]
};

export const MobileSpotHeader: FC<Props> = ({
  spotName,
  images,
}) => {
  const [currentSlideData, setCurrentSlideData] = useState<{
    slideNumber: number,
    savesNumber: number,
    saved: boolean
  }>({
    slideNumber: 0,
    savesNumber: images[0].savesNumber,
    saved: images[0].saved,
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const slides = images.map((slide) => (
    <div key={slide.id} className={styles.slide}>
      <Image src={slide.src} width={360} height={180} layout="fill" />
      <span className={styles.author}>
        Added by:
        {' '}
        {slide.author}
      </span>
    </div>
  ));

  return (
    <div className={styles.mobileSpotHeader}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <LinkedButton link="" iconName="back-button" iconSize={40} />
          <div className={styles.right}>
            <LinkedButton link="" iconName="share-link" iconSize={40} />
            <PictureSaves saved={currentSlideData.saved} count={currentSlideData.savesNumber} />
          </div>
        </div>
        <div className={styles.pictureCount}>
          <span>{currentSlideData.slideNumber}</span>
          /
          <span>{images.length}</span>
        </div>
        <Slider
          {...settings}
          afterChange={(i) => {
            setCurrentSlideData({
              slideNumber: i,
              savesNumber: images[i].savesNumber,
              saved: images[i].saved,
            });
          }}

        >
          {slides}
        </Slider>
      </div>
      <h1>
        {spotName}
      </h1>
    </div>
  );
};

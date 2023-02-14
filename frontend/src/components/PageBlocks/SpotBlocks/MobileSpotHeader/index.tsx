import React, { FC, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';

type Props = {
  spotName: string;
  images: string[]
};

export const MobileSpotHeader: FC<Props> = ({
  spotName,
  images,
}) => {
  const [currentSlideData, setCurrentSlideData] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const router = useRouter();

  const slides = images.map((slide) => (
    <div key={slide} className={styles.slide}>
      <Image src={slide} width={360} height={180} layout="fill" unoptimized />
      <span className={styles.author}>
        Added by: Author
      </span>
    </div>
  ));

  return (
    <div className={styles.mobileSpotHeader}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.right} onClick={() => router.back()}>
            <Icon iconName="back-button" size={40} />
          </div>
          {/* <div className={styles.right}> */}
          {/*  <Icon iconName="share-link" size={40} /> */}
          {/*  <PictureSaves saved={currentSlideData.saved} */}
          {/* count={currentSlideData.savesNumber} /> */}
          {/* </div> */}
        </div>
        <div className={styles.pictureCount}>
          <span>{currentSlideData + 1}</span>
          /
          <span>{images.length}</span>
        </div>
        <Slider
          {...settings}
          afterChange={(i) => {
            setCurrentSlideData(i);
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

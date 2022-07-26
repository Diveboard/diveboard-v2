import React, { FC } from 'react';

import Slider from 'react-slick';
import { Arrow } from './SampleArrow/sampleArrow';
import { PhotoCard } from '../../Cards/PhotoCard';

import styles from './styles.module.scss';

type Props = {
  photos: {
    imgScr: string;
    favorites: number;
    author?: string;
    id?: number;
  }[];
};

export const DesktopPhotoBlock: FC<Props> = ({ photos }) => {
  const newPhotoArray = [];

  const getPhotoAllbom = ():JSX.Element[] => {
    for (let i = 0; i < photos.length;) {
      const curr = photos[i];
      const next = photos[i + 1];

      if (i % 3 === 0) {
        newPhotoArray.push(
          <div key={curr.id} className={styles.column}>
            <PhotoCard imgSrc={curr.imgScr} favourites={curr.favorites} size="normal" authorName={curr.author} />
          </div>,
        );
        i++;
        // eslint-disable-next-line no-continue
        continue;
      }

      newPhotoArray.push(
        next
          ? [
            <div key={curr.id} className={styles.column}>
              <PhotoCard imgSrc={curr.imgScr} favourites={curr.favorites} size="small" authorName={curr.author} />
              <PhotoCard imgSrc={next.imgScr} favourites={next.favorites} size="small" authorName={next.author} />
            </div>,
          ]
          : [
            <div key={curr.id} className={styles.column}>
              <PhotoCard imgSrc={curr.imgScr} favourites={curr.favorites} size="normal" authorName={curr.author} />
            </div>,
          ],
      );
      i += 2;
    }
    return newPhotoArray;
  };

  const gallery = getPhotoAllbom();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <Arrow
      classNameArr={['nextArrowBottom']}
      type="next"
      className=""
      onClick={() => null}
    />,
    prevArrow: <Arrow
      classNameArr={['prevArrowBottom']}
      className=""
      onClick={() => null}
    />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {gallery.map((itm, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          {itm}
        </div>
      ))}
    </Slider>
  );
};

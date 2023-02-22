import React, { FC, useEffect, useState } from 'react';

import Slider from 'react-slick';
import {
  doc, DocumentReference,
} from '@firebase/firestore';
import { Arrow } from './SampleArrow/sampleArrow';
import { PhotoCard } from '../../Cards/PhotoCard';

import styles from './styles.module.scss';
import { firestoreGalleryService } from '../../../firebase/firestore/firestoreServices/firestoreGalleryService';
import { db } from '../../../firebase/firestore/firebaseFirestore';
import { notify } from '../../../utils/notify';

type Props = {
  photos: Array<string>;
  pictures?: Array<{
    pictureRef: DocumentReference
  }>
};

export const DesktopPhotoBlock: FC<Props> = ({ photos, pictures }) => {
  const newPhotoArray = [];
  const [photosForRender, setPhotosForRender] = useState(photos);
  const size = pictures?.length || photos?.length || 0;

  useEffect(() => {
    setPhotosForRender(photos);
  }, [photos]);

  const getPhotoAllbom = (): JSX.Element[] => {
    for (let i = 0; i < size;) {
      const curr = photosForRender[i];
      const next = photosForRender[i + 1];
      if (i % 3 === 0) {
        newPhotoArray.push(
          <div key={curr} className={styles.column}>
            <PhotoCard imgUrl={curr} size="normal" authorName="Author" />
          </div>,
        );
        i++;
        // eslint-disable-next-line no-continue
        continue;
      }

      newPhotoArray.push(
        next
          ? [
            <div key={curr} className={styles.column}>
              <PhotoCard imgUrl={curr} size="small" authorName="Author" />
              <PhotoCard imgUrl={next} size="small" authorName="Author" />
            </div>,
          ]
          : [
            <div key={curr} className={styles.column}>
              <PhotoCard imgUrl={curr} size="normal" authorName="Author" />
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
    beforeChange: async (curr, next) => {
      if (next > curr && pictures && photosForRender.length < pictures.length) {
        const refs = {};
        pictures.slice(photosForRender.length, photosForRender.length + 2)
          .forEach(({ pictureRef }) => {
            // @ts-ignore
            const segments = pictureRef?._key?.path?.segments;
            const id = segments[segments.length - 1];
            refs[id] = doc(db, `pictures/${id}`);
          });
        try {
          const res = await firestoreGalleryService.getBestPictures(refs);
          setPhotosForRender([...photosForRender, ...res]);
        } catch (e) {
          notify(e.message);
        }
      }
    },
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
      {gallery.map((itm, idx) => (
        <div key={itm.key || idx}>
          {itm}
        </div>
      ))}
    </Slider>
  );
};

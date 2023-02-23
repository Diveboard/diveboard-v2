import React, { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { doc, DocumentReference } from '@firebase/firestore';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';
import { db } from '../../../../firebase/firestore/firebaseFirestore';
import { firestoreGalleryService } from '../../../../firebase/firestore/firestoreServices/firestoreGalleryService';
import { notify } from '../../../../utils/notify';

type Props = {
  spotName: string;
  images: string[];
  pictures: Array<{
    pictureRef: DocumentReference
  }>
};

export const MobileSpotHeader: FC<Props> = ({
  spotName,
  images,
  pictures,
}) => {
  const [currentSlideData, setCurrentSlideData] = useState(0);

  const [photosForRender, setPhotosForRender] = useState(images);

  useEffect(() => {
    setPhotosForRender(images);
  }, [images]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const router = useRouter();

  const slides = pictures.map((slide, idx) => (
    <div key={photosForRender[idx]} className={styles.slide}>
      <Image src={photosForRender[idx] || '/appIcons/no-photo.svg'} width={360} height={180} layout="fill" unoptimized />
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
          <span>{pictures.length}</span>
        </div>
        <Slider
          {...settings}
          beforeChange={async (curr, next) => {
            setCurrentSlideData(next);
            if (next > curr && pictures && photosForRender.length < pictures.length) {
              const refs = {};
              pictures.slice(photosForRender.length, photosForRender.length + 1)
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

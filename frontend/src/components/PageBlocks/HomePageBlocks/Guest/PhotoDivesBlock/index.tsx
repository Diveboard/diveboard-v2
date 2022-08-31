import React from 'react';
import { PhotoCard } from '../../../../Cards/PhotoCard';
import { ArrowLink } from '../../../../ArrowLink';
import styles from './styles.module.scss';

export const PhotoDivesBlock = () => (
  <div className={styles.photoDivesWrapper}>
    <h2 className={styles.title}>Photos From Our Divers</h2>

    <div className={styles.photoWrapper}>
      <div className={styles.leftGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgSrc="/TEST_IMG_THEN_DELETE/shark.jpg"
            favourites={136}
            size="normal"
          />
          <PhotoCard
            imgSrc="/TEST_IMG_THEN_DELETE/photo2.jpg"
            favourites={136}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgSrc="/TEST_IMG_THEN_DELETE/photo3.jpg"
            favourites={136}
            size="small"
          />
          <PhotoCard
            imgSrc="/TEST_IMG_THEN_DELETE/photo4.jpg"
            favourites={136}
            size="normal"
          />
        </div>
      </div>
      <div className={styles.rightGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgSrc="/TEST_IMG_THEN_DELETE/photo5.jpg"
            favourites={136}
            size="normal"
          />
          <PhotoCard
            imgSrc="/TEST_IMG_THEN_DELETE/photo6.jpg"
            favourites={136}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgSrc="/TEST_IMG_THEN_DELETE/photo7.jpg"
            favourites={136}
            size="small"
          />
          <PhotoCard
            imgSrc="/TEST_IMG_THEN_DELETE/photo8.jpg"
            favourites={136}
            size="normal"
          />
        </div>
      </div>
    </div>
    <div className={styles.arrowWrapper}>
      <ArrowLink text="View Gallery" color="#0059DE" link="/" />
    </div>
  </div>
);

import React from 'react';
import { PhotoCard } from '../../../../Cards/PhotoCard';
import { ArrowLink } from '../../../../ArrowLink';
import styles from './styles.module.scss';
import { photos } from '../../../../DivePage/DIVE_PAGE_DUMMY_DATA';

export const PhotoDivesBlock = () => (
  <div className={styles.photoDivesWrapper}>
    <h2 className={styles.title}>Photos From Our Divers</h2>

    <div className={styles.photoWrapper}>
      <div className={styles.leftGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgSrc={photos[0]}
            favourites={136}
            size="normal"
          />
          <PhotoCard
            imgSrc={photos[1]}
            favourites={136}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgSrc={photos[2]}
            favourites={136}
            size="small"
          />
          <PhotoCard
            imgSrc={photos[3]}
            favourites={136}
            size="normal"
          />
        </div>
      </div>
      <div className={styles.rightGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgSrc={photos[4]}
            favourites={136}
            size="normal"
          />
          <PhotoCard
            imgSrc={photos[5]}
            favourites={136}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgSrc={photos[2]}
            favourites={136}
            size="small"
          />
          <PhotoCard
            imgSrc={photos[3]}
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

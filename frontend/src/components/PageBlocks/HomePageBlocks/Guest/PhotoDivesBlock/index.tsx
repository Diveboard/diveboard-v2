import React from 'react';
import { PhotoCard } from '../../../../Cards/PhotoCard';
import { ArrowLink } from '../../../../ArrowLink';
import styles from './styles.module.scss';
import { photos } from '../../../../DivePage/DIVE_PAGE_DUMMY_DATA';
import pagesRoutes from '../../../../../routes/pagesRoutes.json';

export const PhotoDivesBlock = () => (
  <div className={styles.photoDivesWrapper}>
    <h2 className={styles.title}>Photos From Our Divers</h2>

    <div className={styles.photoWrapper}>
      <div className={styles.leftGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={photos[0].img}
            favourites={136}
            size="normal"
          />
          <PhotoCard
            imgUrl={photos[1].img}
            favourites={136}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={photos[2].img}
            favourites={136}
            size="small"
          />
          <PhotoCard
            imgUrl={photos[3].img}
            favourites={136}
            size="normal"
          />
        </div>
      </div>
      <div className={styles.rightGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={photos[4].img}
            favourites={136}
            size="normal"
          />
          <PhotoCard
            imgUrl={photos[5].img}
            favourites={136}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={photos[2].img}
            favourites={136}
            size="small"
          />
          <PhotoCard
            imgUrl={photos[3].img}
            favourites={136}
            size="normal"
          />
        </div>
      </div>
    </div>
    <div className={styles.arrowWrapper}>
      <ArrowLink text="View Gallery" color="#0059DE" link={pagesRoutes.galleryPageRout} />
    </div>
  </div>
);

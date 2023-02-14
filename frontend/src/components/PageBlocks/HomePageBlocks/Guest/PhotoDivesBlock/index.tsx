import React from 'react';
import { PhotoCard } from '../../../../Cards/PhotoCard';
import { ArrowLink } from '../../../../ArrowLink';
import styles from './styles.module.scss';
import pagesRoutes from '../../../../../routes/pagesRoutes.json';

export const photos = [
  {
    img: '/appIcons/no-photo.svg',
    date: null,
    draft: false,
    spot: '',
  }, {
    img: '/appIcons/no-photo.svg',
    date: null,
    draft: false,
    spot: '',
  }, {
    img: '/appIcons/no-photo.svg',
    date: null,
    draft: false,
    spot: '',
  }, {
    img: '/appIcons/no-photo.svg',
    date: null,
    draft: false,
    spot: '',
  }, {
    img: '/appIcons/no-photo.svg',
    date: null,
    draft: false,
    spot: '',
  },
  {
    img: '/appIcons/no-photo.svg',
    date: null,
    draft: false,
    spot: '',
  },
];

export const PhotoDivesBlock = () => (
  <div className={styles.photoDivesWrapper}>
    <h2 className={styles.title}>Photos From Our Divers</h2>

    <div className={styles.photoWrapper}>
      <div className={styles.leftGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={photos[0].img}
            size="normal"
          />
          <PhotoCard
            imgUrl={photos[1].img}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={photos[2].img}
            size="small"
          />
          <PhotoCard
            imgUrl={photos[3].img}
            size="normal"
          />
        </div>
      </div>
      <div className={styles.rightGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={photos[4].img}
            size="normal"
          />
          <PhotoCard
            imgUrl={photos[5].img}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={photos[2].img}
            size="small"
          />
          <PhotoCard
            imgUrl={photos[3].img}
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

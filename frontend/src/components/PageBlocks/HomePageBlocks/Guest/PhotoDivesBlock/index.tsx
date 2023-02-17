import React, { FC } from 'react';
import { PhotoCard } from '../../../../Cards/PhotoCard';
import { ArrowLink } from '../../../../ArrowLink';
import styles from './styles.module.scss';
import pagesRoutes from '../../../../../routes/pagesRoutes.json';
import { ImageInfo } from '../../../../../types';

type Props = {
  gallery: Array<ImageInfo>
};
export const PhotoDivesBlock: FC<Props> = ({ gallery }): JSX.Element => (
  <div className={styles.photoDivesWrapper}>
    <h2 className={styles.title}>Photos From Our Divers</h2>

    <div className={styles.photoWrapper}>
      <div className={styles.leftGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={gallery[0].url}
            size="normal"
          />
          <PhotoCard
            imgUrl={gallery[1].url}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={gallery[2].url}
            size="small"
          />
          <PhotoCard
            imgUrl={gallery[3].url}
            size="normal"
          />
        </div>
      </div>
      <div className={styles.rightGroup}>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={gallery[4].url}
            size="normal"
          />
          <PhotoCard
            imgUrl={gallery[5].url}
            size="small"
          />
        </div>
        <div className={styles.column}>
          <PhotoCard
            imgUrl={gallery[6].url}
            size="small"
          />
          <PhotoCard
            imgUrl={gallery[7].url}
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

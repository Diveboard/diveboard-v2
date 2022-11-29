import React, { FC } from 'react';
import { PhotoCard } from '../../Cards/PhotoCard';
import styles from './styles.module.scss';
import { ImageInfo } from '../../../types';

type Props = {
  photos: Array<ImageInfo>
};

export const MobilePhotoGroup: FC<Props> = ({ photos }) => {
  const photosElements = photos.map((photo) => (
    <div key={photo.img}>
      <PhotoCard
        imgSrc={photo}
        favourites={0}
        size="mobileScroll"
        authorName="Author"
      />
    </div>
  ));

  return (
    <div className={styles.scrollWrapper}>{photosElements}</div>
  );
};

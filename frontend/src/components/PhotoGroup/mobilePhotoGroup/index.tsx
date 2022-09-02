import React, { FC } from 'react';
import { PhotoGroupProps } from '../photoGroupProps';
import { PhotoCard } from '../../Cards/PhotoCard';
import styles from './styles.module.scss';

export const MobilePhotoGroup:FC<PhotoGroupProps> = ({ photos }) => {
  const photosElements = photos.map((photo) => (
    <div key={photo.imgScr}>
      <PhotoCard
        imgSrc={photo.imgScr}
        favourites={photo.favorites}
        size="mobileScroll"
        authorName={photo.author}
      />
    </div>
  ));

  return (
    <div className={styles.scrollWrapper}>{photosElements}</div>
  );
};

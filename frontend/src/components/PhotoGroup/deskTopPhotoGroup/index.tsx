import React, { FC } from 'react';
import styles from './styles.module.scss';
import { PhotoCard } from '../../Cards/PhotoCard';
import { PhotoGroupProps } from '../photoGroupProps';

export const DeskTopPhotoGroup: FC<PhotoGroupProps> = ({ photos }) => {
  if (photos.length !== 6) {
    throw new Error('there must be 6 pictures');
  }
  const photosElements = photos.map((photo, index) => {
    if (index % 3 === 0) {
      return (
        <PhotoCard
          imgSrc={photo.imgScr}
          favourites={photo.favorites}
          size="normal"
          authorName={photo.author}
        />
      );
    }
    return (
      <PhotoCard
        imgSrc={photo.imgScr}
        favourites={photo.favorites}
        size="small"
        authorName={photo.author}
      />
    );
  });
  return (
    <div className={styles.photoWrapper}>

      <div className={styles.column}>
        {photosElements[0]}
      </div>

      <div className={styles.column}>
        {photosElements[1]}
        {photosElements[2]}
      </div>

      <div className={styles.column}>
        {photosElements[3]}
      </div>

      <div className={styles.column}>
        {photosElements[4]}
        {photosElements[5]}
      </div>

    </div>
  );
};

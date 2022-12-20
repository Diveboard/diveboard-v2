import React, { FC } from 'react';
import { PhotoCard } from '../../Cards/PhotoCard';
import styles from './styles.module.scss';

type Props = {
  photos: Array<string>
};

export const MobilePhotoGroup: FC<Props> = ({ photos }) => {
  const photosElements = photos.map((photo) => (
    <div key={photo}>
      <PhotoCard
        imgUrl={photo}
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

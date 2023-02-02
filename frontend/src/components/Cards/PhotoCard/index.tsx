import React, { FC } from 'react';
import Image from 'next/image';
import { imageLoader } from '../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  imgUrl?: string;
  addedToFavourite?: boolean;
  size?: 'normal' | 'small' | 'mobileScroll';
  onToggle?: () => void;
  authorName?: string
};

export const PhotoCard: FC<Props> = ({
  addedToFavourite,
  size,
  onToggle,
  authorName,
  imgUrl,
}) => {
  const getCardSize = () => {
    if (size === 'normal') {
      return `${styles.photoCard} ${styles.normalImgSize}`;
    } if (size === 'mobileScroll') {
      return `${styles.photoCard} ${styles.scrollSize}`;
    } if (size === 'small') {
      return `${styles.photoCard} ${styles.smallImgSize}`;
    }
    return `${styles.photoCard}`;
  };

  return (
    <div
      className={
        addedToFavourite !== undefined
          ? `${getCardSize()} ${styles.toggleable}`
          : getCardSize()
      }
      onClick={onToggle}
    >
      {size ? (
        <Image
          src={imgUrl}
          layout="fill"
          loader={imageLoader}
          className={styles.img}
          unoptimized
        />
      ) : (
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          src={imgUrl}
          alt="photo"
        />
      )}

      {/* <FavoritesBlock isFavorite={addedToFavourite} count={favourites} /> */}
      {authorName && (
      <span className={styles.author}>
        added by:
        {' '}
        {authorName}
      </span>
      )}
    </div>
  );
};

import React, { FC } from 'react';
import Image from 'next/image';
import { Icon, imageLoader } from '../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  favourites: number;
  addedToFavourite?: boolean;
  size: 'normal' | 'small' | 'mobileScroll';
  onToggle?: () => void;
  authorName?:string
};

export const PhotoCard: FC<Props> = ({
  imgSrc,
  addedToFavourite,
  favourites,
  size,
  onToggle,
  authorName,
}) => {
  const getCardSize = () => {
    if (size === 'normal') {
      return `${styles.photoCard} ${styles.normalImgSize}`;
    } if (size === 'mobileScroll') {
      return `${styles.photoCard} ${styles.scrollSize}`;
    }
    return `${styles.photoCard} ${styles.smallImgSize}`;
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
      <Image
        src={imgSrc}
        layout="fill"
        loader={imageLoader}
        className={styles.img}
      />
      <span className={styles.favouritesBlock}>
        <span>{favourites}</span>
        <span>Saves</span>

        <Icon
          iconName={addedToFavourite ? 'heart filled in' : 'heart'}
          size={16}
        />
      </span>
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

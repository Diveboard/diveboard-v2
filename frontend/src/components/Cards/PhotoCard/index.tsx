import React, { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Icon, imageLoader } from '../../Icons/Icon';

type Props = {
  imgSrc: string;
  favourites: number;
  addedToFavourite?: boolean;
  size: 'normal' | 'small';
  onToggle?: () => void;
};

export const PhotoCard: FC<Props> = ({
  imgSrc,
  addedToFavourite,
  favourites,
  size,
  onToggle,
}) => {
  const getCardSize = () => {
    if (size === 'normal') {
      return `${styles.photoCard} ${styles.normalImgSize}`;
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
      <Image src={imgSrc} layout="fill"
             loader={imageLoader}
             className={styles.img} />
      <span className={styles.favouritesBlock}>
        <span>{favourites}</span>
        <span>Saves</span>

        <Icon
          iconName={addedToFavourite ? 'heart filled in' : 'heart'}
          size={16}
        />
      </span>
    </div>
  );
};

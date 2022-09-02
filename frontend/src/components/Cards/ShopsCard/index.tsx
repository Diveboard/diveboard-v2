import React, { FC } from 'react';
import Image from 'next/image';
import { Icon, imageLoader } from '../../Icons/Icon';
import styles from './style.module.scss';
import { Score } from '../../Icons/IconSVGComponents/Score';

type Props = {
  imgSrc: string;
  addedToFavourite: boolean;
  shopName: string;
  place: string;
  score: number;
  scoredCount: number;
};

export const ShopCard: FC<Props> = ({
  imgSrc,
  addedToFavourite,
  shopName,
  place,
  score,
  scoredCount,
}) => (
  <div className={styles.shopCard}>
    <div className={styles.imgWrapper}>
      <Image
        src={imgSrc}
        layout="fill"
        loader={imageLoader}
        className={styles.img}
        unoptimized
      />
    </div>
    <span className={styles.favourite}>
      <Icon
        iconName={addedToFavourite ? 'heart filled in' : 'heart'}
        size={16}
      />
    </span>

    <div className={styles.footer}>
      <span className={styles.diveName}>{shopName}</span>
      <div className={styles.data}>
        <div className={styles.left}>
          <Icon iconName="Egypt" size={16} />
          <span>{place}</span>
        </div>
        <div className={styles.right}>
          <Score score={score} />
          <span>{score}</span>
          {' '}
          <span className={styles.count}>
            (
            {scoredCount}
            )
          </span>
        </div>
      </div>

    </div>
  </div>
);

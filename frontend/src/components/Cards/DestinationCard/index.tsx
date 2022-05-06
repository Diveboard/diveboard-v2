import React, { FC } from 'react';
import Image from 'next/image';
import { Icon, imageLoader } from '../../Icons/Icon';
import { Rating } from '../../Rating';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  destinationName: string;
  country: string;
  rating: number;
  divesNumber: number;
};

export const DestinationCard: FC<Props> = ({
  imgSrc,
  destinationName,
  country,
  divesNumber,
  rating,
}) => (
  <div className={styles.card}>
    <div className={styles.imgWrapper}>
      <Image
        src={imgSrc}
        className={styles.img}
        layout="fill"
        alt={destinationName}
        loader={imageLoader}
      />
    </div>

    <div className={styles.cardFooter}>
      <span className={styles.destinationName}>{destinationName}</span>
      <div className={styles.footerInnerWrapper}>
        <div className={styles.countryWrapper}>
          <Icon iconName={country} />
          <span className={styles.country}>
            {' '}
            {country}
          </span>
        </div>

        <div className={styles.ratingWrapper}>
          <Rating rating={rating} />
          <span className={styles.dives}>{divesNumber}</span>
        </div>
      </div>
    </div>
  </div>
);

import React, { FC } from 'react';
import Image from 'next/image';
import { Icon } from '../../Icons/Icon';
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
          <div className={styles.rating}>
            <Icon
              iconName={rating >= 1 ? 'star filled in' : 'star outline'}
              size={20}
            />
            <Icon
              iconName={rating >= 2 ? 'star filled in' : 'star outline'}
              size={20}
            />
            <Icon
              iconName={rating >= 3 ? 'star filled in' : 'star outline'}
              size={20}
            />
            <Icon
              iconName={rating >= 4 ? 'star filled in' : 'star outline'}
              size={20}
            />
            <Icon
              iconName={rating >= 5 ? 'star filled in' : 'star outline'}
              size={20}
            />
          </div>
          <span className={styles.dives}>{divesNumber}</span>
        </div>
      </div>
    </div>
  </div>
);

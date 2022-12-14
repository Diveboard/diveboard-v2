import React, { FC } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { Icon, imageLoader } from '../../Icons/Icon';
import { month } from '../../../utils/date';

type Props = {
  imgSrc: string;
  tagsNumber: string;
  addedToFavourite: boolean;
  date: Date;
  diveName;
  diveTime: string;
  deepness: number;
  diversCount: number;
  onClick: () => void;
};

export const DiveCard: FC<Props> = ({
  onClick,
  imgSrc,
  tagsNumber,
  date,
  diveTime,
  diveName,
  diversCount,
  deepness,
  addedToFavourite,
}) => {
  const diveDate = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return (
    <div className={styles.diveCard} onClick={onClick}>
      <div className={styles.imgWrapper}>
        <Image
          src={imgSrc}
          layout="fill"
          loader={imageLoader}
          className={styles.img}
          unoptimized
        />
      </div>

      <span className={styles.tags}>
        #
        {tagsNumber}
      </span>
      <span className={styles.favourite}>
        <Icon
          iconName={addedToFavourite ? 'heart filled in' : 'heart'}
          size={16}
        />
      </span>

      <div className={styles.footer}>
        <span className={styles.date}>{diveDate}</span>
        <span className={styles.diveName}>{diveName}</span>

        <div className={styles.dataWrapper}>
          <div className={styles.dataItem}>
            <Icon iconName="time" size={16} />
            <span>
              {diveTime}
            </span>
          </div>
          <div className={styles.dataItem}>
            <Icon iconName="depth" size={16} />
            <span>
              {deepness}
              {' '}
              m
            </span>
          </div>
          <div className={styles.dataItem}>
            <Icon iconName="divers" size={16} />
            <span>
              {diversCount}
              {' '}
              divers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

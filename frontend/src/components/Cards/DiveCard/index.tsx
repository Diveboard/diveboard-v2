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
  diveTime: number;
  deepness: number;
  diversCount: number;
};

export const DiveCard: FC<Props> = ({
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
    <div className={styles.diveCard}>

      <Image
        src={imgSrc}
        width={420}
        height={224}
        loader={imageLoader}
        className={styles.img}
      />

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
              {' '}
              m
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

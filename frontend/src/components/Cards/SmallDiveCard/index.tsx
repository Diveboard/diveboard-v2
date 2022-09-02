import React, { FC } from 'react';
import Image from 'next/image';
import { Icon, imageLoader } from '../../Icons/Icon';
import { month } from '../../../utils/date';
import styles from './style.module.scss';

type Props = {
  imgSrc: string;
  date: Date;
  diverName: string;
  diveTime: number;
  deepness: number;
  diversCount: number;
};

export const SmallDiveCard: FC<Props> = ({
  imgSrc,
  date,
  diveTime,
  diverName,
  diversCount,
  deepness,
}) => {
  const diveDate = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return (
    <div className={styles.diveCard}>
      <div className={styles.imgWrapper}>
        <Image
          src={imgSrc}
          layout="fill"
          loader={imageLoader}
          className={styles.img}
          unoptimized
        />
      </div>

      <div className={styles.footer}>
        <span className={styles.date}>{diveDate}</span>
        <span className={styles.diveName}>{diverName}</span>

        <div className={styles.dataWrapper}>
          <div className={styles.dataItem}>
            <Icon iconName="time" size={16} />
            <span>
              {diveTime}
              {' '}
              min
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

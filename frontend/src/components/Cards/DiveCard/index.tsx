import React, { FC, useContext } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { Icon, imageLoader } from '../../Icons/Icon';
import { month } from '../../../utils/date';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import { UnitSystem } from '../../../firebase/firestore/models';
import { convertDepth } from '../../../utils/unitSystemConverter';

type Props = {
  imgSrc: string;
  tagsNumber: string;
  date: Date;
  diveName;
  duration: number;
  deepness: number;
  diversCount: number;
  onClick: () => void;
  diveUnitSystem: UnitSystem;
};

export const DiveCard: FC<Props> = ({
  onClick,
  imgSrc,
  tagsNumber,
  date,
  duration,
  diveName,
  diversCount,
  deepness,
  diveUnitSystem,
}) => {
  const diveDate = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const {
    userAuth,
  } = useContext(AuthStatusContext);

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
      {/* <span className={styles.favourite}> */}
      {/*  <Icon */}
      {/*    iconName={addedToFavourite ? 'heart filled in' : 'heart'} */}
      {/*    size={16} */}
      {/*  /> */}
      {/* </span> */}

      <div className={styles.footer}>
        <span className={styles.date}>{diveDate}</span>
        <span className={styles.diveName}>{diveName}</span>

        <div className={styles.dataWrapper}>
          {!!duration && (
          <div className={styles.dataItem}>
            <Icon iconName="time" size={16} />
            <span>
              {duration}
            </span>
          </div>
          ) }
          {!!deepness && (
          <div className={styles.dataItem}>
            <Icon iconName="depth" size={16} />
            <span>
              {convertDepth(userAuth, diveUnitSystem, deepness)}
            </span>
          </div>
          )}
          {!!diversCount && (
          <div className={styles.dataItem}>
            <Icon iconName="divers" size={16} />
            <span>
              {diversCount}
              {' '}
              {diversCount > 1 ? 'divers' : 'diver'}
            </span>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

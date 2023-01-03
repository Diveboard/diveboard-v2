import React, { FC, useContext } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { Icon, imageLoader } from '../../Icons/Icon';
import { month } from '../../../utils/date';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import { UnitSystem } from '../../../firebase/firestore/models';
import { convertFeetToMeters, convertMetersToFeet } from '../../../utils/unitSystemConverter';

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
  diveUnitSystem: UnitSystem
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
  diveUnitSystem,
}) => {
  const diveDate = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const displayDeepness = (): string => {
    if (!userAuth) {
      return `${deepness} m`;
    }
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (diveUnitSystem === userUnitSystem) {
      return `${deepness} ${userUnitSystem === 'METRIC' ? 'm' : 'ft'}`;
    }
    if (userUnitSystem === 'METRIC') {
      return `${convertFeetToMeters(deepness)} m`;
    }
    return `${convertMetersToFeet(deepness)} ft`;
  };

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
              {displayDeepness()}
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

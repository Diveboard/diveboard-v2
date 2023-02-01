import React, { FC, useContext } from 'react';
import Image from 'next/image';
import { Icon, imageLoader } from '../../Icons/Icon';
import { month } from '../../../utils/date';
import styles from './style.module.scss';
import { convertFeetToMeters, convertMetersToFeet } from '../../../utils/unitSystemConverter';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import { UnitSystem } from '../../../firebase/firestore/models';

type Props = {
  imgSrc: string;
  date: Date;
  diverName: string;
  diveTime: string;
  deepness: number;
  diversCount: number;
  diveUnitSystem: UnitSystem
};

export const SmallDiveCard: FC<Props> = ({
  imgSrc,
  date,
  diveTime,
  diverName,
  diversCount,
  deepness,
  diveUnitSystem,
}) => {
  const diveDate = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const displayDeepness = (): string => {
    if (!userAuth) {
      return `${deepness || 0} m`;
    }
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (diveUnitSystem === userUnitSystem) {
      return `${deepness || 0} ${userUnitSystem === 'METRIC' ? 'm' : 'ft'}`;
    }
    if (userUnitSystem === 'METRIC') {
      return `${deepness ? convertFeetToMeters(deepness) : 0} m`;
    }
    return `${deepness ? convertMetersToFeet(deepness) : 0} ft`;
  };

  return (
    <div className={styles.diveCard}>
      <div className={styles.imgWrapper}>
        <Image
          src={imgSrc || '/appIcons/no-photo.svg'}
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

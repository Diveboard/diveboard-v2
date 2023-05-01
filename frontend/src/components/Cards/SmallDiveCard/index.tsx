import React, { FC, useContext } from 'react';
import Image from 'next/image';
import { DocumentReference } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { Icon, imageLoader } from '../../Icons/Icon';
import { month } from '../../../utils/date';
import styles from './style.module.scss';
import { convertDepth } from '../../../utils/unitSystemConverter';
import { AuthStatusContext } from '../../../layouts/AuthLayout';
import { UnitSystem } from '../../../firebase/firestore/models';

type Props = {
  imgSrc: string;
  date: Date;
  diverName: string;
  duration: number;
  deepness: number;
  diversCount: number;
  diveUnitSystem: UnitSystem;
  diveRef: DocumentReference
};

export const SmallDiveCard: FC<Props> = ({
  imgSrc,
  date,
  diverName,
  diversCount,
  deepness,
  duration,
  diveUnitSystem,
  diveRef,
}) => {
  const diveDate = date ? `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` : '';
  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const router = useRouter();

  return (
    <div
      className={styles.diveCard}
      onClick={() => {
        // @ts-ignore
        const segments = diveRef?._key?.path?.segments;
        if (segments?.length) {
          const path = `/user/${segments[segments.length - 3]}/dive/${segments[segments.length - 1]}`;
          router.push(path);
        }
      }}
    >
      <div className={styles.imgWrapper}>
        <Image
          src={imgSrc || '/appIcons/no-photo.svg'}
          width={imgSrc ? 100 : 80}
          height={imgSrc ? 100 : 80}
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
              {duration}
              {' '}
              min
            </span>
          </div>
          <div className={styles.dataItem}>
            <Icon iconName="depth" size={16} />
            <span>
              {convertDepth(userAuth, diveUnitSystem, deepness)}
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

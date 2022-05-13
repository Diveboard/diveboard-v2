import React, { FC } from 'react';
import Image from 'next/image';
import { Icon } from '../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  name: string;
  onDiveBoard: number;
  total: number;
  onSpot: number;
};

export const DiveBuddyCard: FC<Props> = ({
  imgSrc,
  name,
  onDiveBoard,
  total,
  onSpot,
}) => (
  <div className={styles.card}>
    <div className={styles.imgWrapper}>
      <Image src={imgSrc} width={110} height={110} className={styles.img} />
    </div>
    <div className={styles.contentWrapper}>
      <span className={styles.name}>{name}</span>
      <span>
        <Icon iconName="oxygen-tank" size={16} />
        <div className={styles.divesTextWrapper}>
          <span className={styles.bold}>{onDiveBoard}</span>
          <span>dives on Diveboard</span>
          <span>
            (total:
            <span className={styles.bold}>{total}</span>
            )
          </span>
        </div>

      </span>
      <span>
        <Icon iconName="dive" size={16} />
        <div className={styles.divesTextWrapper}>
          <span className={styles.bold}>{onSpot}</span>
          dives on this spot
        </div>
      </span>
    </div>

  </div>
);

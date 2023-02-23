import React, { FC } from 'react';
import Image from 'next/image';
import { Icon, imageLoader } from '../../Icons/Icon';
import styles from './styles.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

type Props = {
  imgSrc: string;
  name: string;
  onDiveBoard: number;
  total?: number;
  onSpot?: number;
  onClick: () => void
};

export const DiveBuddyCard: FC<Props> = ({
  imgSrc,
  name,
  onDiveBoard,
  total,
  onSpot,
  onClick,
}) => {
  const isTablet = useWindowWidth(500, 1025);

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imgWrapper}>
        <Image
          src={imgSrc}
          width={110}
          height={isTablet ? 101 : 110}
          className={styles.img}
          loader={imageLoader}
          unoptimized
        />
      </div>
      <div className={styles.contentWrapper}>
        <span className={styles.name}>{name}</span>
        <span>
          <Icon iconName="oxygen-tank" size={16} />
          <div className={styles.divesTextWrapper}>
            <span className={styles.bold}>{onDiveBoard}</span>
            <span>
              {onDiveBoard > 1 ? 'dives' : 'dive'}
              {' '}
              on Diveboard
            </span>
            {total && (
            <span>
              {'total: '}
              <span className={styles.bold}>{total}</span>
            </span>
            )}
          </div>
        </span>
        {!!onSpot && (
        <span>
          <Icon iconName="dive" size={16} />
          <div className={styles.divesTextWrapper}>
            <span className={styles.bold}>{onSpot}</span>
            dives on this spot
          </div>
        </span>
        )}
      </div>
    </div>
  );
};

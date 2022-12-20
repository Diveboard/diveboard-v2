import React, { FC } from 'react';
import Image from 'next/image';
import { flag } from 'country-emoji';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';

type Props = {
  region: string
  name: string
  depth: string
  imgSrc: string
  favorite: boolean
  country?: string
};

const SpotCard: FC<Props> = ({
  name,
  depth,
  region,
  imgSrc,
  favorite,
  country,
}) => (
  <div className={styles.wrapper}>
    <Image
      src={imgSrc}
      layout="fixed"
      width={94}
      height={94}
      objectFit="cover"
    />
    <div className={styles.description}>
      <div className={styles.region}>
        {`${flag(country)} ${region}`}
        <div className={styles.favIcon}><Icon iconName={favorite ? 'heart filled in' : 'heart'} size={16} /></div>
      </div>
      <span className={styles.name}>{name}</span>
      <div className={styles.depth}>
        <Icon iconName="depth" size={16} />
        Depth:
        {' '}
        <b>{depth}</b>
      </div>
    </div>
  </div>
);

export default SpotCard;

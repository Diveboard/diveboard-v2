import React, { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';

type Props = {
  region: string
  name: string
  depth: string
};

const SpotCard: FC<Props> = ({
  name,
  depth,
  region,
}) => {
  console.log('test');
  return (
    <div className={styles.wrapper}>
      <Image
        src="/TEST_IMG_THEN_DELETE/egypt.png"
        layout="fixed"
        width={94}
        height={94}
        objectFit="cover"
      />
      <div className={styles.description}>
        <div className={styles.region}>
          <Icon iconName="Egypt" size={16} />
          {region}
          <div className={styles.favIcon}><Icon iconName="heart" size={16} /></div>
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
};

export default SpotCard;

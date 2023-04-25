import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { flag } from 'country-emoji';
import styles from './styles.module.scss';
import { Icon } from '../../../Icons/Icon';
import { firestoreGalleryService } from '../../../../firebase/firestore/firestoreServices/firestoreGalleryService';

type Props = {
  region: string
  name: string
  depth: string
  imgSrc: string | null
  country?: string
};

const SpotCard: FC<Props> = ({
  name,
  depth,
  region,
  imgSrc,
  country,
}) => {
  const [src, setSrc] = useState('/images/fish.jpg');

  useEffect(() => {
    (async () => {
      if (imgSrc !== null) {
        const data = await firestoreGalleryService.getPicById(imgSrc);
        if (data?.url) {
          setSrc(data.url);
        }
      }
    })();
  }, [imgSrc]);
  return (
    <div className={styles.wrapper}>
      <Image
        src={src}
        layout="fixed"
        width={94}
        height={94}
        objectFit="cover"
        alt="spot"
        unoptimized
      />
      <div className={styles.description}>
        <div className={styles.region}>
          {`${flag(country)} ${region}`}
        </div>
        <span className={styles.name}>{name}</span>
        {depth && (
        <div className={styles.depth}>
          <Icon iconName="depth" size={16} />
          Depth:
          {' '}
          <b>{depth}</b>
        </div>
        )}
      </div>
    </div>

  );
};
export default SpotCard;

import React, { FC } from 'react';
import Image from 'next/image';
import { imageLoader } from '../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  speciesName: string;
  scientificName: string;
  className?: string;
};

export const SpeciesCard: FC<Props> = ({
  imgSrc, speciesName, scientificName, className,
}) => (
  <div className={className ? `${styles.card} ${styles[className]}` : styles.card}>
    <div className={styles.imgWrapper}>
      <Image
        className={styles.img}
        src={imgSrc || '/images/default-species.svg'}
        layout="fill"
        loader={imageLoader}
        unoptimized
      />
    </div>

    <div className={styles.footer}>
      {scientificName && <span className={styles.name}>{scientificName}</span> }
      <span className={styles.scientificName}>{speciesName}</span>
    </div>
  </div>
);

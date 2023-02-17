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
      {imgSrc
        ? <Image src={imgSrc} className={styles.img} layout="fill" loader={imageLoader} unoptimized />
        : (
          <Image
            className={styles.img}
            src={`/species/${scientificName}.svg`}
            width={140}
            height={140}
            loader={imageLoader}
          />
        )}
    </div>

    <div className={styles.footer}>
      <span className={styles.name}>{speciesName}</span>
      {scientificName && <span className={styles.scientificName}>{scientificName}</span> }
    </div>
  </div>
);

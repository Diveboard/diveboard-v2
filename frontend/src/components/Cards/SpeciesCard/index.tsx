import React, { FC } from 'react';
import Image from 'next/image';
import { imageLoader } from '../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  speciesName: string;
  scientificName: string;

};

export const SpeciesCard: FC<Props> = ({
  imgSrc,
  speciesName,
  scientificName,
}) => (
  <div className={styles.card}>
    <div className={styles.imgWrapper}>
      <Image
        src={imgSrc}
        className={styles.img}
        layout="fill"
        loader={imageLoader}
      />
    </div>

    <div className={styles.footer}>
      <span className={styles.name}>{speciesName}</span>
      <span className={styles.scientificName}>{scientificName}</span>
    </div>
  </div>
);

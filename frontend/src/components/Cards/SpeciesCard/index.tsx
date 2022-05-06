import React, { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { imageLoader } from '../../Icons/Icon';

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
    <Image
      src={imgSrc}
      className={styles.img}
      width={420}
      height={224}
      loader={imageLoader}
    />
    <div className={styles.footer}>
      <span className={styles.name}>{speciesName}</span>
      <span className={styles.scientificName}>{scientificName}</span>
    </div>
  </div>
);

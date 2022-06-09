import React, { FC } from 'react';
import Image from 'next/image';
import { imageLoader } from '../../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  title: string;
  text: string;
};

export const InfoTextBlock: FC<Props> = ({ imgSrc, text, title }) => (
  <div className={styles.howItBeganWrapper}>
    <div className={styles.imgWrapper}>
      <Image
        src={imgSrc}
        // layout="intrinsic"
        loader={imageLoader}
        alt="about us image"
        width={720}
        height={774}
      />
    </div>
    <div className={styles.block} />
    <div className={styles.contentWrapper}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>
        {text}
      </p>
    </div>
  </div>
);

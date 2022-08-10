import React, { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

type Props = {
  src: string
};

export const ButtonImage: FC<Props> = ({ src }) => (
  <span className={styles.wrapper}>
    <Image src={src} className={styles.img} alt="image in button" width={24} height={24} />
  </span>
);

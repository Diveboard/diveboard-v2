import React, { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
};
export const ProfileImage:FC<Props> = ({ imgSrc }) => (
  <div className={styles.profileImg}>

    <Image
      src={imgSrc || '/assets/icons/no-photo.svg'}
      width={80}
      height={80}
      alt="avatar"
      className={styles.img}
    />

  </div>
);

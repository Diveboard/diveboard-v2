import React, { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { imageLoader } from '../../../../../Icons/Icon';

type Props = {
  imgSrc: string;
  size?:number;
};
export const ProfileImage:FC<Props> = ({ imgSrc, size = 80 }) => (
  <div className={styles.profileImg}>

    <Image
      src={imgSrc || '/appIcons/no-photo.svg'}
      width={size}
      height={size}
      alt="avatar"
      className={styles.img}
      loader={imageLoader}
      unoptimized
    />

  </div>
);

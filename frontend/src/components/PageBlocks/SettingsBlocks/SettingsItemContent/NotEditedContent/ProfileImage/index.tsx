import React, { FC, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { imageLoader } from '../../../../../Icons/Icon';

type Props = {
  imgSrc: string;
  size?: number;
};
export const ProfileImage:FC<Props> = ({ imgSrc, size = 80 }) => {
  const [src, setSrc] = useState(imgSrc || '/appIcons/no-photo.svg');

  return (
    <div className={styles.profileImg}>
      <Image
        src={src}
        width={size}
        height={size}
        alt="avatar"
        className={styles.img}
        loader={imageLoader}
        unoptimized
        onError={() => setSrc('/appIcons/no-photo.svg')}
      />
    </div>
  );
};

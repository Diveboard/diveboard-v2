import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { imageLoader } from '../../../../../Icons/Icon';

type Props = {
  imgSrc: string;
  size?: number;
};
export const ProfileImage:FC<Props> = ({ imgSrc, size = 80 }) => {
  const emptyPhotoPath = '/appIcons/no-photo.svg';
  const [src, setSrc] = useState(imgSrc || emptyPhotoPath);

  useEffect(() => {
    setSrc(imgSrc || emptyPhotoPath);
  }, [imgSrc]);

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
        onError={() => setSrc(emptyPhotoPath)}
      />
    </div>
  );
};

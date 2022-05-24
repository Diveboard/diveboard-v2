import React, { FC } from 'react';
import Image from 'next/image';
import { Icon, imageLoader } from '../../../../../Icons/Icon';
import styles from './styles.module.scss';
import userImage from '../../../../../../../public/TEST_IMG_THEN_DELETE/Image.png';

export const ProfileBlock: FC = () => (
  <div className={styles.block}>
    <div className={styles.imgWrapper}>
      <Image
        src={userImage}
        width={50}
        height={50}
        loader={imageLoader}
        alt="profile picture"
      />
    </div>
    <div className={styles.userData}>
      <h4> Alexander Casassovici </h4>
      <p>Member since dec, 2020</p>
    </div>
    <div className={styles.follow}>
      <span> Follow </span>
      <Icon iconName="plus" width={7} height={7} />
    </div>
  </div>
);

import React, { FC } from 'react';
import Image from 'next/image';
import { imageLoader } from '../../../Icons/Icon';
import { Button } from '../../../Buttons/Button';
import dollarImage from '../../../../../public/assets/icons/Vector.svg';
import styles from './styles.module.scss';

export const SuccessBlock: FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.image}>
      <Image
        src={dollarImage}
        layout="fixed"
        width={50}
        height={50}
        loader={imageLoader}
      />
    </div>
    <div className={styles.title}>
      <h2> Your Payment is Successful! </h2>
      <p>
        {' '}
        We give a special badge to all our donators.
        Would you like to add it to your Profile?
      </p>
    </div>
    <div>
      <Button
        width={340}
        height={48}
        backgroundColor="#FDC90D"
        border="none"
        borderRadius={30}
      >
        <span className={styles.btnText}> Sure, add it </span>
      </Button>

      <Button
        width={340}
        height={48}
        border="2px solid #000345"
        borderRadius={30}
        marginTop={20}
      >
        <span className={styles.btnText}> No, thanks </span>
      </Button>
    </div>
  </div>
);

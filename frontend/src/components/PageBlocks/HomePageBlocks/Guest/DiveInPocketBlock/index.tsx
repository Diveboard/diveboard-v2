import React from 'react';
import Image from 'next/image';
import { Button } from '../../../../Buttons/Button';
import { Icon, imageLoader } from '../../../../Icons/Icon';
import mobilesImg from '../../../../../../public/images/mobiles.png';
import styles from './styles.module.scss';

export const DiveInPocketBlock = () => (
  <div className={styles.diveInPocketWrapper}>
    <div className={styles.mobileImg}>
      <Image src={mobilesImg} layout="fill" loader={imageLoader} />
    </div>

    <div className={styles.contentWrapper}>
      <h2 className={styles.title}>Diveboard In Your Pocket</h2>
      <p className={styles.text}>
        You can access to Diveboard anywhere and anytime with our Android
        mobile app.
      </p>
      <div className={styles.btnWrapper}>
        <Button
          width={230}
          height={56}
          borderRadius={30}
          border="none"
          backgroundColor="#FDC90D"
          onClick={() => {}}
        >
          <div className={styles.innerBtnWrapper}>
            <Icon iconName="android" />
            <span className={styles.btnText}>Download App</span>
          </div>
        </Button>
        {' '}
        <Button
          width={230}
          height={56}
          borderRadius={30}
          border="none"
          backgroundColor="#FDC90D"
          onClick={() => {}}
        >
          <div className={styles.innerBtnWrapper}>
            <Icon iconName="apple" />
            <span className={styles.btnText}>Download App</span>
          </div>
        </Button>
      </div>
    </div>
  </div>
);

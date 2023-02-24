import React from 'react';
import Image from 'next/image';
import { Icon } from '../../../Icons/Icon';
import styles from './styles.module.scss';

export const AboutUsBanner = () => (
  <div className={styles.banner}>
    <Image src="/images/about-us-background.png" layout="fill" />
    <h1>About Us</h1>
    <p>
      Diveboard is a nonprofit product, connecting scuba divers and
      researchers through a unique citizen science platform.
      Our mission is to educate divers and connect them to researchers
      who need boots on the ground. We believe that scuba is better with intent,
      and as our planet is undergoing massive climate changes, scuba divers have
      a role to play as stewards of the Oceans.
    </p>
    <div className={styles.imgWrapper}>
      <Image src="/images/icon--dive-background.png" layout="fill" />
      <Icon iconName="diveboard-logo" size={73} />
    </div>
  </div>
);

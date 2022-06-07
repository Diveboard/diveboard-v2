import React from 'react';
import Image from 'next/image';
import { Icon } from '../../../Icons/Icon';
import styles from './styles.module.scss';

export const AboutUsBanner = () => (
  <div className={styles.banner}>
    <Image src="/images/about-us-background.png" layout="fill" />
    <h1>About Us</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Id turpis cursus phasellus quam varius eu, sit.
      Maecenas nibh pharetra eu leo cursus maecenas.
      Pharetra velit, urna proin quisque neque sit ipsum tellus.
      Ut nunc at pretium urna, id velit arcu accumsan.
    </p>
    <div className={styles.imgWrapper}>
      <Image src="/images/icon--dive-background.png" layout="fill" />
      <Icon iconName="diveboard-logo" size={73} />
    </div>
  </div>
);

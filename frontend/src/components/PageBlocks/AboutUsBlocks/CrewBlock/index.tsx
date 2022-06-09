import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

export const CrewBlock = () => (
  <div className={styles.crew}>
    <div className={styles.titleBlock}>
      <h2>Meet the crew</h2>
      <div className={styles.textBlock}>
        <p>
          We're from all over the world, with a passion for scuba diving we were daring to share.
          We're no professional divers, just enthusiasts willing to share their passions for the
          ocean
          and make the best of vacation time to discover new amazing places!
        </p>
        <p className={styles.text}>
          So we spend our free time building Diveboard - hope you like it!
        </p>
      </div>

    </div>
    <div className={styles.imageBlock}>
      <Image src="/images/crew-1.jpg" width={384} height={460} />
      <Image src="/images/crew-2.jpg" width={384} height={460} />
      <Image src="/images/crew-3.jpg" width={384} height={460} />
      <Image src="/images/crew-4.jpg" width={384} height={460} />
      <Image src="/images/crew-5.jpg" width={384} height={460} />
    </div>
  </div>
);

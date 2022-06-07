import React from 'react';
import Image from 'next/image';
import { Icon } from '../../../Icons/Icon';
import styles from './styles.module.scss';

export const OurPartners = () => (
  <div className={styles.partnersWrapper}>

    <div className={styles.contentWrapper}>
      <div className={styles.textWrapper}>
        <h2>
          Our Partners
        </h2>
        <p>
          Since Diveboard started, we understood that each and every scuba diver is a scientist.
          Our observations are valuable data that can help better understand
          our environment or how body functions under pressure.
          As a consequence, we support those organizations, sharing anonymized
          raw data with them and trying to make the world a better place.
        </p>
      </div>

      <div className={styles.partners}>
        <div className={styles.partnersItem}>
          <Icon iconName="DAN-about" width={130} height={150} />
          <div>
            <h3>DAN - Diver's Alert Network</h3>
            <p>
              DAN is a not-for-profit worldwide organization
              that provides emergency medical advice and assistance
              for underwater diving injuries, and underwrites a wide
              range of research, education and training programs that promote safe diving.
            </p>
          </div>
        </div>

        <div className={styles.partnersItem}>
          <Icon iconName="OBIS-about" width={130} height={150} />
          <div>
            <h3>IOBIS / WoRMS / GBIF</h3>
            <p>
              GBIF, WoRMS and IOBIS agregate and share biodiversity data
              and enable users to search species datasets from all of the world.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Image
      src="/images/about-us partners.png"
      layout="fill"
      className={styles.img}
    />
  </div>
);

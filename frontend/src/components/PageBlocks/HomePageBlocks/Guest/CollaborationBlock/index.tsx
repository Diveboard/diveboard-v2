import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import collaborationImage from '../../../../../../public/assets/images/collaboration.png';
import { Icon, imageLoader } from '../../../../Icons/Icon';
import styles from './styles.module.scss';

export const CollaborationBlock = () => (
  <div className={styles.collaborationWrapper}>
    <div className={styles.imgWrapper}>
      <Image
          src ={collaborationImage}
          layout={'intrinsic'}
          loader={imageLoader}
          alt="Scientific collaboration"
      />
    </div>
    <div className={styles.block} />
    <div className={styles.contentWrapper}>
      <h2 className={styles.title}>Scientific Collaboration</h2>
      <p className={styles.text}>
        Since Diveboard started, we understood that each and every scuba diver
        is a scientist. Our observations are valuable data that can help
        better understand our environment or how body functions under
        pressure. As a consequence, we support those organizations, sharing
        anonymized raw data with them and trying to make the world a better
        place.
      </p>

      <div className={styles.organisations}>
        <Link href="https://www.daneurope.org/en/home">
          <a>
            <Icon iconName="DAN" width={133} height={40} />
          </a>
        </Link>
        <Link href="https://obis.org/">
          <a>
            <Icon iconName="BIS" width={270} height={40} />
          </a>
        </Link>
        <Link href="https://www.gbif.org/">
          <a>
            <Icon iconName="GBIF" width={197} height={40} />
          </a>
        </Link>
        <Link href="https://www.marinespecies.org/">
          <a>
            <Icon iconName="WoRMS" width={126} height={40} />
          </a>
        </Link>
      </div>
    </div>
  </div>
);

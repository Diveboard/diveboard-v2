import React, { FC } from 'react';
import {
  ProfileImage,
} from '../../SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';
import { Icon } from '../../../Icons/Icon';
import { LinkedButton } from '../../../Buttons/LinkedButton';
import { Button } from '../../../Buttons/Button';
import { DiveData } from './DiveData';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  name: string;
  country: string;
  followersCount: number;
};

export const PersonalProfileData: FC<Props> = ({
  name, imgSrc, country, followersCount,
}) => (
  <div className={styles.blockWrapper}>
    <div className={styles.profileDataWrapper}>
      <div className={styles.leftContent}>
        <div className={styles.backBtnWrapper}>
          <LinkedButton link="/" iconName="back-button" iconSize={40} />
        </div>
        <ProfileImage imgSrc={imgSrc} size={74} />
        <div className={styles.personalDataWrapper}>
          <span className={styles.name}>{name}</span>
          <div className={styles.personalGroup}>
            <div className={styles.countryWrapper}>
              <Icon iconName={country} />
              <span className={styles.thinText}>{country}</span>
            </div>
            <div className={styles.followersWrapper}>
              <span className={styles.thinText}>Followers:</span>
              <span className={styles.thinText}>{followersCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightContent}>
        <Button backgroundColor="transparent" border="none" borderRadius={30}>
          <span className={styles.followText}>Follow</span>
          <Icon iconName="plus" size={14} />
        </Button>
        <LinkedButton link="/" iconName="share" iconSize={40} />
      </div>
    </div>

    <div className={styles.diveDataWrapper}>
      <DiveData
        qualification="PADI Ice Diver, CMAS Nitrox 1"
        diveIn="Egypt, Italy, Spain, New Zeland"
        divesPublished="131 (Total:157)"
        thisYear="0"
        totalUnderwaterTime="4d 17h 48min"
        mostDives="Spain"
        deepestDive="37.7m in Cap de Creus, Spain"
        longestDive="70min in St. Andreu De Llavaneres, Spain"
        aboutDiver="I learned to Scuba in summer 2005 and since then have become addicted to it.
        Quickly reached the freedom of the N2 FFESSM (AOW+) and started taking cool underwater pictures."
      />

      <div className={styles.btnWrapper}>
        <Button
          borderRadius={30}
          border="none"
          backgroundColor="#FDC90D"
          width={182}
          height={56}
        >
          <div className={styles.innerBtnWrapper}>
            <Icon iconName="add-dive" size={24} />
            <span className={styles.btnLabel}>Add Dive</span>
          </div>
        </Button>
      </div>

    </div>
  </div>
);

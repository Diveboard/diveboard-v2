import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { flag } from 'country-emoji';
import {
  ProfileImage,
} from '../../SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';
import { Icon } from '../../../Icons/Icon';
import { Button } from '../../../Buttons/Button';
import { DiveData } from './DiveData';
import pageRoutes from '../../../../routes/pagesRoutes.json';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  name: string;
  country: string;
  about: string;
  stats: {
    diveIn: Array<string>,
    thisYear: number,
    mostDives: string,
    divesPublished: number,
    totalUnderwaterTime: string,
    deepestDive: string,
    longestDive: string,
  }
  isItOwnProfile: boolean;
};

export const PersonalProfileData: FC<Props> = ({
  about,
  name,
  imgSrc,
  country,
  stats,
  isItOwnProfile,
}) => {
  const router = useRouter();

  return (
    <div className={styles.blockWrapper}>
      <div className={styles.profileDataWrapper}>
        <div className={styles.leftContent}>
          <div className={styles.backBtnWrapper} onClick={() => router.back()}>
            <Icon iconName="back-button" size={40} />
          </div>
          <ProfileImage imgSrc={imgSrc} size={74} />
          <div className={styles.personalDataWrapper}>
            <span className={styles.name}>{name}</span>
            <div className={styles.personalGroup}>
              {country && (
              <div className={styles.countryWrapper}>
                <div>{flag(country)}</div>
                <span className={styles.thinText}>{country}</span>
              </div>
              )}

              {/* <div className={styles.followersWrapper}> */}
              {/*  <span className={styles.thinText}>Followers:</span> */}
              {/*  <span className={styles.thinText}>{followersCount}</span> */}
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* <div className={styles.rightContent}> */}
        {/* {!isItOwnProfile && ( */}
        {/* <Button backgroundColor="transparent" border="none" borderRadius={30}> */}
        {/*  <span className={styles.followText}>Follow</span> */}
        {/*  <Icon iconName="plus" size={14} /> */}
        {/* </Button> */}
        {/* )} */}
        {/* <LinkedButton link="/" iconName="share" iconSize={40} /> */}
        {/* </div> */}
      </div>

      <div className={styles.diveDataWrapper}>
        {stats && (
        <DiveData
          qualification=""
          diveIn={stats.diveIn?.join(', ')}
          divesPublished={stats.divesPublished}
          thisYear={stats.thisYear}
          mostDives={stats.mostDives}
          totalUnderwaterTime={stats.totalUnderwaterTime}
          deepestDive={stats.deepestDive}
          longestDive={stats.longestDive}
          aboutDiver={about}
        />
        )}

        {isItOwnProfile && (
        <div className={styles.btnWrapper}>
          <Button
            borderRadius={30}
            border="none"
            backgroundColor="#FDC90D"
            width={182}
            height={56}
            onClick={() => {
              router.push(pageRoutes.logDivePageRout);
            }}
          >
            <div className={styles.innerBtnWrapper}>
              <Icon iconName="add-dive" size={24} />
              <span className={styles.btnLabel}>Add Dive</span>
            </div>
          </Button>
        </div>
        )}

      </div>
    </div>
  );
};

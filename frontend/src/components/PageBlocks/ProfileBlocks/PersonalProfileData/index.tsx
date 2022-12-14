import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { flag } from 'country-emoji';
import {
  ProfileImage,
} from '../../SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';
import { Icon } from '../../../Icons/Icon';
import { LinkedButton } from '../../../Buttons/LinkedButton';
import { Button } from '../../../Buttons/Button';
import { DiveData } from './DiveData';
import pageRoutes from '../../../../routes/pagesRoutes.json';
import styles from './styles.module.scss';
import { DiveType, SpotType } from '../../../../firebase/firestore/models';

type Props = {
  imgSrc: string;
  name: string;
  country: string;
  followersCount: number;
  about: string;
  dives: Array<DiveType & { spot: SpotType, date: string }>
};

export const PersonalProfileData: FC<Props> = ({
  about,
  name,
  imgSrc,
  country,
  followersCount,
  dives,
}) => {
  const router = useRouter();

  const getDiveCountries = () => {
    const diveIn = [];
    dives.forEach((dive) => {
      if (dive.spot?.location?.country) {
        diveIn.push(dive.spot?.location?.country);
      }
    });
    return diveIn;
  };

  const countries = dives.length ? getDiveCountries() : [];

  const getDivesPublished = () => {
    const divesPublished = dives.filter((dive) => !dive.draft && dive.publishingMode === 'public');
    return `${divesPublished.length} (Total: ${dives.length})`;
  };

  const getCountThisYearDives = () => {
    const divesThisYear = dives.filter((dive) => (
      new Date(dive.date).getFullYear() === new Date().getFullYear()
    ));
    return divesThisYear.length;
  };

  const getMostDives = () => countries
    .sort((a, b) => countries
      .filter((v) => v === a).length - countries.filter((v) => v === b).length)
    .pop();

  const convertMinutes = (num) => {
    const d = Math.floor(num / 1440); // 60*24
    const h = Math.floor((num - (d * 1440)) / 60);
    const m = Math.round(num % 60);
    if (d > 0) {
      return `${d} days, ${h} hours, ${m} minutes`;
    }
    if (h > 0) {
      return `${h} hours, ${m} minutes`;
    }
    return `${m} minutes`;
  };

  const getTotalUnderwaterTime = () => {
    const totalDuration = dives
      .reduce((acc, i) => acc + (i.diveData?.duration ? i.diveData.duration : 0), 0);
    return convertMinutes(totalDuration);
  };

  const getDeepestDive = () => {
    const deepestDive = dives.reduce(
      (prev, current) => (
        ((prev.diveData?.maxDepth || 0) > (current.diveData?.maxDepth || 0)) ? prev : current),
    );
    const location = deepestDive?.spot?.location;
    return `${deepestDive?.diveData?.maxDepth || 0}m in ${location?.location}, ${location?.country}`;
  };

  const getLongestDive = () => {
    const longestDive = dives.reduce(
      (prev, current) => (
        ((prev.diveData?.duration || 0) > (current.diveData?.duration || 0)) ? prev : current),
    );
    const location = longestDive?.spot?.location;
    return `${convertMinutes(longestDive?.diveData?.duration || 0)} in ${location?.location}, ${location?.country}`;
  };

  return (
    <div className={styles.blockWrapper}>
      <div className={styles.profileDataWrapper}>
        <div className={styles.leftContent}>
          <div className={styles.backBtnWrapper}>
            <LinkedButton link="" iconName="back-button" iconSize={40} />
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
          diveIn={Array.from(new Set(countries)).join(', ')}
          divesPublished={!!dives.length && getDivesPublished()}
          thisYear={!!dives.length && getCountThisYearDives()}
          mostDives={!!dives.length && getMostDives()}
          totalUnderwaterTime={!!dives.length && getTotalUnderwaterTime()}
          deepestDive={!!dives.length && getDeepestDive()}
          longestDive={!!dives.length && getLongestDive()}
          aboutDiver={about}
        />

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

      </div>
    </div>
  );
};

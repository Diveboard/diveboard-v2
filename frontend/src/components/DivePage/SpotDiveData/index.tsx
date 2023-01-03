import React, { FC, useContext, useState } from 'react';
import { flag } from 'country-emoji';

import { useRouter } from 'next/router';
import KebabButton from '../../Buttons/KebabButton';
import { LinkedButton } from '../../Buttons/LinkedButton';
import { Icon } from '../../Icons/Icon';
import { ProfileImage } from '../../PageBlocks/SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';
import { DivePageMobContainer } from '../DivePageMobContainer';

import styles from './styles.module.scss';
import { DiveType, SpotType, UserSettingsType } from '../../../firebase/firestore/models';
import { convertTimestampDate } from '../../../utils/convertTimestampDate';
import { parseDate } from '../../../utils/parseDate';
import {
  convertCalToFar,
  convertFarToCal,
  convertFeetToMeters,
  convertMetersToFeet,
} from '../../../utils/unitSystemConverter';
import { AuthStatusContext } from '../../../layouts/AuthLayout';

type Props = {
  user?: UserSettingsType,
  dive: DiveType,
  spot: SpotType
};

export const SpotDiveData: FC<Props> = ({
  user, dive, spot,
}): JSX.Element => {
  const [isShowNote, setShowMore] = useState(false);

  const router = useRouter();
  const diveTypeList = () => dive.diveActivities.join(', ');

  const spotName = `${spot.location?.location}, ${spot.location?.country}, ${spot.location?.region}`;

  const moreButtonHandler = () => {
    setShowMore(true);
  };

  const lessButtonHandler = () => {
    setShowMore(false);
  };

  const shareButtonHandler = async () => {
    const data = {
      title: 'DiveBoard',
      url: location.href,
      text: 'Share your dive',
    };
    console.log(data);
    // if (navigator.canShare(data)) await navigator.share(data);
  };

  const renderNotes = (text: string) => {
    if (text.length > 180) {
      return (
        <div className={styles.comment}>
          {text.slice(0, 179)}
          {'... '}
          <KebabButton className="more" onClick={moreButtonHandler}>
            More
          </KebabButton>
        </div>
      );
    }
    return <div className={styles.comment}>{text}</div>;
  };

  const showMore = (text: string) => (
    <div className={styles.comment}>
      {text}
      {' '}
      <KebabButton className="more" onClick={lessButtonHandler}>
        Less
      </KebabButton>
    </div>
  );

  const {
    userAuth,
  } = useContext(AuthStatusContext);

  const convertTempSystem = (value: number): string => {
    if (!userAuth) {
      return `${value} m`;
    }
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (dive.unitSystem === userUnitSystem) {
      return `${value} ${userUnitSystem === 'METRIC' ? 'ºC' : 'ºF'}`;
    }
    if (userUnitSystem === 'METRIC') {
      return `${convertFarToCal(value)} ºC`;
    }
    return `${convertCalToFar(value)} ºF`;
  };

  const convertDepth = (): string => {
    if (!userAuth) {
      return `${dive.diveData?.maxDepth} m`;
    }
    const userUnitSystem = userAuth.settings.preferences.unitSystem;
    if (dive.unitSystem === userUnitSystem) {
      return `${dive.diveData?.maxDepth} ${userUnitSystem === 'METRIC' ? 'm' : 'ft'}`;
    }
    if (userUnitSystem === 'METRIC') {
      return `${convertFeetToMeters(dive.diveData?.maxDepth)} m`;
    }
    return `${convertMetersToFeet(dive.diveData?.maxDepth)} ft`;
  };

  const isNoteAvailable = () => {
    if (!dive.aboutDive?.notes) {
      return false;
    }
    if (userAuth && userAuth.uid === user.uid) {
      return true;
    }
    return user?.settings?.preferences?.scientificData?.shareNotes;
  };

  return (
    <DivePageMobContainer>
      <div className={styles.spotDataWrapper}>
        <div className={styles.spotDataSubWrapper}>
          <div className={styles.leftContent}>
            <div className={styles.leftContentSubwrapper}>
              <div className={styles.backBtnWrapper}>
                <LinkedButton link="/" iconName="back-button" iconSize={40} />
              </div>
              <div className={styles.rightContentMob}>
                <span className={styles.share} onClick={shareButtonHandler}>
                  <Icon iconName="share-dive" size={16} />
                </span>
                <KebabButton className="saves">
                  <span>
                    0 Saves
                  </span>
                  <Icon iconName="heart" size={16} />
                </KebabButton>
              </div>
            </div>
            <div className={styles.leftContentWrapper} onClick={() => router.push(`/logbook/${user.uid}`)}>
              <ProfileImage imgSrc={user?.photoUrl} size={74} />
              <div className={styles.spotTitleWrapper}>
                <div className={styles.spotTitle}>
                  {user?.firstName}
                  {' '}
                  in
                  {' '}
                  {spot?.name}
                </div>
                <div className={styles.spotCountryWrapper}>
                  <div>{flag(spot.location?.country)}</div>
                  <div className={styles.spotLocation}>{spotName}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>
            <span className={styles.share} onClick={shareButtonHandler}>
              <Icon iconName="share-dive" size={16} />
            </span>
            <KebabButton className="saves">
              <span>
                0 Saves
              </span>
              <Icon iconName="heart" size={16} />
            </KebabButton>
          </div>
        </div>
        <div className={styles.diveDataWrapper}>
          <div className={styles.diveInfo}>
            <ul>
              {dive.aboutDive && (
              <li>
                Dive N:
                {' '}
                <span>{dive.aboutDive.diveNumber}</span>
              </li>
              )}
              {dive.diveData?.date && (
              <li>
                Date:
                {' '}
                <span>{parseDate(convertTimestampDate(dive.diveData.date))}</span>
              </li>
              )}
              {dive.diveData?.maxDepth && (
              <li>
                Max depth:
                {' '}
                <span>
                  {convertDepth()}
                </span>
              </li>
              )}
              {dive.diveData.duration && (
              <li>
                Duration:
                {' '}
                <span>
                  {dive.diveData?.duration}
                  {' '}
                  min
                </span>
              </li>
              )}
              {dive.diveData?.waterType && (
              <li>
                Water:
                {' '}
                <span>{dive.diveData.waterType}</span>
              </li>
              )}
              {!!dive.diveData?.surfaceTemp && (
              <li>
                Temperature on surface:
                {' '}
                <span>
                  {convertTempSystem(dive.diveData.surfaceTemp)}
                  {/* <sup>o</sup> */}
                  {/* C */}
                </span>
              </li>
              )}
              {!!dive.diveData?.bottomTemp && (
              <li>
                Temperature on bottom:
                {' '}
                <span>
                  {convertTempSystem(dive.diveData.bottomTemp)}
                  {/* <sup>o</sup> */}
                  {/* C */}
                </span>
              </li>
              )}
              {!!dive.diveActivities?.length && (
              <li>
                Dive Type:
                {' '}
                <span>{diveTypeList()}</span>
              </li>
              )}
              {dive.diveData?.waterVisibility && (
              <li>
                Visibility:
                {' '}
                <span>{dive.diveData?.waterVisibility}</span>
              </li>
              )}
            </ul>
          </div>
          { isNoteAvailable() && (
          <div>
            {!isShowNote ? renderNotes(dive.aboutDive?.notes) : showMore(dive.aboutDive?.notes)}
          </div>
          ) }
        </div>
      </div>
    </DivePageMobContainer>
  );
};

import React, { FC, useState } from 'react';

import KebabButton from '../../Buttons/KebabButton';
import { LinkedButton } from '../../Buttons/LinkedButton';
import { Icon } from '../../Icons/Icon';
import { ProfileImage } from '../../PageBlocks/SettingsBlocks/SettingsItemContent/NotEditedContent/ProfileImage';
import { DivePageMobContainer } from '../DivePageMobContainer';

import styles from './styles.module.scss';

type Props = {
  spotData: {
    nameDiver: string;
    imgSrc: string;
    spotName: string;
    spotCountry: string;
    spotLocation: string;
    diveN: number;
    date: string;
    maxDepth: number;
    duration: number;
    typeWater: string;
    temperatureOnSurface: number;
    temperatureOnBottom: number;
    diveType: string[];
    visibility: string;
    commentAuthor: string;
    saves: number;
  };
};

export const SpotDiveData: FC<Props> = ({
  spotData: {
    nameDiver,
    imgSrc,
    spotName,
    spotCountry,
    spotLocation,
    diveN,
    date,
    maxDepth,
    duration,
    typeWater,
    temperatureOnSurface,
    temperatureOnBottom,
    diveType,
    visibility,
    commentAuthor,
    saves,
  },
}): JSX.Element => {
  const [countSaves, setCountSaves] = useState(saves);
  const [isOnSaves, setSaves] = useState(false);
  const [isShowComment, setShowComment] = useState(false);

  const diveTypeList = () => diveType.join(', ');

  const moreButtonHandler = () => {
    setShowComment(true);
  };

  const lessButtonHandler = () => {
    setShowComment(false);
  };


  const shareButtonHandler = async () => {
    const data = {
      title: 'DiveBoard',
      url: location.href,
      text: 'Share your dive',
    };
    if (navigator.canShare(data)) await navigator.share(data);
  };


  const savesButtonHandler = () => {
    isOnSaves ? setCountSaves((prev) => prev - 1) : setCountSaves((prev) => prev + 1);
    setSaves(!isOnSaves);
  };

  const renderAuthorComment = (text: string) => {
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

  const renderAllAuthorComment = (text: string) => (
    <div className={styles.comment}>
      {text}
      {' '}
      <KebabButton className="more" onClick={lessButtonHandler}>
        Less
      </KebabButton>
    </div>
  );

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
                <KebabButton className="saves" onClick={savesButtonHandler}>
                  <span>
                    {countSaves}
                    {' '}
                    Saves
                  </span>
                  <Icon iconName="heart" size={16} />
                </KebabButton>
              </div>
            </div>
            <div className={styles.leftContentWrapper}>
              <ProfileImage imgSrc={imgSrc} size={74} />
              <div className={styles.spotTitleWrapper}>
                <div className={styles.spotTitle}>
                  {nameDiver}
                  {' '}
                  in
                  {' '}
                  {spotName}
                </div>
                <div className={styles.spotCountryWrapper}>
                  <Icon iconName={spotCountry} size={16} />
                  <div className={styles.spotLocation}>{spotLocation}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>
            <span className={styles.share} onClick={shareButtonHandler}>
              <Icon iconName="share-dive" size={16} />
            </span>
            <KebabButton className="saves" onClick={savesButtonHandler}>
              <span>
                {countSaves}
                {' '}
                Saves
              </span>
              <Icon iconName="heart" size={16} />
            </KebabButton>
          </div>
        </div>
        <div className={styles.diveDataWrapper}>
          <div className={styles.diveInfo}>
            <ul>
              <li>
                Dive N:
                {' '}
                <span>{diveN}</span>
              </li>
              <li>
                Date:
                {' '}
                <span>{date}</span>
              </li>
              <li>
                Max depth:
                {' '}
                <span>
                  {maxDepth}
                  {' '}
                  m
                </span>
              </li>
              <li>
                Duration:
                {' '}
                <span>
                  {duration}
                  {' '}
                  min
                </span>
              </li>
              <li>
                Water:
                {' '}
                <span>{typeWater}</span>
              </li>
              <li>
                Temperature on surface:
                {' '}
                <span>
                  {temperatureOnSurface}
                  <sup>o</sup>
                  C
                </span>
              </li>
              <li>
                Temperature on bottom:
                {' '}
                <span>
                  {temperatureOnBottom}
                  <sup>o</sup>
                  C
                </span>
              </li>
              <li>
                Dive Type:
                {' '}
                <span>{diveTypeList()}</span>
              </li>
              <li>
                Visibility:
                {' '}
                <span>{visibility}</span>
              </li>
            </ul>
          </div>
          {!isShowComment
            ? renderAuthorComment(commentAuthor) : renderAllAuthorComment(commentAuthor)}
        </div>
      </div>
    </DivePageMobContainer>
  );
};

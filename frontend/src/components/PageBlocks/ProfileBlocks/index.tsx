import React, { useContext, useEffect, useState } from 'react';
import { name } from 'country-emoji';
import { PersonalProfileData } from './PersonalProfileData';
import { DivesMap } from './DivesMap';
import { DivesBlock } from './DivesBlock';
import { PicturesBlock } from './PicturesBlock';
import { LatestSpecies } from './LatestSpecies';
import { DiveBuddies } from './DiveBuddiesBlock';
import { MobileAddButton } from '../../Buttons/MobileAddButton';
import pagesRoutes from '../../../routes/pagesRoutes.json';
import styles from './styles.module.scss';
import {
  BuddiesType,
  DiveType, SpeciesType, SpotType, UserSettingsType,
} from '../../../firebase/firestore/models';
import { SurveysBlock } from './SurveysBlock';
import { convertMinutes } from '../../../utils/convertMinutes';
import { AuthStatusContext } from '../../../layouts/AuthLayout';

type Props = {
  dives: Array<DiveType & { spot: SpotType, date: string }>
  species: Array<SpeciesType>
  buddies: Array<BuddiesType>
  logbookUser: UserSettingsType
  data: any
  pictures: Array<string>
};

export const ProfileBlock = ({
  dives, species, logbookUser, data, pictures, buddies,
}: Props) => {
  const { userAuth } = useContext(AuthStatusContext);

  const [isItOwnProfile, setOwnProfile] = useState(userAuth?.uid === logbookUser.uid);

  useEffect(() => {
    setOwnProfile(userAuth?.uid === logbookUser.uid);
  }, [logbookUser.uid]);

  const getStats = () => {
    if (!data) {
      return null;
    }
    const countries = [];
    let divesPublished = 0;
    let thisYearDives = 0;
    let underwaterTime = '';
    let longestDive = '';
    let deepestDive = '';
    const thisYear = new Date().getFullYear();
    if (data.dives?.length) {
      data.dives.forEach((dive) => {
        if (dive.countryName) {
          countries.push(dive.countryName);
        }
        if (!dive.draft) {
          divesPublished += 1;
          if (dive.year === thisYear) {
            thisYearDives += 1;
          }
        }
      });
    }
    if (data.underwaterTime?.length) {
      const totalDuration = data.underwaterTime
        .reduce((acc, i) => acc + (i.time ? i.time : 0), 0);
      underwaterTime = convertMinutes(totalDuration);
    }
    if (data.longestDive?.time) {
      longestDive = `${data.longestDive.time} minutes in ${data.longestDive.longestDiveName}`;
    }
    if (data.deepestDive?.depth) {
      deepestDive = `${data.deepestDive.depth.toFixed(2)} ${data.deepestDive.unitSystem?.toLowerCase() === 'metric' ? 'm' : 'ft'} in ${data.deepestDive?.deepestDiveName}`;
    }
    const getMostDives = () => Array.from(countries)
      .sort((a, b) => countries
        .filter((v) => v === a).length - countries.filter((v) => v === b).length)
      .pop();
    const diveIn: Array<string> = Array.from(new Set(countries));
    return {
      diveIn,
      mostDives: getMostDives() as string,
      divesPublished,
      thisYear: thisYearDives,
      totalUnderwaterTime: underwaterTime,
      deepestDive,
      longestDive,
    };
  };
  return (
    <div className={styles.profileBlockWrapper}>
      {userAuth?.uid && (
        <MobileAddButton
          iconName="new-dive-white"
          link={pagesRoutes.logDivePageRout}
        />
      )}

      <PersonalProfileData
        imgSrc={logbookUser.photoUrl}
        name={logbookUser?.firstName || logbookUser?.lastName ? `${logbookUser?.firstName || ''} ${logbookUser?.lastName || ''}` : logbookUser.nickname || ''}
        country={name(logbookUser.country)}
        about={logbookUser.about}
        isItOwnProfile={isItOwnProfile}
        stats={getStats()}
      />
      {data && (
      <>
        {!!dives?.length && (
        <DivesMap
          userId={logbookUser.uid}
        />
        )}
        {!!dives?.length && (
        <DivesBlock
          divesData={isItOwnProfile ? dives : dives.filter((dive) => dive && !dive.draft && dive.publishingMode === 'PUBLIC')}
          userId={logbookUser.uid}
          isItOwnProfile={isItOwnProfile}
          dives={isItOwnProfile ? data.dives : data.dives.filter((dive) => !dive.draft && dive.publishingMode === 'PUBLIC')}
        />
        )}

        {!!pictures.length && <PicturesBlock picturesData={pictures} pictures={data.pictures} /> }
        {!!species?.length && <LatestSpecies speciesData={species} species={data.species} /> }
        {/* <CertificationBlock certifications={certifications} />* /}
      {/* <CentersVisitedBlock /> */}
        {!!buddies?.length && <DiveBuddies buddiesData={buddies} buddies={data.buddies} /> }
        {!!data?.surveys?.length && <SurveysBlock surveys={data.surveys} />}
      </>
      )}
    </div>
  );
};

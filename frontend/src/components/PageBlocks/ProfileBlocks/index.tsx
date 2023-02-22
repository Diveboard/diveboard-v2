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
import { NetworkStatusContext } from '../../../layouts/NetworkStatus';
import { convertMinutes } from '../../../utils/convertMinutes';

type Props = {
  dives: Array<DiveType & { spot: SpotType, date: string }>
  species: Array<SpeciesType>
  buddies: Array<BuddiesType>
  logbookUser: UserSettingsType
  user: UserSettingsType
  data: any
  pictures: Array<string>
};

export const ProfileBlock = ({
  dives, species, logbookUser, user, data, pictures, buddies,
}: Props) => {
  const mapCoords = {
    lat: 40.95,
    lng: 30.33,
  };
  const isOffline = useContext(NetworkStatusContext);

  const markerPoints = dives ? dives.map((dive) => ({
    id: dive.id,
    divesCount: 1,
    diveName: dive.aboutDive.tripName,
    lat: dive.spot?.lat,
    lng: dive.spot?.lng,
  })) : [];

  const [isItOwnProfile, setOwnProfile] = useState(user?.uid === logbookUser.uid);

  useEffect(() => {
    setOwnProfile(user?.uid === logbookUser.uid);
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
      deepestDive = `${data.deepestDive.depth} ${data.deepestDive.unitSystem?.toLowerCase() === 'metric' ? 'm' : 'ft'} in ${data.deepestDive?.deepestDiveName}`;
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
      {user?.uid && (
        <MobileAddButton
          iconName="new-dive-white"
          link={pagesRoutes.logDivePageRout}
        />
      )}

      <PersonalProfileData
        imgSrc={logbookUser.photoUrl}
        name={`${logbookUser.firstName || ''} ${logbookUser.lastName || ''}`}
        country={name(logbookUser.country)}
        about={logbookUser.about}
        isItOwnProfile={isItOwnProfile}
        stats={getStats()}
      />
      {!!dives?.length && (
      <DivesMap
        coords={mapCoords}
        zoom={7}
        points={isOffline ? [] : markerPoints}
      />
      )}
      {!!dives?.length && (
        <DivesBlock
          divesData={isItOwnProfile ? dives : dives.filter((dive) => !dive.draft && dive.publishingMode === 'PUBLIC')}
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
    </div>
  );
};

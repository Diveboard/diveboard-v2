import React, { useEffect, useState } from 'react';
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

type Props = {
  dives: Array<DiveType & { spot: SpotType, date: string }>
  species: Array<SpeciesType>
  buddies: Array<BuddiesType>
  logbookUser: UserSettingsType
  user: UserSettingsType
  surveysNumber: number
};

export const ProfileBlock = ({
  dives, species, buddies, logbookUser, surveysNumber, user,
}: Props) => {
  const mapCoords = {
    lat: 40.95,
    lng: 30.33,
  };

  const markerPoints = dives.map((dive) => ({
    id: dive.id,
    divesCount: 1,
    diveName: dive.aboutDive.tripName,
    lat: dive.spot?.lat,
    lng: dive.spot?.lng,
  }));

  const pictures = dives?.length
    ? dives.flatMap((dive) => [...dive.externalImgsUrls].map((img) => img))
    : [];

  const [isItOwnProfile, setOwnProfile] = useState(user?.uid === logbookUser.uid);

  useEffect(() => {
    setOwnProfile(user?.uid === logbookUser.uid);
  }, [logbookUser.uid]);

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
        dives={dives}
      />
      {!!dives?.length && (
      <DivesMap
        coords={mapCoords}
        zoom={7}
        points={markerPoints}
      />
      )}
      {!!dives?.length && (
        <DivesBlock
          dives={isItOwnProfile ? dives : dives.filter((dive) => !dive.draft && dive.publishingMode === 'public')}
          userId={logbookUser.uid}
          isItOwnProfile={isItOwnProfile}
        />
      )}
      {!!pictures.length && <PicturesBlock pictures={pictures} /> }
      {!!species?.length && <LatestSpecies species={species} /> }
      {/* <CertificationBlock certifications={certifications} />* /}
      {/* <CentersVisitedBlock /> */}
      {!!buddies?.length && <DiveBuddies buddies={buddies} /> }
      {!!surveysNumber && <SurveysBlock surveysNumber={surveysNumber} />}
    </div>
  );
};

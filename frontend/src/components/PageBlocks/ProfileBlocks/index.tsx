import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
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

// const certifications = [
//   {
//     certificateName: 'CMAS 3* VDST / N4 ',
//     obtainingDate: '(Aug 2012)',
//   },
//   {
//     certificateName: 'CMAS Nitrox 1',
//     obtainingDate: '(Aug 2012)',
//   },
//   {
//     certificateName: 'PADI Ice Diver',
//     obtainingDate: '(Jan 2012)',
//   },
//   {
//     certificateName: 'Self-assessed Photography',
//     obtainingDate: '(Mar 2011)',
//   },
//   {
//     certificateName: 'CMAS 2 Star',
//     obtainingDate: '(Jul 2006)',
//   },
//   {
//     certificateName: 'FFESSM Level 2',
//     obtainingDate: '(Jul 2006)',
//   },
//   {
//     certificateName: 'CMAS 1 Star',
//     obtainingDate: '(Jul 2005)',
//   },
// ];

type Props = {
  dives: Array<DiveType & { spot: SpotType, date: string }>
  species: Array<SpeciesType>
  buddies: Array<BuddiesType>
  logbookUser: UserSettingsType
  surveysNumber: number
};

export const ProfileBlock = ({
  dives, species, buddies, logbookUser, surveysNumber,
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

  const uid = Cookies.get('__session');

  const [isItOwnProfile, setOwnProfile] = useState(uid === logbookUser.uid);

  useEffect(() => {
    setOwnProfile(uid === logbookUser.uid);
  }, [logbookUser.uid]);

  return (
    <div className={styles.profileBlockWrapper}>
      {uid && (
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
        followersCount={0}
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

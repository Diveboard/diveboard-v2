import React from 'react';
import { PersonalProfileData } from './PersonalProfileData';
import { DivesMap } from './DivesMap';
import { DivesBlock } from './DivesBlock';
import { PicturesBlock } from './PicturesBlock';
import { LatestSpecies } from './LatestSpecies';
import { DiveBuddies } from './DiveBuddiesBlock';
import { MobileAddButton } from '../../Buttons/MobileAddButton';
import pagesRoutes from '../../../routes/pagesRoutes.json';
import styles from './styles.module.scss';
import { DiveType, SpeciesType, SpotType } from '../../../firebase/firestore/models';
import { UserType } from '../../../types';

type Props = {
  dives: Array<DiveType & { spot: SpotType, date: string }>
  species: Array<SpeciesType>
  buddies: Array<any>
  logbookUser: UserType
};

export const ProfileBlock = ({
  dives, species, buddies, logbookUser,
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

  return (
    <div className={styles.profileBlockWrapper}>
      <MobileAddButton
        iconName="new-dive-white"
        link={pagesRoutes.logDivePageRout}
      />

      <PersonalProfileData
        imgSrc={logbookUser.photoURL || '/TEST_IMG_THEN_DELETE/photo3.jpg'}
        name={logbookUser.name || ''}
        country={logbookUser.country}
        about={logbookUser.about}
        followersCount={0}
        dives={dives}
      />
      <DivesMap
        coords={mapCoords}
        zoom={7}
        points={markerPoints}
      />
      {!!dives?.length && <DivesBlock dives={dives} userId={logbookUser.uid} /> }
      <PicturesBlock
        pictures={dives.flatMap((dive) => [...dive.externalImgsUrls].map((img) => img))}
      />
      {!!species?.length && <LatestSpecies species={species} /> }
      {/* <CertificationBlock certifications={certifications} /> */}
      {/* <CentersVisitedBlock /> */}
      { !!buddies?.length && <DiveBuddies buddies={buddies} /> }
    </div>
  );
};

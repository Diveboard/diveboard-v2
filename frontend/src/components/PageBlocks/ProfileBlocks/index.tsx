import React from 'react';
import { PersonalProfileData } from './PersonalProfileData';
import { DivesMap } from './DivesMap';
import { DivesBlock } from './DivesBlock';
import { PicturesBlock } from './PicturesBlock';
import { LatestSpecies } from './LatestSpecies';
import { CertificationBlock } from './CertificationsBlock';
import { CentersVisitedBlock } from './CentersVisitedBlock';
import { DiveBuddies } from './DiveBuddiesBlock';
import styles from './styles.module.scss';

export const ProfileBlock = () => {
  const mapCoords = {
    lat: 40.95,
    lng: 30.33,
  };

  const markerPoints = [
    {
      id: 1,
      divesCount: 234,
      lat: 41.5,
      lng: 30.33,
      diveName: 'Aloha',
    }, {
      id: 2,
      divesCount: 2,
      lat: 41.95,
      lng: 29.33,
      diveName: 'Shark',
    }, {
      id: 3,
      divesCount: 34,
      lat: 41.7,
      lng: 28.33,
      diveName: 'YO',
    }, {
      id: 4,
      divesCount: 13,
      lat: 42.2,
      lng: 32.33,
      diveName: 'Miran',
    },
  ];

  const certifications = [
    { certificateName: 'CMAS 3* VDST / N4 ', obtainingDate: '(Aug 2012)' },
    { certificateName: 'CMAS Nitrox 1', obtainingDate: '(Aug 2012)' },
    { certificateName: 'PADI Ice Diver', obtainingDate: '(Jan 2012)' },
    { certificateName: 'Self-assessed Photography', obtainingDate: '(Mar 2011)' },
    { certificateName: 'CMAS 2 Star', obtainingDate: '(Jul 2006)' },
    { certificateName: 'FFESSM Level 2', obtainingDate: '(Jul 2006)' },
    { certificateName: 'CMAS 1 Star', obtainingDate: '(Jul 2005)' },
  ];

  return (
    <div className={styles.profileBlockWrapper}>

      <PersonalProfileData
        imgSrc=""
        name="Ivan Carozza"
        country="Spain"
        followersCount={158}
      />
      <DivesMap
        coords={mapCoords}
        zoom={7}
        points={markerPoints}
      />
      <DivesBlock />
      <PicturesBlock />
      <LatestSpecies />
      <CertificationBlock certifications={certifications} />
      <CentersVisitedBlock />
      <DiveBuddies />
    </div>
  );
};

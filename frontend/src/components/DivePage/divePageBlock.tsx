import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { DocumentReference } from '@firebase/firestore';
import { CommentsBlock } from './CommentsBlock';
import { SpotDiveData } from './SpotDiveData';
import { GearUsed } from './GearBlock';
import { ChartBlock } from './ChartBlock';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { SpeciesMobile } from './SpeciesIdentified/SpeciesMobile';
import { SpeciesIdentified } from './SpeciesIdentified/SpeciesSlider';
import { DivePageTitle } from './DivePageTitle';
import { MobilePhotoGroup } from '../PhotoGroup/mobilePhotoGroup';
import { DesktopPhotoBlock } from './DesktopPhotoBlock';
import { DivePageMobContainer } from './DivePageMobContainer';

import styles from './divePageBlock.module.scss';
import { NoDive } from '../DiveManager/NoData';
import {
  BuddiesType, CommentType,
  DiveType, SpeciesType, SpotType, UserSettingsType,
} from '../../firebase/firestore/models';
import { DiveBuddyCard } from '../Cards/DiveBuddyCard';
import { AuthStatusContext } from '../../layouts/AuthLayout';

type Props = {
  user?: UserSettingsType,
  dive: DiveType,
  spot: SpotType,
  species: Array<{ specieRef: DocumentReference }>
  speciesData?: Array<SpeciesType>
  buddies: Array<BuddiesType>
  comments: Array<CommentType>
  pictures: Array<{ pictureRef: DocumentReference }>
  picturesData: Array<string>
};

export const DivePageBlock = ({
  user, dive, spot, speciesData, buddies, comments, picturesData, pictures, species,
}: Props): JSX.Element => {
  const isMobile = useWindowWidth(500, 769);
  const router = useRouter();

  const isGearsExist = !!dive.diveData?.weights
      || (!!dive.gears?.length
      && !!dive.gears.some((gear) => gear.typeOfGear));

  const { userAuth } = useContext(AuthStatusContext);

  const [isItOwnProfile, setOwnProfile] = useState(userAuth?.uid === user.uid);

  useEffect(() => {
    setOwnProfile(user?.uid === user.uid);
  }, [user.uid]);

  const renderPhotoBlock = () => (isMobile
    ? <MobilePhotoGroup photos={picturesData} pictures={pictures} />
    : (
      <DesktopPhotoBlock
        photos={picturesData}
        pictures={pictures}
      />
    ));

  const renderSpeciesBlock = () => (isMobile
    ? <SpeciesMobile speciesList={speciesData} species={species} />
    : <SpeciesIdentified speciesList={speciesData} species={species} />);

  return (
    <section className={styles.wrapper}>
      {dive && ((!isItOwnProfile && dive.publishingMode === 'PUBLIC') || isItOwnProfile) && !dive.draft ? (
        <>
          <SpotDiveData user={user} dive={dive} spot={spot} />
          {!!picturesData?.length && renderPhotoBlock()}
          <div className={styles.subwrapper}>
            {(!!dive.diveData?.safetyStops?.length || !!dive?.tanks.length) && (
              <ChartBlock diveData={{ points: dive.diveData?.safetyStops, tanks: dive?.tanks }} />
            )}
            {(!!speciesData.length || isGearsExist)
                && (
                <div className={styles.thirdWrapper}>
                  {isGearsExist && (
                  <GearUsed
                    gears={dive.gears}
                    weight={dive.diveData?.weights}
                    diveUnitSystem={dive.unitSystem}
                  />
                  )}
                  {!!speciesData.length && (
                  <div className={styles.speciesWrapper}>
                    <DivePageMobContainer>
                      <DivePageTitle title="Species Identified" />
                      <div className={styles.cardsWrapper}>
                        {renderSpeciesBlock()}
                      </div>
                    </DivePageMobContainer>
                  </div>
                  )}
                </div>
                )}
          </div>
          {!!buddies?.length && (
          <DivePageMobContainer>
            <DivePageTitle title="Dive Buddies" />
            <div className={styles.divesWrapper}>
              {buddies.map((buddy) => (
                <DiveBuddyCard
                  onClick={() => buddy.id && router.push(`/logbook/${buddy.id}`)}
                  key={buddy.id || buddy.firstName}
                  imgSrc={buddy?.photoUrl || '/appIcons/no-photo.svg'}
                  name={`${buddy?.firstName || ''} ${buddy?.lastName || ''}`}
                  onDiveBoard={buddy?.diveTotal}
                  total={buddy?.diveTotal}
                  onSpot={buddy?.divesOnSpot}
                />
              ))}
            </div>
          </DivePageMobContainer>
          )}
          <CommentsBlock comments={comments} />
        </>
      ) : <NoDive />}
    </section>
  );
};

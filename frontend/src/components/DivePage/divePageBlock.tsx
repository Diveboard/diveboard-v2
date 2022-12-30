import React from 'react';

import { useRouter } from 'next/router';
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
import { allComments } from './DIVE_PAGE_DUMMY_DATA';

import styles from './divePageBlock.module.scss';
import { NoDive } from '../DiveManager/NoData';
import {
  DiveType, SpeciesType, SpotType, UserSettingsType,
} from '../../firebase/firestore/models';
import { DiveBuddyCard } from '../Cards/DiveBuddyCard';

type Props = {
  user?: UserSettingsType,
  dive: DiveType,
  spot: SpotType,
  species?: Array<SpeciesType>
  buddies: Array<any>
};

export const DivePageBlock = ({
  user, dive, spot, species, buddies,
}: Props): JSX.Element => {
  const isMobile = useWindowWidth(500, 769);

  const router = useRouter();

  const renderPhotoBlock = () => (isMobile
    ? <MobilePhotoGroup photos={dive.externalImgsUrls} />
    : <DesktopPhotoBlock photos={dive.externalImgsUrls} />);

  const renderSpeciesBlock = () => (isMobile
    ? <SpeciesMobile speciesList={species} />
    : <SpeciesIdentified speciesList={species} />);

  return (
    <section className={styles.wrapper}>
      {dive && dive.publishingMode === 'public' && !dive.draft ? (
        <>
          <SpotDiveData user={user} dive={dive} spot={spot} />
          {renderPhotoBlock()}
          <div className={styles.subwrapper}>
            {(!!dive.diveData?.safetySpots.length || !!dive?.tanks.length) && (
              <ChartBlock diveData={{ points: dive.diveData?.safetySpots, tanks: dive?.tanks }} />
            )}
            <div className={styles.thirdWrapper}>
              {(!!dive.gears.length || dive.diveData?.weights) && (
                <GearUsed
                  gears={dive.gears}
                  weight={dive.diveData?.weights}
                  diveUnitSystem={dive.unitSystem}
                />
              )}
              {!!species.length && (
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
          </div>
          {!!buddies?.length && (
          <DivePageMobContainer>
            <DivePageTitle title="Dive Buddies" />
            <div className={styles.divesWrapper}>
              {buddies.map((buddy) => (
                <DiveBuddyCard
                  onClick={() => buddy.id && router.push(`/logbook/${buddy.id}`)}
                  key={buddy.id || buddy.name}
                  imgSrc={buddy?.photoURL || '/appIcons/no-photo.svg'}
                  name={buddy?.name}
                  onDiveBoard={buddy?.diveTotal}
                  total={buddy?.diveTotal}
                  onSpot={buddy?.divesOnSpot}
                />
              ))}
            </div>
          </DivePageMobContainer>
          )}
          <CommentsBlock allComments={allComments} />
        </>
      ) : <NoDive />}
    </section>
  );
};

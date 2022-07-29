import React from 'react';

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
import {
  diveData, spotData, photos, gearUsed, speciesList, allComments,
} from './DIVE_PAGE_DUMMY_DATA';

import styles from './divePageBlock.module.scss';

export const DivePageBlock = (): JSX.Element => {
  const isMobile = useWindowWidth(500, 769);

  const renderPhotoBlock = () => (isMobile
    ? <MobilePhotoGroup photos={photos} />
    : <DesktopPhotoBlock photos={photos} />);

  const renderSpeciesBlock = () => (isMobile
    ? <SpeciesMobile speciesList={speciesList} />
    : <SpeciesIdentified speciesList={speciesList} />);

  return (
    <section className={styles.wrapper}>
      <SpotDiveData spotData={spotData} />
      {renderPhotoBlock()}
      <div className={styles.subwrapper}>
        <ChartBlock diveData={diveData} />
        <div className={styles.thirdWrapper}>
          <GearUsed gearUsed={gearUsed} />
          <div className={styles.speciesWrapper}>
            <DivePageMobContainer>
              <DivePageTitle title="Species Identified" />
              <div className={styles.cardsWrapper}>
                {renderSpeciesBlock()}
              </div>
            </DivePageMobContainer>
          </div>
        </div>
      </div>
      <CommentsBlock allComments={allComments} />
    </section>
  );
};

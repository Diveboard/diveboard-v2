import React, { useEffect, useState } from 'react';

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
import { firestoreDivesService } from '../../firebase/firestore/firestoreServices/firestoreDivesService';
import { Loader } from '../Loader';
import { NoDive } from '../DiveManager/NoData';

type Props = {
  diveUserId: string,
  diveId: string
};

export const DivePageBlock = ({ diveUserId, diveId }: Props): JSX.Element => {
  const isMobile = useWindowWidth(500, 769);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dive, setDive] = useState(undefined);

  const fetchDive = async () => {
    if (diveUserId && diveId) {
      setLoading(true);
      const data = await firestoreDivesService.getDiveData(diveUserId, diveId);
      if (!data) {
        setError('No dives');
      } else {
        setDive(data);
      }
      setLoading(false);
    }
  };
  console.log(dive);
  useEffect(() => {
    fetchDive();
  }, [diveId, diveUserId]);

  const renderPhotoBlock = () => (isMobile
    ? <MobilePhotoGroup photos={photos} />
    : <DesktopPhotoBlock photos={photos} />);

  const renderSpeciesBlock = () => (isMobile
    ? <SpeciesMobile speciesList={speciesList} />
    : <SpeciesIdentified speciesList={speciesList} />);

  return (
    <section className={styles.wrapper}>
      <Loader loading={isLoading} />
      {!error ? (
        <>
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
        </>
      ) : <NoDive />}
    </section>
  );
};

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { DocumentReference } from '@firebase/firestore';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { DesktopPhotoBlock } from '../../DivePage/DesktopPhotoBlock';
import { Info } from './Info';
import { DivesInSpot } from './DivesInSpot';
import { MobileTabs } from './MobileTabs';
import { MobileSpotHeader } from './MobileSpotHeader';
import styles from './styles.module.scss';
import { DiveType, SpeciesType, SpotType } from '../../../firebase/firestore/models';
import { Icon } from '../../Icons/Icon';

type Props = {
  spot: SpotType;
  dives: Array<DiveType>
  species: Array<{
    specieRef: DocumentReference
  }>
  pictures: Array<{
    pictureRef: DocumentReference
  }>
  speciesData: Array<SpeciesType>
  picturesData: Array<string>
};

export const SpotBlocks = ({
  spot, dives, speciesData, picturesData, species, pictures,
}: Props) => {
  const router = useRouter();
  const isMobile = useWindowWidth(500, 769);
  const [tab, setTab] = useState<'info' | 'dives' | 'shops'>('info');

  return (
    <div className={styles.spotBlock}>
      {!isMobile && (
        <>
          <div className={styles.header}>
            <div className={styles.left}>
              <div className={styles.left} onClick={() => router.back()}>
                <Icon iconName="back-button" size={40} />
              </div>
              <h1>
                {spot?.name}
              </h1>
            </div>
            {/* <LinkedButton link="" iconName="share-link" iconSize={40} /> */}
          </div>
          <DesktopPhotoBlock photos={picturesData} pictures={pictures} />
        </>
      )}

      {isMobile
          && <MobileSpotHeader spotName={spot?.name} images={picturesData} pictures={pictures} />}

      {isMobile && <MobileTabs mode={tab} setMode={setTab} />}
      <div className={styles.wrapper}>
        {((isMobile && tab === 'info') || isMobile === false) && (
        <Info
          location={{
            country: spot.countryName,
            region: spot.regionName,
            location: spot.locationName,
          }}
          species={species} // species
          speciesData={speciesData} // speciesData
          coords={{ lat: spot.lat, lng: spot.lng }}
          stats={spot.stats}
          divesCount={Object.keys(spot.dives).length}
        />
        )}
        {((isMobile && tab === 'dives') || isMobile === false) && (
        <DivesInSpot spotDivesIds={spot.dives} dives={dives} />
        )}
        {/* {isMobile ? tab === 'shops' && <ShopsInSpot /> : <ShopsInSpot />} */}
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { MobilePhotoGroup } from '../../PhotoGroup/mobilePhotoGroup';
import { photos } from '../../DivePage/DIVE_PAGE_DUMMY_DATA';
import { DesktopPhotoBlock } from '../../DivePage/DesktopPhotoBlock';
import { LinkedButton } from '../../Buttons/LinkedButton';
import { Info } from './Info';
import { DivesInSpot } from './DivesInSpot';
import { MobileTabs } from './MobileTabs';
import { MobileSpotHeader } from './MobileSpotHeader';
import styles from './styles.module.scss';
import { DiveType, SpeciesType, SpotType } from '../../../firebase/firestore/models';
import { Icon } from '../../Icons/Icon';

const images: {
  id: number;
  src: string;
  savesNumber: number;
  saved: boolean;
  author: string;
}[] = [
  {
    id: 1,
    src: '/TEST_IMG_THEN_DELETE/fish.jpg',
    savesNumber: 100,
    saved: false,
    author: 'Kolja',
  }, {
    id: 2,
    src: '/TEST_IMG_THEN_DELETE/photo3.jpg',
    savesNumber: 50,
    saved: true,
    author: 'Kolja',
  }, {
    id: 3,
    src: '/TEST_IMG_THEN_DELETE/photo6.jpg',
    savesNumber: 30,
    saved: true,
    author: 'Kolja',
  }, {
    id: 4,
    src: '/TEST_IMG_THEN_DELETE/photo7.jpg',
    savesNumber: 12,
    saved: false,
    author: 'Kolja',
  }, {
    id: 5,
    src: '/TEST_IMG_THEN_DELETE/photo8.jpg',
    savesNumber: 33,
    saved: true,
    author: 'Kolja',
  },
];

type Props = {
  spot: SpotType;
  dives: Array<DiveType>
  species: Array<SpeciesType>
};

export const SpotBlocks = ({ spot, dives, species }: Props) => {
  const router = useRouter();
  const isMobile = useWindowWidth(500, 769);
  const [tab, setTab] = useState<'info' | 'dives' | 'shops'>('info');

  const renderPhotoBlock = isMobile
    ? <MobilePhotoGroup photos={photos.map((i) => i.img)} />
    : <DesktopPhotoBlock photos={photos.map((i) => i.img)} />;

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
            <LinkedButton link="" iconName="share-link" iconSize={40} />
          </div>
          {renderPhotoBlock}
        </>
      )}

      {isMobile && <MobileSpotHeader spotName={spot?.name} images={images} />}

      {isMobile && <MobileTabs mode={tab} setMode={setTab} />}
      <div className={styles.wrapper}>
        {isMobile ? tab === 'info'
            && <Info location={spot?.location} species={species} />
          : <Info location={spot?.location} species={species} />}
        {isMobile ? tab === 'dives' && <DivesInSpot dives={dives} /> : <DivesInSpot dives={dives} />}
        {/* {isMobile ? tab === 'shops' && <ShopsInSpot /> : <ShopsInSpot />} */}
      </div>

    </div>
  );
};

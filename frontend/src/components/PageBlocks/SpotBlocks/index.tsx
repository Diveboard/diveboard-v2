import React, { useState } from 'react';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { MobilePhotoGroup } from '../../PhotoGroup/mobilePhotoGroup';
import { photos } from '../../DivePage/DIVE_PAGE_DUMMY_DATA';
import { DesktopPhotoBlock } from '../../DivePage/DesktopPhotoBlock';
import { LinkedButton } from '../../Buttons/LinkedButton';
import { Info } from './Info';
import { DivesInSpot } from './DivesInSpot';
import { ShopsInSpot } from './ShopsInSpot';
import { MobileTabs } from './MobileTabs';
import { MobileSpotHeader } from './MobileSpotHeader';
import styles from './styles.module.scss';

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

export const SpotBlocks = () => {
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
              <LinkedButton link="" iconName="back-button" iconSize={40} />
              <h1>
                Shark and Yolana Reef
              </h1>

            </div>
            <LinkedButton link="" iconName="share-link" iconSize={40} />
          </div>
          {renderPhotoBlock}
        </>
      )}

      {isMobile && <MobileSpotHeader spotName="Shark and Yolana Reef" images={images} />}

      {isMobile && <MobileTabs mode={tab} setMode={setTab} />}
      <div className={styles.wrapper}>
        {isMobile ? tab === 'info' && <Info /> : <Info />}
        {isMobile ? tab === 'dives' && <DivesInSpot /> : <DivesInSpot />}
        {isMobile ? tab === 'shops' && <ShopsInSpot /> : <ShopsInSpot />}
      </div>

    </div>
  );
};

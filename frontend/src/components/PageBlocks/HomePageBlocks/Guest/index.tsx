import React, { FC } from 'react';
import { MainBannerBlock } from './MainBannerBlock';
import { MapBlock } from './MapBlock';
import { DestinationBlock } from './DestinationsBlock';
import { CollaborationBlock } from './CollaborationBlock';
import { PhotoDivesBlock } from './PhotoDivesBlock';
import { DiveInPocketBlock } from './DiveInPocketBlock';
import styles from './styles.module.scss';

const Guest: FC = () => (
  <div className={styles.guestWrapper}>
    <MainBannerBlock />
    <MapBlock />
    <DestinationBlock />
    <CollaborationBlock />
    <PhotoDivesBlock />
    <DiveInPocketBlock />
  </div>
);

export default Guest;

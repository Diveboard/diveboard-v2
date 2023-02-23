import React, { FC } from 'react';
import { MainBannerBlock } from './MainBannerBlock';
import { MapBlock } from './MapBlock';
import { DestinationBlock } from './DestinationsBlock';
import { CollaborationBlock } from './CollaborationBlock';
import { PhotoDivesBlock } from './PhotoDivesBlock';
import { DiveInPocketBlock } from './DiveInPocketBlock';
import styles from './styles.module.scss';
import { ImageInfo } from '../../../../types';

type Props = {
  gallery: Array<ImageInfo>
};
const Guest: FC<Props> = ({ gallery }): JSX.Element => (
  <div className={styles.guestWrapper}>
    <MainBannerBlock />
    <MapBlock />
    <DestinationBlock />
    <CollaborationBlock />
    <PhotoDivesBlock gallery={gallery} />
    <DiveInPocketBlock />
  </div>
);

export default Guest;

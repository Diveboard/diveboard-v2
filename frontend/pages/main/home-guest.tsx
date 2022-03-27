import React from 'react';
import { NextPage } from 'next';
import { MainBannerBlock } from '../../src/components/PageBlocks/HomePageBlocks/Guest/MainBannerBlock';
import { MapBlock } from '../../src/components/PageBlocks/HomePageBlocks/Guest/MapBlock';
import { DestinationBlock } from '../../src/components/PageBlocks/HomePageBlocks/Guest/DestinationsBlock';
import { CollaborationBlock } from '../../src/components/PageBlocks/HomePageBlocks/Guest/CollaborationBlock';
import { PhotoDivesBlock } from '../../src/components/PageBlocks/HomePageBlocks/Guest/PhotoDivesBlock';
import { DiveInPocketBlock } from '../../src/components/PageBlocks/HomePageBlocks/Guest/DiveInPocketBlock';

const HomeGuest: NextPage = () => (
  <>
    <MainBannerBlock />
    <MapBlock />
    <DestinationBlock />
    <CollaborationBlock />
    <PhotoDivesBlock />
    <DiveInPocketBlock />
  </>
);

export default HomeGuest;

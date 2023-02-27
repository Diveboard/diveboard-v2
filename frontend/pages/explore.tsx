import React from 'react';
import ExploreBlock from '../src/components/PageBlocks/ExploreBlock';
import { useWindowWidth } from '../src/hooks/useWindowWidth';

const Explore = () => {
  const isMobile = useWindowWidth(500, 769);
  return (
    <ExploreBlock isMobile={isMobile} />
  );
};

export default Explore;

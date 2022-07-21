import React, { FC } from 'react';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { SpeciesMobile } from './SpeciesMobile';
import { SpeciesIdentified } from './SpeciesSlider';

type Props = {
  speciesList: {
    id: number;
    imgSrc: string;
    speciesName: string;
    scientificName: string;
  }[];
};

export const SpeciesBlock: FC<Props> = ({ speciesList }) => {
  const isMobile = useWindowWidth(500, 769);
  return (
    <div>
      { isMobile
        ? <SpeciesMobile speciesList={speciesList} />
        : <SpeciesIdentified speciesList={speciesList} />}
    </div>
  );
};

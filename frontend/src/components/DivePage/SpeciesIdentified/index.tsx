import React, { FC } from 'react';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { SpeciesMobile } from './SpeciesMobile';
import { SpeciesIdentified } from './SpeciesSlider';
import { SpeciesType } from '../../../firebase/firestore/models';

type Props = {
  speciesList: Array<SpeciesType>
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

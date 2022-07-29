import React, { FC } from 'react';

import { SpeciesCard } from '../../../Cards/SpeciesCard';

type Props = {
  speciesList: {
    id: number;
    imgSrc: string;
    speciesName: string;
    scientificName: string;
  }[];
};

export const SpeciesMobile:FC <Props> = ({ speciesList }) => (
  <>
    { speciesList.map((itm) => (
      <SpeciesCard
        key={itm.id}
        imgSrc={itm.imgSrc}
        speciesName={itm.speciesName}
        scientificName={itm.scientificName}
        className="smallCard"
      />
    ))}
  </>
);

import React, { FC } from 'react';

import { SpeciesCard } from '../../../Cards/SpeciesCard';
import { SpeciesType } from '../../../../firebase/firestore/models';

type Props = {
  speciesList: Array<SpeciesType>
};

export const SpeciesMobile:FC <Props> = ({ speciesList }) => (
  <>
    { speciesList.map((itm) => (
      <SpeciesCard
        key={itm.id}
        imgSrc={itm?.imgSrc || '/images/default-species.svg'}
        speciesName={itm?.sname}
        scientificName={itm?.category}
        className="smallCard"
      />
    ))}
  </>
);

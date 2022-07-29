import React, { FC } from 'react';

import { SpeciesListItem } from './SpeciesListItem';

import styles from './styles.module.scss';

type Species = {
  id: string;
  sname: string;
  cnames: string[];
  preferred_name: string;
  picture: string;
  bio: string;
  url: string;
  rank: string;
};

type Props = {
  speciesListData: {
    [key: string]: Species[];
  };
  selectedSpecies: Species[];
  mySpecies: Species[];
  onClick: (type: string) => void;
};

export const SpeciesList: FC<Props> = ({
  speciesListData,
  selectedSpecies,
  mySpecies,
  onClick,
}) => (
  <div className={styles.wrapper}>
    <SpeciesListItem
      speciesType="selected"
      numberSpecies={selectedSpecies.length}
      icon
      onClick={onClick}
    />
    <SpeciesListItem
      speciesType="my species"
      numberSpecies={mySpecies.length}
      onClick={onClick}
    />
    {Object.entries(speciesListData).map(([key, value]) => (
      <SpeciesListItem
        key={key}
        speciesType={key}
        numberSpecies={value.length}
        onClick={onClick}
      />
    ))}
  </div>
);

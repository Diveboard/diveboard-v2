import React, { FC } from 'react';

import { SelectedSpecies } from '../SelectedSpecies';
import { SpeciesCategory } from '../SpeciesCategory';
import { SpeciesType } from '../../../../../../firebase/firestore/models';
import styles from './styles.module.scss';

type Props = {
  currentSpeciesMode: string;
  setCurrentSpeciesMode: React.Dispatch<React.SetStateAction<string>>;
  mySpecies: SpeciesType[];
  queriedSpecies: SpeciesType[];
  searchedSpecies: SpeciesType[];
  selectedSpecies: SpeciesType[]
  setSelectedSpecies: React.Dispatch<React.SetStateAction<SpeciesType[]>>
};

export const SpeciesList: FC<Props> = ({
  currentSpeciesMode,
  setCurrentSpeciesMode,
  mySpecies,
  queriedSpecies,
  searchedSpecies,
  selectedSpecies,
  setSelectedSpecies,

}) => {
  const categories = queriedSpecies.map((item) => item.category);
  const categoriesSet = new Set(categories);
  const categoriesArray = Array.from(categoriesSet);
  const categoriesGrouped = categoriesArray.map((item : string) => ({
    category: item,
    categorySpecies: queriedSpecies.filter((species) => species.category === item),
  }));

  const categoriesComponents = categoriesGrouped.map((item) => (
    <SpeciesCategory
      key={item.category}
      title={item.category}
      currentMode={currentSpeciesMode}
      setCurrentMode={setCurrentSpeciesMode}
      speciesList={item.categorySpecies}
      selectedSpeciesList={selectedSpecies}
      setSelectedSpeciesList={setSelectedSpecies}
    />
  ));

  return (
    <div className={styles.wrapper}>
      <SelectedSpecies
        currentMode={currentSpeciesMode}
        setCurrentMode={setCurrentSpeciesMode}
        speciesList={selectedSpecies}
        setSpeciesList={setSelectedSpecies}
      />
      <SpeciesCategory
        title="my species"
        currentMode={currentSpeciesMode}
        setCurrentMode={setCurrentSpeciesMode}
        speciesList={mySpecies}
        selectedSpeciesList={selectedSpecies}
        setSelectedSpeciesList={setSelectedSpecies}
      />
      {!!searchedSpecies.length && (
      <SpeciesCategory
        title="search results"
        currentMode={currentSpeciesMode}
        setCurrentMode={setCurrentSpeciesMode}
        speciesList={searchedSpecies}
        selectedSpeciesList={selectedSpecies}
        setSelectedSpeciesList={setSelectedSpecies}
      />
      )}
      {categoriesComponents}
    </div>
  );
};

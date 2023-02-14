import React, { FC } from 'react';

import { SelectedSpecies } from '../SelectedSpecies';
import { SpeciesCategory } from '../SpeciesCategory';
import { SpeciesType } from '../../../../../../firebase/firestore/models';
import styles from './styles.module.scss';
import { speciesCategories } from '../../../../../../utils/speciesCategories';

type Props = {
  currentSpeciesMode: string;
  setCurrentSpeciesMode: React.Dispatch<React.SetStateAction<string>>;
  mySpecies: SpeciesType[];
  searchedSpecies: SpeciesType[];
  selectedSpecies: SpeciesType[]
  setSelectedSpecies: React.Dispatch<React.SetStateAction<SpeciesType[]>>
};

export const SpeciesList: FC<Props> = ({
  currentSpeciesMode,
  setCurrentSpeciesMode,
  mySpecies,
  searchedSpecies,
  selectedSpecies,
  setSelectedSpecies,
}) => {
  // const categories = queriedSpecies.map((item) => item.category);
  // const categoriesSet = new Set(categories);
  // const categoriesArray = Array.from(categoriesSet);
  // const categoriesGrouped = categoriesArray.map((item : string) => ({
  //   category: item,
  //   categorySpecies: queriedSpecies.filter((species) => species.category === item),
  // }));

  const categoriesComponents = Object.entries(speciesCategories).map(([key, value]) => (
    <SpeciesCategory
      key={key}
      title={key}
      currentMode={currentSpeciesMode}
      setCurrentMode={setCurrentSpeciesMode}
      amount={value}
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
      {!!mySpecies.length && (
      <SpeciesCategory
        title="my species"
        currentMode={currentSpeciesMode}
        amount={mySpecies.length}
        setCurrentMode={setCurrentSpeciesMode}
        speciesList={mySpecies}
        selectedSpeciesList={selectedSpecies}
        setSelectedSpeciesList={setSelectedSpecies}
      />
      )}
      {!!searchedSpecies.length && (
      <SpeciesCategory
        title="search results"
        amount={searchedSpecies.length}
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

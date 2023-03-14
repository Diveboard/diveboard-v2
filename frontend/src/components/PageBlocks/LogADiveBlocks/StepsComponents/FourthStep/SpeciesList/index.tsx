import React, { FC } from 'react';

import { SelectedSpecies } from '../SelectedSpecies';
import { SpeciesCategory } from '../SpeciesCategory';
import { SpeciesType } from '../../../../../../firebase/firestore/models';
import styles from './styles.module.scss';
import { speciesCategories } from '../../../../../../utils/speciesCategories';
import { Loader } from '../../../../../Loader';

type Props = {
  currentSpeciesMode: string;
  setCurrentSpeciesMode: React.Dispatch<React.SetStateAction<string>>;
  mySpecies: SpeciesType[];
  searchedSpecies: SpeciesType[];
  selectedSpecies: SpeciesType[];
  setSelectedSpecies: React.Dispatch<React.SetStateAction<SpeciesType[]>>;
  localSpecies: Array<any>;
  speciesMode: 'all' | 'local';
  loading: boolean;
};

export const SpeciesList: FC<Props> = ({
  currentSpeciesMode,
  setCurrentSpeciesMode,
  mySpecies,
  searchedSpecies,
  selectedSpecies,
  setSelectedSpecies,
  localSpecies,
  speciesMode,
  loading,
}) => {
  const allSpeciesBlock = Object.entries(speciesCategories).map(([key, value]) => (
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

  const localSpeciesBlock = localSpecies && Object.entries(localSpecies).map(([key]) => (
    <SpeciesCategory
      key={key}
      title={key}
      currentMode={currentSpeciesMode}
      setCurrentMode={setCurrentSpeciesMode}
      amount={localSpecies[key].length}
      speciesList={localSpecies[key]}
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
      {!localSpecies?.length && <Loader loading={loading} /> }
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
      {speciesMode === 'all' ? allSpeciesBlock : localSpeciesBlock}
    </div>
  );
};

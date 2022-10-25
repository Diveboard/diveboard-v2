import React, { FC } from 'react';
import { SpeciesType } from '../../../../../../firebase/firestore/models';
import { SpeciesListItem } from '../SpeciesList/SpeciesListItem';
import { SpeciesCardList } from '../SpeciesCardList';

type Props = {
  currentMode: string;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  speciesList: SpeciesType[];
  setSpeciesList: React.Dispatch<React.SetStateAction<SpeciesType[]>>;
};

export const SelectedSpecies: FC<Props> = ({
  currentMode,
  setCurrentMode,
  speciesList,
  setSpeciesList,
}) => (
  <div>
    {currentMode === '' && (
    <SpeciesListItem
      speciesType="selected"
      numberSpecies={speciesList.length}
      icon
      onClick={() => {
        setCurrentMode('selected');
      }}
    />
    )}

    {currentMode === 'selected'
        && (
        <SpeciesCardList
          title="Selected"
          selectedSpeciesList={speciesList}
          speciesList={speciesList}
          backButtonHandler={() => { setCurrentMode(''); }}
          selectedSpeciesHandler={(id) => {
            const newSpecieslist = speciesList.filter((item) => item.id !== id);
            setSpeciesList(newSpecieslist);
          }}
        />
        )}
  </div>
);

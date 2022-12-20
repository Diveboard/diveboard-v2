import React, { FC } from 'react';
import { SpeciesType } from '../../../../../../firebase/firestore/models';
import { SpeciesListItem } from '../SpeciesList/SpeciesListItem';
import { SpeciesCardList } from '../SpeciesCardList';

type Props = {
  title: string;
  currentMode: string;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  speciesList: SpeciesType[];
  selectedSpeciesList: SpeciesType[];
  setSelectedSpeciesList: React.Dispatch<React.SetStateAction<SpeciesType[]>>;
};

export const SpeciesCategory: FC<Props> = ({
  title,
  currentMode,
  setCurrentMode,
  speciesList,
  selectedSpeciesList,
  setSelectedSpeciesList,
}) => (
  <div>
    {currentMode === '' && (
    <SpeciesListItem
      speciesType={title}
      numberSpecies={speciesList.length}
      onClick={() => {
        setCurrentMode(title);
      }}
    />
    )}
    {currentMode === title
      && (
        <SpeciesCardList
          title={title.charAt(0)
            .toUpperCase() + title.slice(1)}
          speciesList={speciesList}
          selectedSpeciesList={selectedSpeciesList}
          backButtonHandler={() => {
            setCurrentMode('');
          }}
          selectedSpeciesHandler={(id) => {
            const isSelected = !!selectedSpeciesList.find((item) => item.id === id);
            if (isSelected) {
              const newSpecieslist = selectedSpeciesList.filter((item) => item.id !== id);
              setSelectedSpeciesList(newSpecieslist);
            } else {
              const addedSpecies = speciesList.find((item) => item.id === id);
              setSelectedSpeciesList([...selectedSpeciesList, addedSpecies]);
            }
          }}
        />
      )}
  </div>
);

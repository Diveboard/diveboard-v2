import React, { FC, useState } from 'react';
import { SpeciesType } from '../../../../../../firebase/firestore/models';
import { SpeciesListItem } from '../SpeciesList/SpeciesListItem';
import { SpeciesCardList } from '../SpeciesCardList';
import {
  firestoreSpeciesServices,
} from '../../../../../../firebase/firestore/firestoreServices/firestoreSpeciesServices';
import { notify } from '../../../../../../utils/notify';
import { Loader } from '../../../../../Loader';

type Props = {
  title: string;
  currentMode: string;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
  speciesList?: SpeciesType[];
  selectedSpeciesList: SpeciesType[];
  setSelectedSpeciesList: React.Dispatch<React.SetStateAction<SpeciesType[]>>;
  amount: number;
};

export const SpeciesCategory: FC<Props> = ({
  title,
  currentMode,
  setCurrentMode,
  speciesList = [],
  selectedSpeciesList,
  setSelectedSpeciesList,
  amount,
}) => {
  const [fetchedSpeciesList, setSpeciesList] = useState(speciesList);
  const [isLoading, setLoading] = useState(false);

  const clickHandler = async (key) => {
    setCurrentMode(key);
    if (speciesList?.length) {
      setSpeciesList(speciesList);
    } else {
      try {
        setLoading(true);
        const res = await firestoreSpeciesServices.getSpeciesByCategory(key);
        setSpeciesList(res);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        notify(e.message);
      }
    }
  };
  return (
    <div>
      {currentMode === '' && (
        <SpeciesListItem
          speciesType={title}
          numberSpecies={amount}
          onClick={() => clickHandler(title)}
        />
      )}
      {isLoading && <Loader loading={isLoading} />}

      {currentMode === title && !isLoading
          && (
          <>
            <SpeciesCardList
              title={title.charAt(0)
                .toUpperCase() + title.slice(1)}
              speciesList={fetchedSpeciesList}
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
                  const addedSpecies = fetchedSpeciesList.find((item) => item.id === id);
                  setSelectedSpeciesList([...selectedSpeciesList, addedSpecies]);
                }
              }}
            />
            {' '}
            {/* <div onClick={loadMore}>See More</div> */}
          </>
          )}
    </div>
  );
};

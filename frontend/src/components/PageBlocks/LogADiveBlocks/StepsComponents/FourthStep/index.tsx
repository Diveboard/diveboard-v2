import React, { FC, useContext, useState } from 'react';

import { StepsNavigation } from '../../StepsNavigation';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { FourthStepType } from '../../types/stepTypes';
import { SpeciesList } from './SpeciesList';
import { mySpecies, speciesListData } from './DUMMY_DATA_FOURTH_STEP';
import { SpeciesCardList } from './SpeciesCardList';
import { Search } from './SearchBlock';

import styles from './styles.module.scss';

export const FourthStep: FC<StepProps> = ({ step, setStep }) => {
  const { setStepData } = useContext(LogDiveDataContext);
  const [isTypeChosen, setTypeChosen] = useState(false);
  const [isTypeSelected, setTypeSelected] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [renderedSpeciesList, setRenderedSpeciesList] = useState({
    selectedSection: '',
    speciesArray: [],
  });

  const secondStepData: FourthStepType = {
    // parameters,
    // advancedParameters,
  };

  const radioButtonChange = (event: React.FormEvent<HTMLInputElement>) => {
    // chouse which method
    // if something change console.log('click');
    // if need value use next line
    (event.target as HTMLInputElement).value;
  };

  // search by the clicked section
  const prepareSpeciesList = (type: string) => {
    let resultType = '';
    let resultArray = [];

    if (type === 'my species') {
      resultType = 'my species';
      resultArray = mySpecies;
    } else if (type === 'selected') {
      resultType = 'selected';
      resultArray = selectedSpecies;
    } else {
      Object.entries(speciesListData).forEach(([key, value]) => {
        if (key === type) {
          resultType = type;
          resultArray = value;
        }
      });
    }

    setRenderedSpeciesList((prevRenderedSpeciesList) => ({
      ...prevRenderedSpeciesList,
      selectedSection: resultType,
      speciesArray: resultArray,
    }));
  };

  const typeSelectionHandler = (type: string) => {
    prepareSpeciesList(type);
    setTypeChosen(true);
    if (type === 'selected') {
      setTypeSelected(true);
    } else {
      setTypeSelected(false);
    }
  };

  const backButtonHandler = () => {
    setTypeChosen(false);
  };

  /**
   * actions when the "plus" or "done" is pressed.
   * If species is already in the SELECTED, it is added. If not, it is deleted from SELECTED.
   * @param speciesId id clicked card
   */
  const selectedSpeciesHandler = (speciesId: string) => {
    const existingSelectedSpeciesIndex = selectedSpecies.findIndex(
      (itm) => itm.id === speciesId,
    );

    //  if the species is not in the array then index = -1
    if (existingSelectedSpeciesIndex === -1) {
      Object.values(speciesListData).forEach((itms) => itms.forEach((itm) => {
        if (itm.id === speciesId) {
          setSelectedSpecies((prevSelected) => [...prevSelected, itm]);
        }
      }));
      mySpecies.forEach((itm) => {
        if (itm.id === speciesId) {
          setSelectedSpecies((prevSelected) => [...prevSelected, itm]);
        }
      });
    } else {
      // if species alredy in array then delete
      const updateSelectedSpecies = selectedSpecies.filter(
        (item) => item.id !== speciesId,
      );
      setSelectedSpecies(updateSelectedSpecies);

      if (isTypeSelected) {
        // if type SELECTED chosen rerender species list
        setRenderedSpeciesList({
          ...renderedSpeciesList,
          speciesArray: updateSelectedSpecies,
        });
      }
    }
  };

  if (step !== 4) {
    return null;
  }

  return (
    <>
      <div className={styles.fourthStep}>
        <div className={styles.container}>
          <div className={styles.title}>Species</div>
          <div className={styles.description}>
            Search and add marine species to yuor dive
          </div>
          <Search />
          <div className={styles.radioButtonWrapper} onChange={radioButtonChange}>
            <input
              type="radio"
              value="local"
              name="Location species"
              id="local species"
              defaultChecked
            />
            <label htmlFor="local species">Local species</label>
            <input type="radio" value="all" name="Location species" id="all species" />
            <label htmlFor="all species">All</label>
          </div>
          {(!isTypeChosen || (selectedSpecies.length === 0 && isTypeSelected)) ? (
            <SpeciesList
              onClick={typeSelectionHandler}
              mySpecies={mySpecies}
              selectedSpecies={selectedSpecies}
              speciesListData={speciesListData}
            />
          ) : (
            <SpeciesCardList
              selectedSpecies={selectedSpecies}
              renderedSpeciesList={renderedSpeciesList}
              backButtonHandler={backButtonHandler}
              selectedSpeciesHandler={selectedSpeciesHandler}
            />
          )}
          <div className={styles.sponsored}>
            Data provided through
            {' '}
            <a href="https://eol.org/">EOL</a>
            {' '}
            and
            {' '}
            <a href="https://www.gbif.org/">GBIF</a>
          </div>
        </div>
      </div>
      <StepsNavigation
        setStep={setStep}
        setStepData={() => {
          setStepData(4, secondStepData);
        }}
      />
    </>
  );
};

import React, {
  FC, useContext, useEffect, useState,
} from 'react';

import { toast, ToastContainer } from 'react-toastify';
import { Search } from './SearchBlock';
import { SpeciesList } from './SpeciesList';
import { Loader } from '../../../../Loader';
import { StepsNavigation } from '../../StepsNavigation';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { firestoreSpeciesServices } from '../../../../../firebase/firestore/firestoreServices/firestoreSpeciesServices';
import { firestoreSpotsService } from '../../../../../firebase/firestore/firestoreServices/firestoreSpotsService';
import { SpeciesType } from '../../../../../firebase/firestore/models';
import { StepProps } from '../../types/commonTypes';
import { FourthStepType, ThirdStepType } from '../../types/stepTypes';
import styles from './styles.module.scss';
import { StepsIndicator } from '../../StepsIndicator';

export const FourthStep: FC<StepProps & { userId: string }> = ({ step, setStep, userId }) => {
  const { setStepData, getStepData } = useContext(LogDiveDataContext);

  const [speciesMode, setSpeciesMode] = useState<'local' | 'all'>('all');
  const [currentSpeciesMode, setCurrentSpeciesMode] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [searchedSpecies, setSearchedSpecies] = useState<SpeciesType[]>([]);
  const [queriedAllSpecies, setQueriedAllSpecies] = useState<SpeciesType[]>([]);
  const [queriedLocalSpecies, setQueriedLocalSpecies] = useState<SpeciesType[]>(
    [],
  );
  const [mySpecies, setMySpecies] = useState<SpeciesType[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType[]>([]);

  const [loading, setLoading] = useState(false);

  const { spotId } = getStepData(3) as ThirdStepType;

  const notify = (text) => toast(text);

  const onSearchHandler = async (val: string) => {
    setCurrentSpeciesMode('');
    const searched = queriedAllSpecies.filter((item) => {
      let matchSpecies = false;
      item.cname.forEach((cname) => {
        matchSpecies = cname.name.toLowerCase().includes(val.toLowerCase(), 0);
      });
      matchSpecies = item.sname.toLowerCase().includes(val.toLowerCase(), 0);
      matchSpecies = item.category.toLowerCase().includes(val.toLowerCase(), 0);
      return matchSpecies;
    });
    setSearchedSpecies(searched);
    setSearchValue('');
  };
  useEffect(() => {
    (async () => {
      const species = await firestoreSpeciesServices.getAllSpecies();
      const data = await firestoreSpeciesServices.getMySpecies(userId);
      setMySpecies(data);
      setQueriedAllSpecies(species);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = getStepData(4) as FourthStepType;
      if (data.species) {
        setSelectedSpecies(
          queriedAllSpecies.filter((fish) => data.species.some((s) => s === fish.id)),
        );
      }
    })();
  }, [step, queriedAllSpecies]);

  useEffect(() => {
    if (spotId) {
      (async () => {
        setSpeciesMode('local');
        setLoading(true);
        const spotCoords = await firestoreSpotsService.getSpotCoordsById(
          spotId,
        );
        const species = await firestoreSpeciesServices.getLocalSpecies(
          spotCoords,
        );
        setQueriedLocalSpecies(species);
        setLoading(false);
      })();
    }
  }, [spotId]);

  const fourthStepData: FourthStepType = {
    species: selectedSpecies.map((item) => item.id),
  };

  if (step !== 4) {
    return null;
  }

  return (
    <>
      <StepsIndicator
        step={step}
        setStep={setStep}
        setStepData={() => setStepData(4, fourthStepData)}
      />
      <ToastContainer />
      <div className={styles.fourthStep}>
        <div className={styles.container}>
          <div className={styles.title}>Species</div>
          <div className={styles.description}>
            Search and add marine species to your dive
          </div>
          <Search
            value={searchValue}
            setValue={setSearchValue}
            onClick={onSearchHandler}
          />
          <div className={styles.radioButtonWrapper}>
            <input
              type="radio"
              value={speciesMode}
              name="Location species"
              id="local species"
              onChange={() => {
                if (!spotId) {
                  notify('Choose spot location on previous step');
                } else {
                  setSpeciesMode('local');
                  setCurrentSpeciesMode('');
                }
              }}
              checked={speciesMode === 'local'}
            />
            <label htmlFor="local species">Local species</label>

            <input
              type="radio"
              value={speciesMode}
              name="Location species"
              id="all species"
              onChange={() => {
                setSpeciesMode('all');
                setCurrentSpeciesMode('');
              }}
              checked={speciesMode === 'all'}
            />
            <label htmlFor="all species">All</label>
          </div>

          <Loader loading={loading} />
          {!loading && (
            <SpeciesList
              currentSpeciesMode={currentSpeciesMode}
              setCurrentSpeciesMode={setCurrentSpeciesMode}
              mySpecies={mySpecies}
              queriedSpecies={
                speciesMode === 'all' ? queriedAllSpecies : queriedLocalSpecies
              }
              searchedSpecies={searchedSpecies}
              selectedSpecies={selectedSpecies}
              setSelectedSpecies={setSelectedSpecies}
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
        setStepData={() => setStepData(4, fourthStepData)}
      />
    </>
  );
};

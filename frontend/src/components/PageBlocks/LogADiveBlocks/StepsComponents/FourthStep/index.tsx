import React, {
  FC, useContext, useEffect, useState,
} from 'react';

import { Search } from './SearchBlock';
import { SpeciesList } from './SpeciesList';
import { StepsNavigation } from '../../StepsNavigation';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { firestoreSpeciesServices } from '../../../../../firebase/firestore/firestoreServices/firestoreSpeciesServices';
import { SpeciesType } from '../../../../../firebase/firestore/models';
import { StepProps } from '../../types/commonTypes';
import { FourthStepType, ThirdStepType } from '../../types/stepTypes';
import styles from './styles.module.scss';
import { StepsIndicator } from '../../StepsIndicator';
import { notify } from '../../../../../utils/notify';
import { firestoreSpotsService } from '../../../../../firebase/firestore/firestoreServices/firestoreSpotsService';
import { AuthStatusContext } from '../../../../../layouts/AuthLayout';

export const FourthStep: FC<StepProps> = ({ step, setStep }) => {
  const { setStepData, getStepData } = useContext(LogDiveDataContext);
  const { userAuth } = useContext(AuthStatusContext);
  const [speciesMode, setSpeciesMode] = useState<'local' | 'all'>('all');
  const [currentSpeciesMode, setCurrentSpeciesMode] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [searchedSpecies, setSearchedSpecies] = useState<SpeciesType[]>([]);
  const [mySpecies, setMySpecies] = useState<SpeciesType[]>([]);
  const [localSpecies, setLocalSpecies] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType[]>([]);

  const [loading, setLoading] = useState(false);

  const { spotId } = getStepData(3) as ThirdStepType;

  const onSearchHandler = async (val: string) => {
    setCurrentSpeciesMode('');
    try {
      setLoading(true);
      setSearchedSpecies([]);
      const searched = await firestoreSpeciesServices.getSpeciesByName(val);
      setSearchedSpecies(searched);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
  };

  useEffect(() => {
    (async () => {
      const data = getStepData(4) as FourthStepType;
      try {
        const mySpecs = await firestoreSpeciesServices.getMySpecies(userAuth.uid);
        setMySpecies(mySpecs);
      } catch (ev) {
        notify(ev);
      }
      if (data.species && Array.isArray(data.species)) {
        setSelectedSpecies(data.species);
      }
    })();
  }, [step]);

  useEffect(() => {
    if (spotId) {
      (async () => {
        try {
          setSpeciesMode('local');
          if (spotId) {
            setLoading(true);
            const spot = await firestoreSpotsService.getSpotById(
              spotId,
            );
            const species = await firestoreSpeciesServices.getLocalSpecies(
              { lat: spot.lat, lng: spot.lng },
            );
            setLocalSpecies(species);
          }
        } catch (ev) {
          notify(ev);
        }
        setLoading(false);
      })();
    }
  }, [spotId, step]);

  const fourthStepData: FourthStepType = {
    species: selectedSpecies,
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

          <SpeciesList
            currentSpeciesMode={currentSpeciesMode}
            setCurrentSpeciesMode={setCurrentSpeciesMode}
            mySpecies={mySpecies}
            localSpecies={localSpecies}
            speciesMode={speciesMode}
            searchedSpecies={searchedSpecies}
            selectedSpecies={selectedSpecies}
            setSelectedSpecies={setSelectedSpecies}
            loading={loading}
          />

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

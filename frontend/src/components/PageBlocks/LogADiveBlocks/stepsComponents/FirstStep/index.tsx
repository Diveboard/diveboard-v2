import React, { FC, useContext, useState } from 'react';
import { Overview } from './Overview';
import { usePrevStepCallback } from '../../logDiveHooks/usePrevStepCallback';
import { DiveReviews } from './DiveReviews';
import DiveActivities from './DiveTypeAndActivities';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { ScoreType, StepProps } from '../../types/commonTypes';
import { FirstStepType } from '../../types/stepTypes';

export const FirstStep: FC<StepProps> = ({
  step,
  prevStep,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);

  const [diveNumber, setDiveNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [tripName, setTripName] = useState('');

  const [diveNumberError, setDiveNumberError] = useState('');
  const [tripNameError, setTripNameError] = useState('');

  const isError = !!diveNumberError || !!tripNameError;

  const [overReview, setOverReview] = useState<ScoreType>(0);
  const [diveDifficulty, setDiveDifficulty] = useState<ScoreType>(0);
  const [marineLifeQuality, setMarineLifeQuality] = useState<ScoreType>(0);

  const [wreck, setWreck] = useState(false);
  const [bigFish, setBigFish] = useState(false);

  const [recreational, setRecreational] = useState(false);
  const [training, setTraining] = useState(false);
  const [nightDive, setNightDive] = useState(false);
  const [deepDive, setDeepDive] = useState(false);
  const [drift, setDrift] = useState(false);
  const [wrech, setWrech] = useState(false);
  const [cave, setCave] = useState(false);
  const [reef, setReef] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [research, setResearch] = useState(false);
  const [additional, setAdditional] = useState('');

  const firstStepData: FirstStepType = {
    overview:
      {
        diveNumber,
        notes,
        tripName,
      },
    diveReviews:
      {
        overReview,
        diveDifficulty,
        marineLifeQuality,
      },
    diveActivities: {
      recreational,
      training,
      nightDive,
      deepDive,
      drift,
      wrech,
      cave,
      reef,
      photo,
      research,
      other: additional.split(','),
    },
  };

  usePrevStepCallback(
    1,
    prevStep,
    isError,
    () => {
      setStepData(1, firstStepData);
    },
  );

  return (
    <>
      <Overview
        diveNumber={diveNumber}
        setDiveNumber={setDiveNumber}
        notes={notes}
        setNotes={setNotes}
        tripName={tripName}
        setTripName={setTripName}
        diveNumberError={diveNumberError}
        setDiveNumberError={setDiveNumberError}
        tripNameError={tripNameError}
        setTripNameError={setTripNameError}
        step={step}
        setStep={setStep}
      />
      {step === 1 && (
        <>
          <DiveReviews
            overReviewScore={overReview}
            setOverReviewScore={setOverReview}
            diveDifficultyScore={diveDifficulty}
            setDiveDifficultyScore={setDiveDifficulty}
            marineLifeQualityScore={marineLifeQuality}
            setMarineLifeQualityScore={setMarineLifeQuality}
            wreck={wreck}
            setWreck={setWreck}
            bigFish={bigFish}
            setBigFish={setBigFish}
          />

          <DiveActivities
            recreational={recreational}
            setRecreational={setRecreational}
            training={training}
            setTraining={setTraining}
            nightDive={nightDive}
            setNightDive={setNightDive}
            deepDive={deepDive}
            setDeepDive={setDeepDive}
            drift={drift}
            setDrift={setDrift}
            wrech={wrech}
            setWrech={setWrech}
            cave={cave}
            setCave={setCave}
            reef={reef}
            setReef={setReef}
            photo={photo}
            setPhoto={setPhoto}
            research={research}
            setResearch={setResearch}
            additional={additional}
            setAdditional={setAdditional}
          />
        </>
      )}
    </>
  );
};

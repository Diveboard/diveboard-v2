import React, { useContext, useEffect, useState } from 'react';
import { StepsIndicator } from './StepsIndicator';
import { PreStep } from './StepsComponents/PreStep';
import { FirstStep } from './StepsComponents/FirstStep';
import { SecondStep } from './StepsComponents/SecondStep';
import { FourthStep } from './StepsComponents/FourthStep';
import { ThirdStep } from './StepsComponents/ThirdStep';
import { FifthStep } from './StepsComponents/FifthStep';
import { SixthStep } from './StepsComponents/SixthStep';
import { SeventhStep } from './StepsComponents/SeventhStep';
import { NinthStep } from './StepsComponents/NinthStep';
import { EighthStep } from './StepsComponents/EighthStep';
import { CongratsStep } from './StepsComponents/CongratsStep';
import { LogDiveDataContext } from './LogDiveData/logDiveContext';
import { StepType } from './types/commonTypes';
import styles from './styles.module.scss';
import { firestoreDivesService } from '../../../firebase/firestore/firestoreServices/firestoreDivesService';
import { Loader } from '../../Loader';

type Props = {
  diveId?: string;
  userId?: string;
};

export const LogDiveBlock = ({ diveId, userId }: Props) => {
  const [step, setStep] = useState<StepType>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { setCurrentStep, setData } = useContext(LogDiveDataContext);

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  useEffect(() => {
    if (diveId && userId) {
      (async () => {
        setLoading(true);
        const dive = await firestoreDivesService.getDiveData(userId, diveId);
        // @ts-ignore
        setData(dive);
        setStep(1);
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [diveId, userId]);

  return (
    <div className={styles.diveWrapper}>
      <Loader loading={isLoading} />
      {step !== 10 && (
        <div className={styles.header}>
          <h1>{diveId ? `Dive ${diveId}` : 'New Dive'}</h1>
          <span>SAVE DRAFT</span>
        </div>
      )}
      {!isLoading && (
        <>
          {step === 0 && <PreStep setStep={setStep} />}
          {step !== 0 && step !== 10 && (
            <StepsIndicator step={step} setStep={setStep} />
          )}
          <FirstStep step={step} setStep={setStep} />
          <SecondStep step={step} setStep={setStep} />
          <ThirdStep step={step} setStep={setStep} />
          <FourthStep step={step} setStep={setStep} />
          <FifthStep step={step} setStep={setStep} />
          <SixthStep step={step} setStep={setStep} />
          <SeventhStep step={step} setStep={setStep} />
          <EighthStep step={step} setStep={setStep} />
          <NinthStep step={step} setStep={setStep} diveId={diveId} />
          {step === 10 && <CongratsStep setStep={setStep} />}
        </>
      )}
    </div>
  );
};

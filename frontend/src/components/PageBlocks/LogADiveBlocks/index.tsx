import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { convertAllStepsData } from './LogDiveHelpers/convertAllStepsData';

type Props = {
  diveId?: string;
  userId: string;
};

export const LogDiveBlock = ({ diveId, userId }: Props) => {
  const [step, setStep] = useState<StepType>(0);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState<boolean>(true);
  const { setCurrentStep, setData, getAllStepsData } = useContext(LogDiveDataContext);

  const router = useRouter();

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  useEffect(() => {
    if (diveId && userId) {
      (async () => {
        setLoading(true);
        const dive = await firestoreDivesService.getDiveData(userId, diveId);
        if (!dive) {
          setError('Dive is not found');
        } else {
          // @ts-ignore
          setData(dive);
          setStep(1);
        }
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  }, [diveId, userId]);

  const saveDraft = async () => {
    const allStepsData = getAllStepsData();
    const data = convertAllStepsData(allStepsData, true);
    setLoading(true);
    if (diveId) {
      // @ts-ignore
      await firestoreDivesService.updateDiveData(userId, diveId, data);
    } else {
      // @ts-ignore
      await firestoreDivesService.setDiveData(data, userId);
    }
    router.push('/dive-manager');
  };

  return (
    <div className={styles.diveWrapper}>
      <Loader loading={isLoading} />
      {error ? (
        <div className={styles.header}>
          <h1>Dive is not found</h1>
        </div>
      ) : (
        <>
          {step !== 10 && (
          <div className={styles.header}>
            <h1>{diveId ? `Dive ${diveId}` : 'New Dive'}</h1>
            <span onClick={saveDraft}>SAVE DRAFT</span>
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
            <FourthStep step={step} setStep={setStep} userId={userId} />
            <FifthStep step={step} setStep={setStep} />
            <SixthStep step={step} setStep={setStep} />
            <SeventhStep step={step} setStep={setStep} />
            <EighthStep step={step} setStep={setStep} />
            <NinthStep step={step} setStep={setStep} diveId={diveId} />
            {step === 10 && <CongratsStep setStep={setStep} />}
          </>
          )}
        </>
      )}
    </div>
  );
};

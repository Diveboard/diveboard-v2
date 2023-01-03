import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { DiveType } from '../../../types';
import { AuthStatusContext } from '../../../layouts/AuthLayout';

type Props = {
  dive?: DiveType;
  diveId?: string;
  userId: string;
};

export const LogDiveBlock = ({ dive, diveId, userId }: Props) => {
  const [step, setStep] = useState<StepType>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    setCurrentStep, setData, getAllStepsData, setEmptyData,
  } = useContext(LogDiveDataContext);

  const { userAuth } = useContext(AuthStatusContext);

  const router = useRouter();
  const { isNew } = router.query;

  useEffect(() => {
    if (isNew) {
      setEmptyData();
      setStep(0);
      router.push('/log-dive');
    } else {
      setCurrentStep(step);
    }
  }, [step, isNew]);

  useEffect(() => {
    if (dive) {
      // @ts-ignore
      setData(dive, userAuth.settings.preferences.unitSystem);
      setStep(1);
    }
  }, [dive]);

  const saveDraft = async () => {
    const allStepsData = getAllStepsData();
    setLoading(true);
    const data = await convertAllStepsData(
      allStepsData,
      userId,
      userAuth.settings.preferences.unitSystem,
      true,
    );
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
      {step !== 10 && (
      <div className={styles.header}>
        <h1>{diveId ? `Dive ${diveId}` : 'New Dive'}</h1>
        <span onClick={saveDraft}>SAVE DRAFT</span>
      </div>
      )}
      {!isLoading && (
      <>
        {step === 0 && <PreStep setStep={setStep} />}
        <FirstStep step={step} setStep={setStep} />
        <SecondStep step={step} setStep={setStep} />
        <ThirdStep step={step} setStep={setStep} />
        <FourthStep step={step} setStep={setStep} userId={userId} />
        <FifthStep step={step} setStep={setStep} />
        <SixthStep step={step} setStep={setStep} />
        <SeventhStep step={step} setStep={setStep} />
        <EighthStep step={step} setStep={setStep} />
        <NinthStep step={step} setStep={setStep} diveId={diveId} userId={userId} />
        {step === 10 && <CongratsStep />}
      </>
      )}
    </div>
  );
};

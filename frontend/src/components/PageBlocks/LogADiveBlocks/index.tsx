import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
import { notify } from '../../../utils/notify';
import { Backdrop } from '../../Backdrop';
import { Popup } from '../../DiveManager/Popup';
import KebabButton from '../../Buttons/KebabButton';
import { MediaUrls } from '../../../firebase/firestore/models';

type Props = {
  dive?: DiveType;
  diveId?: string;
  userId: string;
  mediaUrls?: Array<MediaUrls>
};

export const LogDiveBlock = ({
  dive, diveId, userId, mediaUrls,
}: Props) => {
  const [step, setStep] = useState<StepType>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDraftPopupOpen, setDraftPopupOpen] = useState<boolean>(false);

  const {
    setCurrentStep, setData, getAllStepsData, setEmptyData,
  } = useContext(LogDiveDataContext);

  const { userAuth } = useContext(AuthStatusContext);
  const router = useRouter();
  const { isNew } = router.query;
  const [, anchor] = router.asPath.split('#');

  useEffect(() => {
    if (+anchor !== step && +anchor >= 1 && +anchor < 10) {
      setStep(+anchor as StepType);
    }
  }, [anchor]);

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
      setData({ ...dive, mediaUrls }, userAuth.settings.preferences.unitSystem);
      if (anchor && +anchor !== step && +anchor >= 1 && +anchor < 10) {
        setStep(+anchor as StepType);
      } else {
        setStep(1);
      }
    }
  }, [dive]);

  const saveDraft = async () => {
    try {
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
      setDraftPopupOpen(false);
      router.push('/dive-manager');
    } catch (e) {
      setLoading(false);
      notify('Something went wrong');
    }
  };

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setDraftPopupOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <div className={styles.diveWrapper} style={{ display: (step === 0 || isLoading) ? 'block' : 'flex' }}>
      {step !== 10 && (
      <div className={styles.header}>
        <h1>{diveId ? `Dive ${diveId}` : 'New Dive'}</h1>
        <span onClick={() => setDraftPopupOpen(true)}>SAVE DRAFT</span>
      </div>
      )}
      {isLoading && <Loader loading={isLoading} /> }
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
        {isDraftPopupOpen && <Backdrop />}
        {isDraftPopupOpen && (
        <Popup closePopup={() => setDraftPopupOpen(false)} title="Your dive will be saved as a Draft">
          <div className={styles.draftPopupText}>
            It will not be visible to other users untill you fill in all the steps and publish it.
            You can manage your dives at
            {' '}
            <Link href="/dive-manager">
              <a>Dive Manager</a>
            </Link>
          </div>
          <div className={styles.draftPopupWrapper}>
            <KebabButton
              className="popup"
              thirdClassName="popup__big"
              onClick={saveDraft}
            >
              Save this Dive as a Draft
            </KebabButton>
            <span className={styles.disagree} onClick={() => setDraftPopupOpen(false)}>
              Discard Draft
            </span>
          </div>
        </Popup>
        )}
      </>
      )}
    </div>
  );
};

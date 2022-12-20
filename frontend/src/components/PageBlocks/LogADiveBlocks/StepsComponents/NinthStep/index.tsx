import React, {
  FC, useContext, useEffect, useState,
} from 'react';

import { ButtonGroup } from '../../../../ButtonGroup';
import { Button } from '../../../../Buttons/Button';
import { DisabledNext } from '../../StepsNavigation/DisabledNext';
import { MarginWrapper } from '../../../../MarginWrapper';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';
import { convertAllStepsData } from '../../LogDiveHelpers/convertAllStepsData';

import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { NinthStepType } from '../../types/stepTypes';
import containerStyle from '../../styles.module.scss';
import styles from './styles.module.scss';
import { firestoreDivesService } from '../../../../../firebase/firestore/firestoreServices/firestoreDivesService';
import { AuthStatusContext } from '../../../../../layouts/AuthLayout';
import { Loader } from '../../../../Loader';
import { StepsIndicator } from '../../StepsIndicator';

export const NinthStep: FC<StepProps & { diveId?: string, userId: string }> = ({
  step,
  setStep,
  diveId,
  userId,
}) => {
  const { userAuth } = useContext(AuthStatusContext);
  const { getStepData, setStepData, getAllStepsData } = useContext(LogDiveDataContext);

  const publishingModes = [
    {
      text: 'Public',
      connectedMode: 'public',
    },
    {
      text: 'Private',
      connectedMode: 'private',
    },
    {
      text: 'Friends Only',
      connectedMode: 'friends only',
    },
  ];
  const allStepsData = getAllStepsData();
  const isMobile = useWindowWidth(500, 768);
  const [publishingMode, setPublishingMode] = useState('public');
  const [isLoading, setLoading] = useState(false);

  const ninthStepData: NinthStepType = {
    publishingMode: publishingMode as NinthStepType['publishingMode'],
  };

  useEffect(() => {
    setStepData(9, ninthStepData);
  }, [publishingMode]);

  useEffect(() => {
    const data = getStepData(9) as NinthStepType;
    if (data.publishingMode) {
      setPublishingMode(data.publishingMode);
    }
  }, [step]);

  if (step !== 9) {
    return null;
  }

  const publishStepsData = async () => {
    const data = await convertAllStepsData(allStepsData, userId);
    setLoading(true);
    if (diveId) {
      // @ts-ignore
      await firestoreDivesService.updateDiveData(userAuth.uid, diveId, data);
    } else {
      // @ts-ignore
      await firestoreDivesService.setDiveData(data, userAuth.uid);
    }
    setLoading(false);
    setStep(10);
  };

  return (
    <>
      <StepsIndicator step={step} setStep={setStep} setStepData={() => {}} />
      <div className={containerStyle.container}>
        <div className={styles.ninthStep}>
          <Loader loading={isLoading} />

          <h2>Save and done!</h2>
          <MarginWrapper top={10}>
            <span className={styles.privacy}>Privacy</span>
          </MarginWrapper>

          <MarginWrapper top={30} bottom={20} display="block">
            <ButtonGroup
              buttons={publishingModes}
              onClick={setPublishingMode}
              contentBehavior="wrap"
              defaultChecked={publishingMode}
            />
          </MarginWrapper>

          <Button
            width={isMobile ? 768 : 124}
            height={isMobile ? 46 : 56}
            borderRadius={30}
            border="none"
            backgroundColor="#0059DE"
            disable={isLoading}
            onClick={publishStepsData}
          >
            <span className={styles.btnText}>
              Publish
            </span>
          </Button>
        </div>
      </div>

      <DisabledNext setStep={setStep} />
    </>
  );
};

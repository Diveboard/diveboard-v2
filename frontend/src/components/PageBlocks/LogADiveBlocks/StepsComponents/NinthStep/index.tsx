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
import { EighthStepType, NinthStepType } from '../../types/stepTypes';
import containerStyle from '../../styles.module.scss';
import styles from './styles.module.scss';
import { firestoreDivesService } from '../../../../../firebase/firestore/firestoreServices/firestoreDivesService';
import { AuthStatusContext } from '../../../../../layouts/AuthLayout';
import { Loader } from '../../../../Loader';
import { StepsIndicator } from '../../StepsIndicator';
import { notify } from '../../../../../utils/notify';
import { NetworkStatusContext } from '../../../../../layouts/NetworkStatus';
import { deleteCache } from '../../../../../utils/refreshCache';

export const NinthStep: FC<StepProps & { diveId?: string }> = ({
  step,
  setStep,
  diveId,
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
      setPublishingMode(data.publishingMode.toLowerCase());
    }
  }, [step]);

  const isOffline = useContext(NetworkStatusContext);

  if (step !== 9) {
    return null;
  }

  const publishStepsData = async () => {
    try {
      setLoading(true);
      const data = await convertAllStepsData(
        allStepsData,
        userAuth.uid,
        userAuth.settings.preferences.unitSystem,
      );
      const { sendToDAN, saveDAN } = getStepData(8) as EighthStepType;
      if (!saveDAN) {
        data.danSurvey = null;
      }
      if (data.aboutDive.diveNumber
          && data.aboutDive.tripName
          && data.diveData.date
          && data.diveData.maxDepth
          && data.diveData.duration
      ) {
        if (isOffline) {
          notify('Your dive will be published after your will be online');
          setLoading(false);
          setStep(10);
        } else {
          deleteCache();
        }
        if (diveId) {
          // @ts-ignore
          await firestoreDivesService.updateDiveData(userAuth.uid, diveId, data, sendToDAN);
        } else {
          // @ts-ignore
          await firestoreDivesService.setDiveData(data, userAuth.uid, sendToDAN);
        }
        setStep(10);
      } else {
        notify('Fill all require data');
      }
      setLoading(false);
      setStep(10);
    } catch (e) {
      setLoading(false);
      notify(e.message);
    }
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

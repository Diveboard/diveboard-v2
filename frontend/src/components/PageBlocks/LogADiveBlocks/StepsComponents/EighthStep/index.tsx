import React, {
  FC, useContext, useEffect, useState,
} from 'react';

import { StepsNavigation } from '../../StepsNavigation';
import { SurveyCard } from './SurveyCard';
import { DanSurvey } from './Surveys/Dan';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { EighthStepType } from '../../types/stepTypes';
import stylesContainer from '../../styles.module.scss';
import styles from './styles.module.scss';
import { StepsIndicator } from '../../StepsIndicator';
import { SurveyDanType } from '../../../../../types';
import { InitialDANFormState } from './Surveys/Dan/DanForm/initialDANFormState';
import {DocumentReference} from "@firebase/firestore";

export const EighthStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData, getStepData } = useContext(LogDiveDataContext);
  const [currentSurveyMode, setCurrentSurveyMode] = useState('');
  const [survey, setSurvey] = useState<SurveyDanType>(InitialDANFormState);
  const [surveyRef, setSurveyRef] = useState<DocumentReference>(null);
  const [sendToDAN, setSendTODAN] = useState<boolean>(false);
  const [saveDAN, setSaveDAN] = useState<boolean>(false);

  useEffect(() => {
    const data = getStepData(8) as EighthStepType;
    if (data.surveyRef) {
      setSurveyRef(data.surveyRef);
    }
  }, [step]);

  if (step !== 8) {
    return null;
  }
  const eighthStep: EighthStepType = {
    surveyRef, danSurvey: survey, sendToDAN, saveDAN,
  };

  return (
    <>
      <StepsIndicator
        step={step}
        setStep={setStep}
        setStepData={() => setStepData(8, eighthStep)}
      />
      <div className={stylesContainer.container}>
        {!currentSurveyMode && (
          <div className={styles.eighthStep}>
            <div className={styles.titleBlock}>
              <h2> Scientific Surveys</h2>
              <p>
                <span>Dive Smart:</span>
                {' '}
                Support the following research projects by answering a few questions
              </p>
            </div>
            <div className={styles.cards}>
              <SurveyCard
                surveyType="General"
                title="Dan - Diver’s Alert Network"
                description="Studies the medical impact of decompression on the organism"
                contributions={123456}
                setCurrentSurvey={setCurrentSurveyMode}
              />
            </div>
          </div>
        )}
        {currentSurveyMode === 'Dan - Diver’s Alert Network'
          && (
          <DanSurvey
            survey={survey}
            setSurvey={setSurvey}
            setStep={setStep}
            surveyRef={surveyRef}
            sendToDAN={sendToDAN}
            setSendTODAN={setSendTODAN}
            setSaveDAN={setSaveDAN}
            setSurveyMode={setCurrentSurveyMode}
          />
          )}
      </div>

      {!currentSurveyMode && (
        <StepsNavigation
          setStep={setStep}
          setStepData={() => setStepData(8, eighthStep)}
        />
      )}

    </>
  );
};

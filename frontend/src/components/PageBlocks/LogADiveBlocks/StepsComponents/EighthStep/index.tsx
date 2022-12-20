import React, { FC, useContext, useState } from 'react';

import { StepsNavigation } from '../../StepsNavigation';
import { SurveyCard } from './SurveyCard';
import { DanSurvey } from './Surveys/Dan';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { EighthStepType } from '../../types/stepTypes';
import stylesContainer from '../../styles.module.scss';
import styles from './styles.module.scss';
import { StepsIndicator } from '../../StepsIndicator';

export const EighthStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);
  const [currentSurveyMode, setCurrentSurveyMode] = useState('');
  const [survey, setSurvey] = useState<EighthStepType>([]);

  const eighthStep: EighthStepType = survey;

  if (step !== 8) {
    return null;
  }

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
            setSurvey={setSurvey}
            setSurveyMode={setCurrentSurveyMode}
            setStep={setStep}
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

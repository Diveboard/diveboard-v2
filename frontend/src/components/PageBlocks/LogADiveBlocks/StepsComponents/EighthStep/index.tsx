import React, { FC, useContext } from 'react';

import { StepsNavigation } from '../../StepsNavigation';
import { SurveyCard } from './SurveyCard';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import stylesContainer from '../../styles.module.scss';
import styles from './styles.module.scss';

export const EighthStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);
  const eighthStep = {};
  if (step !== 8) {
    return null;
  }
  return (
    <>
      <div className={stylesContainer.container}>
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
            />
            <SurveyCard
              surveyType="General"
              title="Dan - Diver’s Alert Network"
              description="Studies the medical impact of decompression on the organism"
              contributions={123456}
            />
            <SurveyCard
              surveyType="General"
              title="Dan - Diver’s Alert Network"
              description="Studies the medical impact of decompression on the organism"
              contributions={123456}
            />
            <SurveyCard
              surveyType="General"
              title="Dan - Diver’s Alert Network"
              description="Studies the medical impact of decompression on the organism"
              contributions={123456}
            />

          </div>

        </div>
      </div>

      <StepsNavigation
        setStep={setStep}
        setStepData={() => {
          setStepData(8, eighthStep);
        }}
      />
    </>
  );
};

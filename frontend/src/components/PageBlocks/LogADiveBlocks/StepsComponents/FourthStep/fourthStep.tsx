import React, {
  FC, useContext,
} from 'react';
import { StepsNavigation } from '../../StepsNavigation';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { FourthStepType } from '../../types/stepTypes';
import styles from './styles.module.scss';

export const FourthStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);

  const secondStepData: FourthStepType = {
    // parameters,
    // advancedParameters,
  };

  if (step !== 4) {
    return null;
  }

  return (
    <>
      <div className={styles.fourthStep}>
        <h1 className={styles.helloTitle}>Hello fourth step</h1>
      </div>
      <StepsNavigation
        setStep={setStep}
        setStepData={() => {
          setStepData(4, secondStepData);
        }}
      />
    </>
  );
};

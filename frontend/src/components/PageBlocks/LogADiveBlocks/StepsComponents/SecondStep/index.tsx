import React, {
  FC, useContext, useState,
} from 'react';
import { Button } from '../../../../Buttons/Button';
import { MarginWrapper } from '../../../../MarginWrapper';
import { Parameters } from './Parameters';
import { SafetySpots } from './SafetySpots';
import { AdvancedParameters } from './AdvancedParameters';
import { Tanks } from './Tanks';
import { setStepErrors } from '../../LogDiveHelpers/stepsErrors/setStepErrors';
import { StepsNavigation } from '../../StepsNavigation';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { SecondStepType } from '../../types/stepTypes';
import { SecondStepErrors } from '../../types/errorTypes';
import styles from './styles.module.scss';

export const SecondStep: FC<StepProps> = ({
  step,
  setStep,
}) => {
  const { setStepData } = useContext(LogDiveDataContext);

  const [parameters, setParameters] = useState<SecondStepType['parameters']>({
    time: '',
    date: null,
    maxDepth: undefined,
    duration: undefined,
    surfaceInterval: undefined,
    safetySpots: [{
      id: 1,
      period: undefined,
      depth: undefined,
    }],
  });

  const [parametersErrors, setParametersErrors] = useState<SecondStepErrors>({
    timeError: '',
    dateError: '',
    maxDepthError: '',
    durationError: '',
  });

  const setErrors = () => setStepErrors({
    stepType: 2,
    data: parameters,
    errors: parametersErrors,
    setErrors: setParametersErrors,
  });

  const [advancedParameters,
    setAdvancedParameters] = useState<SecondStepType['advancedParameters']>({
    surfaceTemp: undefined,
    bottomTemp: undefined,
    weights: undefined,
    waterType: undefined,
    current: undefined,
    altitude: undefined,
    waterVisibility: undefined,
  });

  const [tanks, setTanks] = useState<SecondStepType['tanks']>([]);

  const secondStepData: SecondStepType = {
    parameters,
    advancedParameters,
    tanks,
  };

  if (step !== 2) {
    return null;
  }

  return (
    <>
      <div className={styles.secondStep}>

        <h2>
          Profile
        </h2>
        <MarginWrapper top={10} />
        <p>
          To display on Diveboard the exact profile of your dive, you can either connect directly
          your
          dive computer, or select an export from another software.
          If you don't upload your dive profile, a generic profile will be generated based on the
          duration and safety stops you entered. You can always upload later.
        </p>
        <p>
          If you don't upload your dive profile, a generic profile will be generated based on the
          duration and safety stops you entered. You can always upload later.
        </p>

        <div className={styles.buttonGroup}>

          <Button
            backgroundColor="#0059DE"
            border="none"
            borderRadius={30}
            width={305}
            height={48}
          >
            <span className={styles.primaryButton}>
              Import from Dive Computer
            </span>

          </Button>

          <Button
            backgroundColor="transparent"
            border="2px solid #000345"
            borderRadius={30}
            width={373}
            height={48}
          >
            <span className={styles.secondaryButton}>
              Import from File & Partner Services
            </span>
          </Button>
        </div>

        <Parameters
          parameters={parameters}
          setParameters={setParameters}
          errors={parametersErrors}
          setErrors={setParametersErrors}
        />

        <SafetySpots parameters={parameters} setParameters={setParameters} />
        <AdvancedParameters
          advancedParameters={advancedParameters}
          setAdvancedParameters={setAdvancedParameters}
        />
        <Tanks tanks={tanks} setTanks={setTanks} />

      </div>
      <StepsNavigation
        setStep={setStep}
        setErrors={setErrors}
        setStepData={() => {
          setStepData(2, secondStepData);
        }}
      />
    </>
  );
};

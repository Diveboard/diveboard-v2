import React, {
  FC, useContext, useEffect, useRef, useState,
} from 'react';
import { Button } from '../../../../Buttons/Button';
import { MarginWrapper } from '../../../../MarginWrapper';
import { Parameters } from './Parameters';
import { SafetySpots } from './SafetySpots';
import { AdvancedParameters } from './AdvancedParameters';
import { Tanks } from './Tanks';
import { setStepErrors } from '../../LogDiveHelpers/stepsErrors/setStepErrors';
import { StepsNavigation } from '../../StepsNavigation';
import { DepthChart } from '../../../../DepthChart/depthChart';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { SecondStepType } from '../../types/stepTypes';
import { SecondStepErrors } from '../../types/errorTypes';
import styles from './styles.module.scss';
import { StepsIndicator } from '../../StepsIndicator';

export const SecondStep: FC<StepProps> = ({ step, setStep }) => {
  const { setStepData, getStepData } = useContext(LogDiveDataContext);
  const [data, setData] = useState<SecondStepType>(undefined);
  const [showChart, setShowChart] = useState(false);
  const showedChart = useRef(false);

  // TODO: // For what
  // const [spots, setSpots] = useState<{
  //   depth: number;
  //   diveTime: number;
  //   temperature: number;
  // }[]
  // >([]);

  // useEffect(() => {
  //   const newSpots = data?.parameters?.safetySpots.map((spot) => ({
  //     depth: spot.depth,
  //     diveTime: spot.period,
  //     temperature: 0,
  //   }));
  //   setSpots(newSpots);
  // }, [data?.parameters?.safetySpots]);

  const [parametersErrors, setParametersErrors] = useState<SecondStepErrors>({
    timeError: '',
    dateError: '',
    maxDepthError: '',
    durationError: '',
  });

  const setErrors = () => setStepErrors({
    stepType: 2,
    data: data.parameters,
    errors: parametersErrors,
    setErrors: setParametersErrors,
  });

  useEffect(() => {
    // load points //todo
  }, []);

  useEffect(() => {
    if (showedChart.current) {
      setShowChart(true);
    }
    showedChart.current = true;
  }, [data]);

  useEffect(() => {
    setData(getStepData(2) as SecondStepType);
  }, [step]);

  if (step !== 2) {
    return null;
  }

  return (
    <div>
      <StepsIndicator
        step={step}
        setStep={setStep}
        setErrors={setErrors}
        setStepData={() => setStepData(2, data)}
      />
      {data && (
      <>
        <div className={styles.secondStep}>
          <h2>Profile</h2>
          {/* TODO: Check it */}
          {showChart
              && data.parameters?.safetySpots
              && <DepthChart points={data.parameters.safetySpots} />}
          {!showChart && (
          <>
            <MarginWrapper top={10} />
            <p>
              To display on Diveboard the exact profile of your dive, you can
              either connect directly your dive computer, or select an export
              from another software. If you don't upload your dive profile, a
              generic profile will be generated based on the duration and safety
              stops you entered. You can always upload later.
            </p>
            <p>
              If you don't upload your dive profile, a generic profile will be
              generated based on the duration and safety stops you entered. You
              can always upload later.
            </p>

            <div className={styles.buttonGroup}>
              <Button
                backgroundColor="#0059DE"
                border="none"
                borderRadius={30}
                width={305}
                height={48}
                disable
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
          </>
          )}
          <Parameters
            parameters={data.parameters}
            setParameters={(res) => setData({ ...data, parameters: res })}
            errors={parametersErrors}
            setErrors={setParametersErrors}
          />

          <SafetySpots
            parameters={data.parameters}
            setParameters={(res) => setData({ ...data, parameters: res })}
          />
          <AdvancedParameters
            advancedParameters={data.advancedParameters}
            setAdvancedParameters={(res) => setData({ ...data, advancedParameters: res })}
          />
          <Tanks tanks={data.tanks} setTanks={(res) => setData({ ...data, tanks: res })} />
        </div>
        <StepsNavigation
          setStep={setStep}
          setErrors={setErrors}
          setStepData={() => setStepData(2, data)}
        />
      </>
      )}
    </div>
  );
};

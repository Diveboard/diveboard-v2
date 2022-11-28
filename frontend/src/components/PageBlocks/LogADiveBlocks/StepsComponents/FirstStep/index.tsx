import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { Overview } from './Overview';
import { DiveReviews } from './DiveReviews';
import { DiveActivities } from './DiveTypeAndActivities';
import { StepsNavigation } from '../../StepsNavigation';
import { setStepErrors } from '../../LogDiveHelpers/stepsErrors/setStepErrors';
import { LogDiveDataContext } from '../../LogDiveData/logDiveContext';
import { StepProps } from '../../types/commonTypes';
import { FirstStepType } from '../../types/stepTypes';
import { FirstStepErrors } from '../../types/errorTypes';
import styles from '../../styles.module.scss';
import { StepsIndicator } from '../../StepsIndicator';

export const FirstStep: FC<StepProps> = ({ step, setStep }) => {
  const { setStepData, getStepData } = useContext(LogDiveDataContext);
  const [data, setData] = useState<FirstStepType>(undefined);

  const [overviewErrors, setOverviewErrors] = useState<FirstStepErrors>({
    diveNumberError: '',
    tripNameError: '',
  });

  const setErrors = () => setStepErrors({
    stepType: 1,
    data: data.overview,
    errors: overviewErrors,
    setErrors: setOverviewErrors,
  });

  useEffect(() => {
    setData(getStepData(1) as FirstStepType);
  }, [step]);

  if (step !== 1) {
    return null;
  }

  return (
    <div>
      <StepsIndicator
        step={step}
        setStep={setStep}
        setErrors={setErrors}
        setStepData={() => setStepData(1, data)}
      />
      {data && (
      <>
        <div className={styles.container}>
          <Overview
            overviewData={data.overview}
            setOverviewData={(res) => {
              setData({ ...data, overview: res });
            }}
            overviewDataErrors={overviewErrors}
            setOverviewDataErrors={setOverviewErrors}
          />

          <DiveReviews
            diveReviews={data.diveReviews}
            setDiveReviews={(res) => setData({ ...data, diveReviews: res })}
          />

          <DiveActivities
            diveActivities={data.diveActivities}
            setDiveActivities={(res) => setData({ ...data, diveActivities: res })}
            other={data.diveActivities.other}
            setOther={(res) => {
              setData({ ...data, diveActivities: { ...data.diveActivities, other: res.split(',') } });
            }}
          />
        </div>
        <StepsNavigation
          setStep={setStep}
          setErrors={setErrors}
          setStepData={() => setStepData(1, data)}
        />
      </>
      )}
    </div>
  );
};

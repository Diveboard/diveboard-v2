import React, { FC, useEffect } from 'react';
import { TimePickerInput } from '../../../../../Input/TimePickerInput';
import { DatePickerInput } from '../../../../../Input/DatePickerInput';
import { InputLabelWrapper } from '../../../inputLabelWrapper';
import { Input } from '../../../../../Input/CommonInput';
import { SecondStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';
import { StepType } from '../../../types/commonTypes';

type Props = {
  parameters: SecondStepType['parameters'];
  setParameters: React.Dispatch<React.SetStateAction<SecondStepType['parameters']>>
  step: StepType;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  errors:
  {
    timeError: string,
    dateError: string,
    maxDepthError: string,
    durationError: string
  }
  setErrors:
  React.Dispatch<React.SetStateAction<{
    timeError: string,
    dateError: string,
    maxDepthError: string,
    durationError: string
  }>>

};

export const Parameters: FC<Props> = ({
  parameters,
  setParameters,
  step,
  setStep,
  errors,
  setErrors,
}) => {
  const setTime = (time: string) => {
    setParameters({
      ...parameters,
      time,
    });
  };

  const setDate = (currentDate: Date) => {
    setParameters({
      ...parameters,
      date: currentDate,
    });
  };

  const setMaxDepth = (depth: string) => {
    setParameters({
      ...parameters,
      maxDepth: +depth,
    });
  };

  const setDuration = (duration: string) => {
    setParameters({
      ...parameters,
      duration: +duration,
    });
  };

  const setSurfaceInterval = (surfaceInterval: string) => {
    setParameters({
      ...parameters,
      surfaceInterval: +surfaceInterval,
    });
  };

  useEffect(() => {
    if (errors.timeError || errors.dateError || errors.maxDepthError || errors.durationError) {
      setStep(2);
    }
  }, [errors.timeError, errors.dateError, errors.maxDepthError, errors.durationError, step]);

  useEffect(() => {
    if (step !== 2) {
      if (!parameters.time.length) {
        setErrors({
          ...errors,
          timeError: 'fill time of dive',
        });
      }

      if (!parameters.date) {
        setErrors({
          ...errors,
          dateError: 'fill date of a dive',
        });
      }

      if (!parameters.maxDepth) {
        setErrors({
          ...errors,
          maxDepthError: 'fill max depth of a dive',
        });
      }

      if (Number.isNaN(+parameters.maxDepth)) {
        setErrors({
          ...errors,
          maxDepthError: 'incorrect depth',
        });
      }

      if (!parameters.duration) {
        setErrors({
          ...errors,
          durationError: 'fill duration of a dive',
        });
      }

      if (Number.isNaN(+parameters.duration)) {
        setErrors({
          ...errors,
          durationError: 'incorrect duration',
        });
      }
    }
  }, [step]);

  if (step !== 2) {
    return null;
  }

  return (
    <div className={styles.parameters}>
      <InputLabelWrapper label="Time In">
        <TimePickerInput setTime={setTime} />
      </InputLabelWrapper>

      <InputLabelWrapper label="Date">
        <DatePickerInput date={parameters.date} setDate={setDate} />
      </InputLabelWrapper>

      <InputLabelWrapper label="Max depth">
        <Input
          type="number"
          value={parameters.maxDepth ? parameters.maxDepth.toString() : ''}
          setValue={setMaxDepth}
          height={48}
          width={165}
          placeholder="m"
          error={errors.maxDepthError}
          setError={(value) => {
            setErrors({
              ...errors,
              maxDepthError: value as string,
            });
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Duration">
        <Input
          type="number"
          value={parameters.duration ? parameters.duration.toString() : ''}
          setValue={setDuration}
          height={48}
          width={165}
          placeholder="min"
          error={errors.durationError}
          setError={(value) => {
            setErrors({
              ...errors,
              durationError: value as string,
            });
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Surface Interval">
        <Input
          type="number"
          value={parameters.surfaceInterval ? parameters.surfaceInterval.toString() : ''}
          setValue={setSurfaceInterval}
          height={48}
          width={165}
          placeholder="min"
        />
      </InputLabelWrapper>

    </div>
  );
};

import React, { FC } from 'react';
import { TimePickerInput } from '../../../../../Input/TimePickerInput';
import { DatePickerInput } from '../../../../../Input/DatePickerInput';
import { InputLabelWrapper } from '../../../inputLabelWrapper';
import { Input } from '../../../../../Input/CommonInput';
import { SecondStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';
import { SecondStepErrors } from '../../../types/errorTypes';

type Props = {
  parameters: SecondStepType['parameters'];
  setParameters: React.Dispatch<React.SetStateAction<SecondStepType['parameters']>>
  errors:
  SecondStepErrors
  setErrors:
  React.Dispatch<React.SetStateAction<SecondStepErrors>>
};

export const Parameters: FC<Props> = ({
  parameters,
  setParameters,
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

  return (
    <div className={styles.parameters}>
      <InputLabelWrapper label="Time In">
        <TimePickerInput
          setTime={setTime}
          currentTime={parameters.time}
          error={errors.timeError}
          setError={() => { setErrors({ ...errors, timeError: '' }); }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Date">
        <DatePickerInput
          date={parameters.date}
          setDate={setDate}
          error={errors.dateError}
          setError={() => { setErrors({ ...errors, dateError: '' }); }}
        />
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

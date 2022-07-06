import React, { FC } from 'react';
import { TimePickerInput } from '../../../../../Input/TimePickerInput';
import { DatePickerInput } from '../../../../../Input/DatePickerInput';
import { InputLabelWrapper } from '../../../inputLabelWrapper';
import { Input } from '../../../../../Input/CommonInput';
import { SecondStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';
import { SecondStepErrors } from '../../../types/errorTypes';
import { setParams } from '../../../LogDiveHelpers/setParams/setParams';

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
  const params = setParams(
    parameters,
    setParameters,
  );

  const errorsParams = setParams(
    errors,
    setErrors,
  );

  return (
    <div className={styles.parameters}>
      <InputLabelWrapper label="Time In">
        <TimePickerInput
          setTime={(val) => params('time', val)}
          currentTime={parameters.time}
          error={errors.timeError}
          setError={(val) => {
            errorsParams('timeError', val as string);
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Date">
        <DatePickerInput
          date={parameters.date}
          setDate={(val) => params('date', val)}
          error={errors.dateError}
          setError={(val) => {
            errorsParams('dateError', val as string);
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Max depth">
        <Input
          type="number"
          value={parameters.maxDepth ? parameters.maxDepth.toString() : ''}
          setValue={(val) => params('maxDepth', +(val as string))}
          height={48}
          width={165}
          placeholder="m"
          error={errors.maxDepthError}
          setError={(val) => {
            errorsParams('maxDepthError', val as string);
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Duration">
        <Input
          type="number"
          value={parameters.duration ? parameters.duration.toString() : ''}
          setValue={(val) => params('duration', +(val as string))}
          height={48}
          width={165}
          placeholder="min"
          error={errors.durationError}
          setError={(val) => {
            errorsParams('durationError', val as string);
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Surface Interval">
        <Input
          type="number"
          value={parameters.surfaceInterval ? parameters.surfaceInterval.toString() : ''}
          setValue={(val) => params('surfaceInterval', +(val as string))}
          height={48}
          width={165}
          placeholder="min"
        />
      </InputLabelWrapper>
    </div>
  );
};

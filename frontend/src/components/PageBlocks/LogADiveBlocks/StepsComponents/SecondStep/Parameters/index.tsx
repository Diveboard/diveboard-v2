import React, { FC, useContext } from 'react';
import { Time, TimePickerInput } from '../../../../../Input/TimePickerInput';
import { DatePickerInput } from '../../../../../Input/DatePickerInput';
import { InputLabelWrapper } from '../../../inputLabelWrapper';
import { Input } from '../../../../../Input/CommonInput';
import { SecondStepType } from '../../../types/stepTypes';
import styles from './styles.module.scss';
import { SecondStepErrors } from '../../../types/errorTypes';
import { setParams } from '../../../LogDiveHelpers/setParams/setParams';
import { useWindowWidth } from '../../../../../../hooks/useWindowWidth';
import { AuthStatusContext } from '../../../../../../layouts/AuthLayout';

type Props = {
  parameters: SecondStepType['parameters'];
  setParameters: (res: SecondStepType['parameters']) => void;
  errors: SecondStepErrors;
  setErrors: React.Dispatch<React.SetStateAction<SecondStepErrors>>;
};

export const Parameters: FC<Props> = ({
  parameters,
  setParameters,
  errors,
  setErrors,
}) => {
  const isMobile = useWindowWidth(500, 768);

  const params = setParams(parameters, setParameters);

  const {
    userAuth,
  } = useContext(AuthStatusContext);
  const errorsParams = setParams(errors, setErrors);

  return (
    <div className={styles.parameters}>
      <InputLabelWrapper label="Time In" mode={isMobile ? 'half' : 'common'}>
        <TimePickerInput
          setTime={(val) => {
            const newData = parameters.date ? new Date(parameters.date) : new Date();
            newData.setHours(val.hours);
            newData.setMinutes(val.minutes);
            params('date', newData);
          }}
          currentTime={{
            hours: parameters.date?.getHours() || 0,
            minutes: parameters.date?.getMinutes() || 0,
          } as Time}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Date" mode={isMobile ? 'half' : 'common'}>
        <DatePickerInput
          date={parameters.date}
          setDate={(val) => params('date', val)}
          error={errors.dateError}
          setError={(val) => {
            errorsParams('dateError', val as string);
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Max depth" mode={isMobile ? 'half' : 'common'}>
        <Input
          type="number"
          value={parameters.maxDepth ? parameters.maxDepth.toString() : ''}
          setValue={(val) => params('maxDepth', +(val as string))}
          height={48}
          width={isMobile ? 768 : 165}
          placeholder={userAuth.settings.preferences.unitSystem === 'METRIC' ? 'm' : 'ft'}
          error={errors.maxDepthError}
          setError={(val) => {
            errorsParams('maxDepthError', val as string);
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label="Duration" mode={isMobile ? 'half' : 'common'}>
        <Input
          type="number"
          value={parameters.duration ? parameters.duration.toString() : ''}
          setValue={(val) => params('duration', +(val as string))}
          height={48}
          min={0}
          width={isMobile ? 768 : 165}
          placeholder="min"
          error={errors.durationError}
          setError={(val) => {
            errorsParams('durationError', val as string);
          }}
        />
      </InputLabelWrapper>

      <InputLabelWrapper
        label="Surface Interval"
        mode={isMobile ? 'full' : 'common'}
      >
        <Input
          type="number"
          value={
            parameters.surfaceInterval
              ? parameters.surfaceInterval.toString()
              : ''
          }
          min={0}
          setValue={(val) => params('surfaceInterval', +(val as string))}
          height={48}
          width={730}
          placeholder="min"
        />
      </InputLabelWrapper>
    </div>
  );
};

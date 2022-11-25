import React, { FC } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { TextArea } from '../../../../../Input/TextArea';
import { FirstStepType } from '../../../types/stepTypes';
import { FirstStepErrors } from '../../../types/errorTypes';
import styles from './styles.module.scss';
import { setParams } from '../../../LogDiveHelpers/setParams/setParams';

type Props = {
  overviewData: FirstStepType['overview'];
  setOverviewData: (res: FirstStepType['overview']) => void;
  overviewDataErrors: FirstStepErrors;
  setOverviewDataErrors: React.Dispatch<React.SetStateAction<FirstStepErrors>>;
};

export const Overview: FC<Props> = ({
  overviewData,
  setOverviewData,
  overviewDataErrors,
  setOverviewDataErrors,
}) => {
  const params = setParams(
    overviewData,
    setOverviewData,
  );

  const errorsParams = setParams(
    overviewDataErrors,
    setOverviewDataErrors,
  );

  return (
    <div className={styles.overviewWrapper}>
      <h2>
        Overview
      </h2>
      <p>
        You can fill in these elements manually,
        or you can import a profile from a computer or a file
      </p>
      <div>

        <h3>
          Dive Number
        </h3>
        <Input
          value={overviewData.diveNumber ? `${overviewData.diveNumber}` : ''}
          setValue={
            (val) => params('diveNumber', +(val as string))
          }
          height={48}
          width={570}
          error={overviewDataErrors.diveNumberError}
          setError={
            (val) => {
              errorsParams('diveNumberError', val as string);
            }
          }
        />

        <h3>
          Notes
        </h3>
        <TextArea
          value={overviewData.notes}
          setValue={
            (val) => params('notes', val as string)
          }
          height={126}
        />

        <h3>
          Trip Name
        </h3>
        <Input
          value={overviewData.tripName}
          setValue={
            (val) => params('tripName', val as string)
          }
          height={48}
          width={570}
          error={overviewDataErrors.tripNameError}
          setError={
            (val) => {
              errorsParams('tripNameError', val as string);
            }
          }
        />
      </div>
    </div>
  );
};

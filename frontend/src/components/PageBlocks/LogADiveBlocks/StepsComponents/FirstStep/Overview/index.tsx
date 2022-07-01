import React, { FC } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { TextArea } from '../../../../../Input/TextArea';
import { FirstStepType } from '../../../types/stepTypes';
import { FirstStepErrors } from '../../../types/errorTypes';
import styles from './styles.module.scss';

type Props = {
  overviewData: FirstStepType['overview'];
  setOverviewData: React.Dispatch<React.SetStateAction<FirstStepType['overview']>>;
  overviewDataErrors: FirstStepErrors;
  setOverviewDataErrors: React.Dispatch<React.SetStateAction<FirstStepErrors>>;
};

export const Overview: FC<Props> = ({
  overviewData,
  setOverviewData,
  overviewDataErrors,
  setOverviewDataErrors,
}) => (
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
          (value) => {
            setOverviewData({
              ...overviewData,
              diveNumber: +(value as string),
            });
          }
        }
        height={48}
        width={570}
        error={overviewDataErrors.diveNumberError}
        setError={
          (value) => {
            setOverviewDataErrors({
              ...overviewDataErrors,
              diveNumberError: value as string,
            });
          }
        }
      />

      <h3>
        Notes
      </h3>
      <TextArea
        value={overviewData.notes}
        setValue={(value) => {
          setOverviewData({
            ...overviewData,
            notes: value as string,
          });
        }}
        height={126}
      />

      <h3>
        Trip Name
      </h3>
      <Input
        value={overviewData.tripName}
        setValue={
          (value) => {
            setOverviewData(
              {
                ...overviewData,
                tripName: value as string,
              },
            );
          }
        }
        height={48}
        width={570}
        error={overviewDataErrors.tripNameError}
        setError={
          (value) => {
            setOverviewDataErrors(
              {
                ...overviewDataErrors,
                tripNameError: value as string,
              },
            );
          }
        }
      />
    </div>
  </div>
);

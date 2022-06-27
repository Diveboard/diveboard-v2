import React, { FC, useEffect } from 'react';
import { Input } from '../../../../../Input/CommonInput';
import { TextArea } from '../../../../../Input/TextArea';
import styles from './styles.module.scss';
import { StepType } from '../../../types/commonTypes';

type Props = {
  diveNumber: string;
  setDiveNumber: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  tripName: string;
  setTripName: React.Dispatch<React.SetStateAction<string>>;
  diveNumberError: string;
  setDiveNumberError: React.Dispatch<React.SetStateAction<string>>;
  tripNameError: string;
  setTripNameError: React.Dispatch<React.SetStateAction<string>>;
  step: StepType;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
};

export const Overview: FC<Props> = ({
  diveNumber,
  setDiveNumber,
  notes,
  setNotes,
  tripName,
  setTripName,
  diveNumberError,
  setDiveNumberError,
  tripNameError,
  setTripNameError,
  step,
  setStep,
}) => {
  useEffect(() => {
    if (diveNumberError || tripNameError) {
      setStep(1);
    }
  }, [diveNumberError, tripNameError, step]);

  useEffect(() => {
    if (step !== 1) {
      if (!diveNumber.length) {
        setDiveNumberError('fill dive number');
      }
      const notNaN = Number.isNaN(+diveNumber);
      const notInteger = Number.isInteger(diveNumber);

      if (notNaN || notInteger) {
        setDiveNumberError('fill correct number of a dive');
      }

      if (tripName.length <= 3) {
        setTripNameError('fill longer trip name');
      }
    }
  }, [step]);

  if (step !== 1) {
    return null;
  }

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
          value={diveNumber}
          setValue={setDiveNumber}
          height={48}
          error={diveNumberError}
          setError={setDiveNumberError}
        />

        <h3>
          Notes
        </h3>
        <TextArea value={notes} setValue={setNotes} height={126} />

        <h3>
          Trip Name
        </h3>
        <Input
          value={tripName}
          setValue={setTripName}
          height={48}
          error={tripNameError}
          setError={setTripNameError}
        />
      </div>
    </div>
  );
};

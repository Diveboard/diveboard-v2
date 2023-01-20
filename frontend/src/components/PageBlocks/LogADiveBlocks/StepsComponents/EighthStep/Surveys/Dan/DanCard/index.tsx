import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import styles from './styles.module.scss';
import { LogDiveDataContext } from '../../../../../LogDiveData/logDiveContext';
import { StepType } from '../../../../../types/commonTypes';
import MissingItems from './MissingItems';
import { Progress } from '../Progress';
import { Checkbox } from '../../../../../../../CheckBox';

type Props = {
  progress: number
  setStep: React.Dispatch<React.SetStateAction<StepType>>
  isSentToDAN: boolean;
  sendToDAN: boolean;
  setSendTODAN: (val: boolean) => void;
};

export const DanCard: FC<Props> = ({
  progress, setStep, sendToDAN, setSendTODAN, isSentToDAN,
}) => {
  const { getAllStepsData } = useContext(LogDiveDataContext);
  const [missingFields, setMissingFields] = useState([]);
  useEffect(() => {
    const data = getAllStepsData();
    const {
      parameters,
      tanks,
    } = data.secondStep;
    const { gears } = data.seventhStep;
    const missed = [];

    if (!parameters || !parameters.duration) {
      missed.push({
        title: 'Dive duration',
        step: 2,
        text: 'duration of the dive',
        block: 'Profile',
      });
    }

    if (!tanks || !tanks.length) {
      missed.push({
        title: 'Tank used',
        step: 2,
        text: 'type of gas used',
        block: 'Profile',
      });
    }
    if (!gears.length
        || (gears.length >= 1 && !gears.some((gear) => gear.typeOfGear === 'Dive skin' || gear.typeOfGear === 'Wet suit' || gear.typeOfGear === 'Dry Suit'))
    ) {
      missed.push({
        title: 'Kind of suit used',
        step: 7,
        text: 'dive skin, a wet suit or a dry suit item',
        block: 'Gear',
      });
    }
    setMissingFields(missed);
  }, []);

  const missingItemsComponents = missingFields.map((item) => (
    <MissingItems
      key={item.title}
      title={item.title}
      step={item.step}
      text={item.text}
      block={item.block}
      setStep={setStep}
    />
  ));
  useEffect(() => {
    if (progress < 100 || missingFields.length > 0) {
      setSendTODAN(false);
    }
  }, [progress, missingFields]);

  return (
    <div className={styles.card}>

      <div className={styles.topLine} style={{ borderRadius: !missingFields.length || isSentToDAN ? '20px' : '20px 20px 0 0' }}>
        <div className={styles.wrapper}>
          <span className={styles.title}>
            {isSentToDAN
              ? 'The data for this dive has been sent to DAN. Thanks for your cooperation!'
              : 'Mandatory field completion rate:'}
          </span>
          {!isSentToDAN && <Progress progress={progress} /> }
        </div>
        {!isSentToDAN && (
          <div>
            {(progress < 100 || missingFields.length > 0) ? (
              <span className={styles.text}>
                Once all mandatory fields are filled-in you will
                have the ability to send the form to DAN.
              </span>
            ) : (
              <Checkbox name="sendToDan" onChecked={setSendTODAN} checked={sendToDAN}>
                <span className={styles.text}>Send this form to DAN when saving this dive</span>
              </Checkbox>
            )}
          </div>
        )}
      </div>
      {!!missingFields.length && !isSentToDAN && (
      <div className={styles.bottomLine}>
        <span className={styles.title}>Missing fields:</span>
        {missingItemsComponents}
      </div>
      )}
    </div>
  );
};

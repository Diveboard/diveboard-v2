import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import styles from './styles.module.scss';
import { LogDiveDataContext } from '../../../../../LogDiveData/logDiveContext';
import { StepType } from '../../../../../types/commonTypes';
import MissingItems from './MissingItems';
import { Progress } from '../Progress';

type Props = {
  progress: number
  setStep: React.Dispatch<React.SetStateAction<StepType>>
};

export const DanCard: FC<Props> = ({ progress, setStep }) => {
  const { getAllStepsData } = useContext(LogDiveDataContext);
  const [missingFields, setMissingFields] = useState<{
    title: string;
    step: StepType;
    text: string;
    block: string
  }[]>([]);

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

    if (!gears || (gears.length <= 1 && !gears[0].typeOfGear)) {
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

  return (
    <div
      className={styles.card}
    >
      <div className={styles.topLine}>
        <div className={styles.wrapper}>
          <span className={styles.title}>Mandatory field completion rate:</span>
          <Progress progress={progress} />
        </div>

        <span className={styles.text}>
          Once all mandatory fields are filled-in you will
          have the ability to send the form to DAN.
        </span>

      </div>
      <div className={styles.bottomLine}>
        <span className={styles.title}>Missing fields:</span>
        {missingItemsComponents}
      </div>
    </div>
  );
};

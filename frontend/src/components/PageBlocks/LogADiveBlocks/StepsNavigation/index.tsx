import React, { FC } from 'react';
import { Button } from '../../../Buttons/Button';
import { Icon } from '../../../Icons/Icon';
import { StepType } from '../types/commonTypes';
import styles from './styles.module.scss';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<StepType>>
  setStepData: () => void;
  setErrors?: () => boolean
};

export const StepsNavigation: FC<Props> = ({
  setStep,
  setStepData,
  setErrors,
}) => {
  const setPrev = () => {
    setStepData();
    setStep((prevState) => prevState - 1 as StepType);
  };

  const setNext = () => {
    if (!setErrors || !setErrors()) {
      setStepData();
      setStep((prevState) => {
        if (prevState !== 9) {
          return prevState + 1 as StepType;
        }
        return prevState as StepType;
      });
    }
  };

  return (
    <div className={styles.navigationWrapper}>
      <div className={styles.navigation}>

        <Button
          onClick={setPrev}
          height={32}
          width={104}
          borderRadius={30}
          border="none"
          backgroundColor="#F0F6FF"
          disable={false}
        >
          <Icon iconName="left-arrow" />
          <span className={styles.leftBtn}>
            Previous
          </span>
        </Button>

        <Button
          onClick={setNext}
          height={32}
          width={81}
          borderRadius={30}
          border="none"
          backgroundColor="#0059DE"
          disable={false}
        >
          <span className={styles.rightBtn}>
            Next
          </span>
          <Icon iconName="right-arrow" />
        </Button>
      </div>
    </div>
  );
};

import React, { FC } from 'react';
import { StepType } from '../../types/commonTypes';
import styles from '../styles.module.scss';
import { Button } from '../../../../Buttons/Button';
import { Icon } from '../../../../Icons/Icon';

type Props = {
  setStep: React.Dispatch<React.SetStateAction<StepType>>

};
export const DisabledNext: FC<Props> = ({ setStep }) => {
  const setPrev = () => {
    setStep(8);
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

      </div>
    </div>
  );
};

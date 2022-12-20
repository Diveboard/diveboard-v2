import React, { FC } from 'react';
import styles from '../styles.module.scss';
import { StepType } from '../../../../../../types/commonTypes';

type Props = {
  title: string;
  step: StepType;
  text: string;
  block: string
  setStep: React.Dispatch<React.SetStateAction<StepType>>
};

const MissingItems: FC<Props> = ({
  title, step, text, block, setStep,
}) => (
  <div className={styles.item}>
    <span className={styles.subTitle}>
      {title}
      :
      {' '}
    </span>
    <span className={styles.text}>
      please add the
      {' '}
      {text}
      {' '}
      on the '
      <span
        className={styles.toTab}
        onClick={() => {
          setStep(step);
        }}
      >
        {block}
      </span>
      ' tab
    </span>
  </div>
);

export default MissingItems;

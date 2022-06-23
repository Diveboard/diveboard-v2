import React, { FC } from 'react';
import { ScoreType } from '../../../types/commonTypes';
import { Icon } from '../../../../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  scoreName: string;
  score: ScoreType;
  setScore: React.Dispatch<React.SetStateAction<ScoreType>>;
};

export const ScoreRating: FC<Props> = ({ scoreName, score, setScore }) => (
  <div className={styles.score}>
    <span className={styles.name}>
      {scoreName}
    </span>
    <div>

      <span
        className={styles.starItem}
        onClick={() => {
          setScore(1);
        }}
      >
        <Icon
          iconName={score >= 1 ? 'star filled in' : 'star outline'}
          size={20}
        />
      </span>

      <span
        className={styles.starItem}
        onClick={() => { setScore(2); }}
      >
        <Icon
          iconName={score >= 2 ? 'star filled in' : 'star outline'}
          size={20}
        />
      </span>

      <span
        className={styles.starItem}
        onClick={() => { setScore(3); }}
      >
        <Icon
          iconName={score >= 3 ? 'star filled in' : 'star outline'}
          size={20}
        />
      </span>

      <span
        className={styles.starItem}
        onClick={() => { setScore(4); }}
      >
        <Icon
          iconName={score >= 4 ? 'star filled in' : 'star outline'}
          size={20}
        />
      </span>

      <span
        className={styles.starItem}
        onClick={() => { setScore(5); }}
      >
        <Icon
          iconName={score >= 5 ? 'star filled in' : 'star outline'}
          size={20}
        />
      </span>

    </div>
  </div>
);

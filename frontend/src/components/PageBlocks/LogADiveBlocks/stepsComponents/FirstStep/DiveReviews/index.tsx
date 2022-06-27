import React, { FC } from 'react';
import { ScoreRating } from './ScoreRating';
import { ScoreType } from '../../../types/commonTypes';
import styles from './styles.module.scss';
import { Checkbox } from '../../../../../CheckBox';

type Props = {
  overReviewScore: ScoreType;
  setOverReviewScore: React.Dispatch<React.SetStateAction<ScoreType>>;
  diveDifficultyScore: ScoreType;
  setDiveDifficultyScore: React.Dispatch<React.SetStateAction<ScoreType>>;
  marineLifeQualityScore: ScoreType;
  setMarineLifeQualityScore: React.Dispatch<React.SetStateAction<ScoreType>>;
  wreck: boolean;
  setWreck: React.Dispatch<React.SetStateAction<boolean>>;
  bigFish: boolean;
  setBigFish: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DiveReviews: FC<Props> = (
  {
    overReviewScore,
    setOverReviewScore,
    diveDifficultyScore,
    setDiveDifficultyScore,
    marineLifeQualityScore,
    setMarineLifeQualityScore,
    wreck,
    setWreck,
    bigFish,
    setBigFish,
  },
) => (
  <div className={styles.diveReviews}>
    <h2>
      Dive Reviews:
    </h2>

    <div className={styles.scoreWrapper}>
      <ScoreRating
        scoreName="Over review:"
        score={overReviewScore}
        setScore={setOverReviewScore}
      />
      <ScoreRating
        scoreName="Dive difficulty:"
        score={diveDifficultyScore}
        setScore={setDiveDifficultyScore}
      />
      <ScoreRating
        scoreName="Marine life quality:"
        score={marineLifeQualityScore}
        setScore={setMarineLifeQualityScore}
      />
    </div>

    <div className={styles.checkBoxesWrapper}>
      <Checkbox name="wreck" onChecked={setWreck} checked={wreck}>
        Wreck
      </Checkbox>

      <Checkbox name="big fish" onChecked={setBigFish} checked={bigFish}>
        Big fish
      </Checkbox>

    </div>

  </div>
);

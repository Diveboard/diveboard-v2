import React, { FC } from 'react';
import { ScoreRating } from './ScoreRating';
import { ScoreType } from '../../../types/commonTypes';
import styles from './styles.module.scss';
import { Checkbox } from '../../../../../CheckBox';
import { FirstStepType } from '../../../types/stepTypes';

type Props = {
  diveReviews: FirstStepType['diveReviews'];
  setDiveReviews: React.Dispatch<React.SetStateAction<FirstStepType['diveReviews']>>;

};

export const DiveReviews: FC<Props> = (
  {
    diveReviews,
    setDiveReviews,
  },
) => (
  <div className={styles.diveReviews}>
    <h2>
      Dive Reviews:
    </h2>

    <div className={styles.scoreWrapper}>
      <ScoreRating
        scoreName="Over review:"
        score={diveReviews.overReview}
        setScore={
          (value) => {
            setDiveReviews({
              ...diveReviews,
              overReview: value as ScoreType,
            });
          }
        }
      />
      <ScoreRating
        scoreName="Dive difficulty:"
        score={diveReviews.diveDifficulty}
        setScore={
          (value) => {
            setDiveReviews({
              ...diveReviews,
              diveDifficulty: value as ScoreType,
            });
          }
        }
      />
      <ScoreRating
        scoreName="Marine life quality:"
        score={diveReviews.marineLifeQuality}
        setScore={
          (value) => {
            setDiveReviews({
              ...diveReviews,
              marineLifeQuality: value as ScoreType,
            });
          }
        }
      />
    </div>

    <div className={styles.checkBoxesWrapper}>
      <Checkbox
        name="wreck"
        onChecked={
          (value) => {
            setDiveReviews({
              ...diveReviews,
              wreck: value as boolean,
            });
          }
        }
        checked={diveReviews.wreck}
      >
        Wreck
      </Checkbox>

      <Checkbox
        name="big fish"
        checked={diveReviews.bigFish}
        onChecked={
          (value) => {
            setDiveReviews({
              ...diveReviews,
              bigFish: value as boolean,
            });
          }
        }
      >
        Big fish
      </Checkbox>

    </div>

  </div>
);

import React, { FC, useState } from 'react';
import { ScoreRating } from './ScoreRating';
import { ScoreType } from '../../../types/commonTypes';
import styles from './styles.module.scss';
import { Checkbox } from '../../../../../CheckBox';
import { FirstStepType } from '../../../types/stepTypes';
import { setParams } from '../../../LogDiveHelpers/setParams/setParams';

type Props = {
  diveReviews: FirstStepType['diveReviews'];
  setDiveReviews: React.Dispatch<React.SetStateAction<FirstStepType['diveReviews']>>;

};

export const DiveReviews: FC<Props> = (
  {
    diveReviews,
    setDiveReviews,
  },
) => {
  const params = setParams(
    diveReviews,
    setDiveReviews,
  );

  const [isWreck, setIsWreck] = useState(false);
  const [isBigFish, setIsBigFish] = useState(false);

  return (
    <div className={styles.diveReviews}>
      <h2>
        Dive Reviews:
      </h2>

      <div className={styles.scoreWrapper}>
        <ScoreRating
          scoreName="Over review:"
          score={diveReviews.overReview}
          setScore={
            (val) => params('overReview', val as ScoreType)
            }
        />
        <ScoreRating
          scoreName="Dive difficulty:"
          score={diveReviews.diveDifficulty}
          setScore={
            (val) => params('diveDifficulty', val as ScoreType)
          }
        />
        <ScoreRating
          scoreName="Marine life quality:"
          score={diveReviews.marineLifeQuality}
          setScore={
            (val) => params('marineLifeQuality', val as ScoreType)
          }
        />
        {isWreck && (
        <ScoreRating
          scoreName="Wreck:"
          score={diveReviews.wreck}
          setScore={
            (val) => params('wreck', val as ScoreType)
          }
        />
        )}
        {isBigFish && (
        <ScoreRating
          scoreName="Big Fish:"
          score={diveReviews.bigFish}
          setScore={
            (val) => params('bigFish', val as ScoreType)
          }
        />
        )}

      </div>

      <div className={styles.checkBoxesWrapper}>
        <Checkbox
          name="wreck"
          onChecked={
            (val) => setIsWreck(val)
          }
          checked={isWreck}
        >
          Wreck
        </Checkbox>

        <Checkbox
          name="big fish"
          checked={isBigFish}
          onChecked={
            (val) => setIsBigFish(val)
          }
        >
          Big fish
        </Checkbox>
      </div>
    </div>
  );
};

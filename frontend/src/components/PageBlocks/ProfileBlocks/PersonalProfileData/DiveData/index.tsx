import React, { FC } from 'react';
import styles from '../styles.module.scss';
import { Button } from '../../../../Buttons/Button';

type Props = {
  qualification: string;
  diveIn: string;
  divesPublished: string;
  thisYear: string;
  totalUnderwaterTime: string;
  mostDives: string;
  deepestDive: string;
  longestDive: string;
  aboutDiver: string;
};

export const DiveData: FC <Props> = ({
  qualification,
  diveIn,
  divesPublished,
  thisYear,
  totalUnderwaterTime,
  mostDives,
  deepestDive,
  longestDive,
  aboutDiver,
}) => (
  <div className={styles.diveData}>
    <div className={styles.firstBlock}>
      <div>
        <span className={styles.thinText}>
          Qualifications:
          {'  '}
        </span>
        <span className={styles.boldText}>{qualification}</span>
      </div>
      <div>
        <span className={styles.thinText}>
          Dived in:
          {'  '}
        </span>
        <span className={styles.boldText}>{diveIn}</span>
      </div>
      <div>
        <span className={styles.thinText}>
          Dives published:
          {'  '}
        </span>
        <span className={styles.boldText}>{divesPublished}</span>
      </div>
      <div>
        <span className={styles.thinText}>
          This year:
          {'  '}
        </span>
        <span className={styles.boldText}>{thisYear}</span>
      </div>
    </div>
    <div className={styles.secondBlock}>
      <div>
        <span className={styles.thinText}>
          Total Underwater time on Diveboard:
          {'  '}
        </span>
        <span className={styles.boldText}>{totalUnderwaterTime}</span>
      </div>
      <div>
        <span className={styles.thinText}>
          Most dives on Diveboard in:
          {'  '}
        </span>
        <span className={styles.boldText}>{mostDives}</span>
      </div>
      <div>
        <span className={styles.thinText}>
          Deepest Dive:
          {'  '}
        </span>
        <span className={styles.boldText}>{deepestDive}</span>
      </div>
      <div>
        <span className={styles.thinText}>
          Longest Dive:
          {'  '}
        </span>
        <span className={styles.boldText}>{longestDive}</span>
      </div>
    </div>
    <div className={styles.thirdBlock}>
      <span>{aboutDiver}</span>
      <Button
        border="none"
        borderRadius={30}
        backgroundColor="transparent"
        onClick={() => {}}
      >
        <span className={styles.more}>View More</span>
      </Button>
    </div>
  </div>
);

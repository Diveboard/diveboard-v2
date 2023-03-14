import React, { FC, useState } from 'react';
import styles from '../styles.module.scss';
import { Button } from '../../../../Buttons/Button';

export type Stats = {
  qualification?: string;
  diveIn?: string[];
  divesPublished?: number;
  thisYear?: number;
  totalUnderwaterTime?: string;
  mostDives?: string;
  deepestDive?: string;
  longestDive?: string;
};

type Props = {
  stats: Stats,
  aboutDiver: string;
};

export const DiveData: FC <Props> = ({
  stats,
  aboutDiver,
}) => {
  const [isShowNote, setShowMore] = useState(false);
  const MAX_LETTER_ABOUT = 179;

  return (
    <div className={styles.diveData}>
      <div className={styles.firstBlock}>
        {!!stats?.qualification && (
        <div>
          <span className={styles.thinText}>
            Qualifications:
            {'  '}
          </span>
          <span className={styles.boldText}>{stats.qualification}</span>
        </div>
        )}
        {!!stats?.diveIn?.length && (
        <div>
          <span className={styles.thinText}>
            Dived in:
            {'  '}
          </span>
          <span className={styles.boldText}>{stats.diveIn.join(', ')}</span>
        </div>
        )}
        {!!stats?.divesPublished && (
        <div>
          <span className={styles.thinText}>
            Dives published:
            {'  '}
          </span>
          <span className={styles.boldText}>{stats.divesPublished}</span>
        </div>
        )}
        {typeof stats?.thisYear === 'number' && !!stats?.divesPublished && (
        <div>
          <span className={styles.thinText}>
            This year:
            {'  '}
          </span>
          <span className={styles.boldText}>{stats.thisYear}</span>
        </div>
        )}
      </div>
      <div className={styles.secondBlock}>
        {!!stats?.totalUnderwaterTime && (
        <div>
          <span className={styles.thinText}>
            Total Underwater time on Diveboard:
            {'  '}
          </span>
          <span className={styles.boldText}>{stats.totalUnderwaterTime}</span>
        </div>
        )}
        {!!stats?.mostDives && (
        <div>
          <span className={styles.thinText}>
            Most dives on Diveboard in:
            {'  '}
          </span>
          <span className={styles.boldText}>{stats.mostDives}</span>
        </div>
        )}
        {!!stats?.deepestDive && (
        <div>
          <span className={styles.thinText}>
            Deepest Dive:
            {'  '}
          </span>
          <span className={styles.boldText}>{stats.deepestDive}</span>
        </div>
        )}
        {!!stats?.longestDive && (
        <div>
          <span className={styles.thinText}>
            Longest Dive:
            {'  '}
          </span>
          <span className={styles.boldText}>{stats.longestDive}</span>
        </div>
        )}
      </div>
      {!!aboutDiver && (
      <div className={styles.thirdBlock}>
        <span>
          { aboutDiver.length > MAX_LETTER_ABOUT && !isShowNote
            ? aboutDiver.slice(0, MAX_LETTER_ABOUT)
            : aboutDiver}
        </span>
        {aboutDiver.length > MAX_LETTER_ABOUT && (
        <Button
          border="none"
          borderRadius={30}
          backgroundColor="transparent"
          onClick={() => setShowMore(!isShowNote)}
        >
          <span className={styles.more}>{`View ${isShowNote ? 'Less' : 'More'}`}</span>
        </Button>
        )}
      </div>
      )}
    </div>
  );
};

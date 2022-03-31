import React from 'react';
import { Button } from '../../../../Buttons/Button';
import { Icon } from '../../../../Icons/Icon';
import styles from './styles.module.scss';
import { useWindowWidth } from '../../../../../hooks/useWindowWidth';

export const MapBlock = () => {
  const isWidth = useWindowWidth(500, 768);
  return (
    <div className={styles.mapBlockWrapper}>
      <h2 className={styles.title}>Recently added to a Diveboard</h2>
      <p className={styles.text}>
        Log your dives at Diveboard to store them in one place and share your
        experience with others
      </p>

      <div className={styles.mapWrapper}>
        <div className={styles.btnWrapper}>
          <Button
            width={!isWidth ? 208 : 250}
            height={!isWidth ? 56 : 48}
            borderRadius={30}
            border="none"
            backgroundColor="#FDC90D"
            onClick={() => {}}
          >
            <div className={styles.innerBtnWrapper}>
              <Icon iconName="logbook" />
              <span className={styles.btnText}>Log a Dive</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

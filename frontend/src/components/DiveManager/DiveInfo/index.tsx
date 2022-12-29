import React, { FC } from 'react';
import { Icon } from '../../Icons/Icon';
import styles from './styles.module.scss';

type Props = {
  diveTime: number;
  deepness: string;
  diversCount: number;
};

const DiveInfo: FC<Props> = ({ diveTime, deepness, diversCount }) => (
  <div className={styles.dataWrapper}>
    <div className={styles.dataItem}>
      <Icon iconName="time" size={16} />
      <span>
        {diveTime}
        {' '}
        min
      </span>
    </div>
    <div className={styles.dataItem}>
      <Icon iconName="depth" size={16} />
      <span>
        {deepness}
      </span>
    </div>
    <div className={styles.dataItem}>
      <Icon iconName="divers" size={16} />
      <span>
        {diversCount}
        {' '}
        divers
      </span>
    </div>
  </div>
);

export default DiveInfo;

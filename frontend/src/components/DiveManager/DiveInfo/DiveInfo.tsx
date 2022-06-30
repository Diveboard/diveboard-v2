import React, { FC } from 'react';
import { Icon } from '../../Icons/Icon';
import classes from './DiveInfo.module.scss';

type Props = {
  diveTime: number;
  deepness: number;
  diversCount: number;
};

const DiveInfo: FC<Props> = ({ diveTime, deepness, diversCount }) => (
  <div className={classes.dataWrapper}>
    <div className={classes.dataItem}>
      <Icon iconName="time" size={16} />
      <span>{diveTime} min</span>
    </div>
    <div className={classes.dataItem}>
      <Icon iconName="depth" size={16} />
      <span>{deepness} m</span>
    </div>
    <div className={classes.dataItem}>
      <Icon iconName="divers" size={16} />
      <span>{diversCount} divers</span>
    </div>
  </div>
);

export default DiveInfo;

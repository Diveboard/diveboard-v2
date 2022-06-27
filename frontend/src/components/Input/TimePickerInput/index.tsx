import React, { FC } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import styles from './styles.module.scss';

type Props = {
  setTime: (time: string) => void;
};

export const TimePickerInput: FC<Props> = ({ setTime }) => (
  <TimePicker
    onChange={(e) => {
      let time = '';
      if (e) {
        time = `${e.hours()}:${e.minutes()}`;
      }
      setTime(time);
    }}
    showSecond={false}
    placeholder="HH:MM"
    className={styles.timePicker}
    defaultOpenValue={moment([0, 0])}
  />
);

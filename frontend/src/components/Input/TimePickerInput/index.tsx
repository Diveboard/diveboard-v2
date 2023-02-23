import React, { FC } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import styles from './styles.module.scss';

export type Time = {
  hours: number;
  minutes: number;
};

type Props = {
  setTime: (time: Time) => void;
  currentTime: Time;
};

export const TimePickerInput: FC<Props> = ({
  currentTime,
  setTime,
}) => (
  <TimePicker
    value={moment().hours(currentTime.hours).minutes(currentTime.minutes)}
    onChange={(e) => {
      const time = {
        hours: e.hours(),
        minutes: e.minutes(),
      };
      setTime(time);
    }}
    showSecond={false}
    placeholder="HH:MM"
    className={styles.timePicker}
  />

);

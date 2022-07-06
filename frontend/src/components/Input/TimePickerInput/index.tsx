import React, { FC } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import styles from './styles.module.scss';

type Props = {
  setTime: (time: string) => void;
  currentTime: string;
  error:string;
  setError: React.Dispatch<React.SetStateAction<string>>
};

export const TimePickerInput: FC<Props> = ({
  currentTime,
  setTime,
  error,
  setError,
}) => {
  const timeArr = currentTime ? currentTime.split(':') : null;

  const getTimePickerStyle = (errorValue: string) => {
    if (errorValue) {
      return `${styles.timePicker} ${styles.error}`;
    }
    return styles.timePicker;
  };

  return (
    <>
      <TimePicker
        value={timeArr ? moment()
          .hours(+timeArr[0])
          .minutes(+timeArr[1]) : null}
        onChange={(e) => {
          let time = '';
          if (e) {
            time = `${e.hours()}:${e.minutes()}`;
          }
          if (error) {
            setError('');
          }
          setTime(time);
        }}
        showSecond={false}
        placeholder="HH:MM"
        className={getTimePickerStyle(error)}
        // defaultOpenValue={moment([0, 0])}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </>

  );
};

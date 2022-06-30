import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.scss';

type Props = {
  date: Date;
  setDate: (currentDate: Date)=>void
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const DatePickerInput:FC<Props> = ({
  date, setDate, error, setError,
}) => {
  const getDatePickerStyle = (errorValue: string) => {
    if (errorValue) {
      return `${styles.datePicker} ${styles.error}`;
    }
    return styles.datePicker;
  };
  return (
    <>
      <DatePicker
        selected={date}
        onChange={(currentDate: Date) => {
          if (error) {
            setError('');
          }
          setDate(currentDate);
        }}
        placeholderText="dd/mm/yyyy"
        dateFormat="dd/MM/yyyy"
        className={getDatePickerStyle(error)}
        calendarClassName={styles.calender}
        weekDayClassName={() => styles.weekDay}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </>
  );
};

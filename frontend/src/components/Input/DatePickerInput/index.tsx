import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.scss';

type Props = {
  date: Date;
  setDate: (currentDate: Date)=>void
};

export const DatePickerInput:FC<Props> = ({ date, setDate }) => (
  <DatePicker
    selected={date}
    onChange={(currentDate:Date) => setDate(currentDate)}
    placeholderText="dd/mm/yyyy"
    dateFormat="dd/MM/yyyy"
    className={styles.datePicker}
    calendarClassName={styles.calender}
    weekDayClassName={() => styles.weekDay}
  />
);

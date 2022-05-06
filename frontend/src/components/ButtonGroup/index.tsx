import React from 'react';
import styles from './styles.module.scss';

type Props<T> = {
  mode: T;
  setMode: React.Dispatch<React.SetStateAction<T>>;
  special?: boolean;
  buttons: {
    text: string;
    connectedMode: T;
  }[];
};

export const ButtonGroup = <T extends unknown>(
  {
    mode,
    setMode,
    buttons,
    special,
  }: Props<T>): JSX.Element => {
  const buttonComponents = buttons.map((btn) => {
    let btnStyle;
    if (btn.connectedMode === mode) {
      btnStyle = `${styles.btn} ${styles.active}`;
    } else if (special) {
      btnStyle = `${styles.btn} ${styles.notActive} ${styles.specialNotActiveText}`;
    } else {
      btnStyle = `${styles.btn} ${styles.notActive}`;
    }

    return (
      <button
        key={btn.text}
        className={btnStyle}
        onClick={() => {
          setMode(btn.connectedMode);
        }}
      >
        {btn.text}
      </button>
    );
  });
  return (
    <div className={styles.wrapper}>
      {buttonComponents}
    </div>
  );
};

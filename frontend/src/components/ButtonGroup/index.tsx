import React, { useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  special?: boolean;
  defaultChecked?: string
  buttons: {
    text: string;
    connectedMode: string;
  }[];
  onClick: (buttonName: string) => void;
};

export const ButtonGroup = (
  {
    buttons,
    special,
    defaultChecked,
    onClick,
  }: Props,
): JSX.Element => {
  const [mode, setMode] = useState(defaultChecked);

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
          onClick(btn.text);
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

import React from 'react';
import styles from '../styles.module.scss';

type Props = {
  defaultBtnId?: string;
  button: {
    text: string;
    id: string;
  };
  onClick: ({
    text,
    id,
  }) => void;
};

export const Button = ({
  button,
  onClick,
  defaultBtnId,
}: Props): JSX.Element => (
  <button
    className={`${styles.btn} ${button.id === defaultBtnId ? styles.active : styles.notActive}`}
    onClick={() => onClick(button)}
  >
    {button.text}
  </button>
);

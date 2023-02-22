import React, { useEffect, useState } from 'react';
import { ButtonImage } from './ButtonImage';
import styles from './styles.module.scss';

type Props = {
  special?: boolean;
  defaultChecked?: string;
  contentBehavior?: 'scroll' | 'wrap';
  buttons: {
    text: string;
    connectedMode: string;
    imgSrc?: string;
    id?: string;
  }[];
  onClick: (buttonName: string) => void;
};

export const ButtonGroup = ({
  buttons,
  special,
  defaultChecked,
  onClick,
  contentBehavior,
}: Props): JSX.Element => {
  const [mode, setMode] = useState(defaultChecked);

  useEffect(() => {
    setMode(defaultChecked);
  }, [defaultChecked]);

  const buttonComponents = buttons.map((btn, idx) => {
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
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        className={btnStyle}
        onClick={() => {
          if (btn.connectedMode !== 'shops') {
            setMode(btn.connectedMode);
            onClick(btn.connectedMode);
          }
        }}
      >
        {btn.imgSrc ? (
          <div className={styles.withImg}>
            <ButtonImage src={btn.imgSrc} />
            {btn.text}
          </div>
        ) : (
          btn.text
        )}
      </button>
    );
  });

  const wrapperStyle = (behavior: 'scroll' | 'wrap' | undefined) => {
    if (!behavior) {
      return styles.wrapper;
    }
    if (behavior === 'scroll') {
      return styles.scroll;
    }
    if (behavior === 'wrap') {
      return styles.wrap;
    }
  };
  return (
    <div className={wrapperStyle(contentBehavior)}>{buttonComponents}</div>
  );
};

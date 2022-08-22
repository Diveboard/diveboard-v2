import React from 'react';
import styles from '../styles.module.scss';
import { ButtonImage } from '../ButtonImage';

type Props<T> = {
  items: T[];
  onClick: (selected: T) => void
  mode: string[];
  setMode: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ButtonGroupMultiple = <T extends { text: string, imgSrc?: string }>({
  items,
  onClick,
  mode,
  setMode,
}: Props<T>) => {
  const buttons = items.map((btn) => {
    const style = mode.includes(btn.text) ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.notActive}`;

    return (
      <button
        key={btn.text}
        className={style}
        onClick={() => {
          setMode((prev) => {
            if (prev.includes(btn.text)) {
              return prev.filter((item) => item !== btn.text);
            }
            return [...prev, btn.text];
          });
          onClick(btn);
        }}
      >
        {btn.imgSrc ? (
          <div className={styles.withImg}>
            <ButtonImage src={btn.imgSrc} />
            {btn.text}
          </div>
        ) : btn.text}

      </button>
    );
  });

  return (
    <div className={styles.wrap}>
      {buttons}
    </div>
  );
};

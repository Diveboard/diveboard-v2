import React from 'react';
import { ButtonImage } from '../ButtonImage';
import styles from '../styles.module.scss';

type Props<T> = {
  items: T[];
  onClick: (selected: T) => void
  mode?: string[];
  setMode?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ButtonGroupMultiple = <T extends { name: string, imgSrc?: string }>({
  items,
  onClick,
  mode,
  setMode,
}: Props<T>) => {
  const buttons = items.map((btn) => {
    // eslint-disable-next-line no-nested-ternary
    const style = !mode
      ? `${styles.btn} ${styles.notActive}`
      : mode.includes(btn.name) ? `${styles.btn} ${styles.active}` : `${styles.btn} ${styles.notActive}`;

    return (
      <button
        key={btn.name}
        className={style}
        onClick={() => {
          setMode && setMode((prev) => {
            if (prev.includes(btn.name)) {
              return prev.filter((item) => item !== btn.name);
            }
            return [...prev, btn.name];
          });
          onClick(btn);
        }}
      >
        {btn.imgSrc ? (
          <div className={styles.withImg}>
            <ButtonImage src={btn.imgSrc} />
            {btn.name}
          </div>
        ) : btn.name}

      </button>
    );
  });

  return (
    <div className={styles.wrap}>
      {buttons}
    </div>
  );
};

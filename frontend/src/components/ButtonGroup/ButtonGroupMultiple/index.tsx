import React from 'react';
import { ButtonImage } from '../ButtonImage';
import styles from '../styles.module.scss';

type Props<T> = {
  items: T[];
  onClick: (selected: T) => void
  mode?: 'selected' | 'searched';
};

export const ButtonGroupMultiple = <T extends { name: string, photoUrl?: string }>({
  items,
  onClick,
  mode = 'searched',
}: Props<T>) => {
  const buttons = items.map((btn) => {
    const style = `${styles.btn} ${mode === 'searched' ? styles.notActive : styles.active}`;

    return (
      <button
        key={btn.name}
        className={style}
        onClick={() => onClick(btn)}
      >
        {btn.photoUrl ? (
          <div className={styles.withImg}>
            <ButtonImage src={btn.photoUrl} />
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

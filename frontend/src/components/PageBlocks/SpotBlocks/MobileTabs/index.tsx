import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  mode: 'info' | 'dives' | 'shops';
  setMode: React.Dispatch<React.SetStateAction<'info' | 'dives' | 'shops'>>
};

export const MobileTabs: FC<Props> = ({
  mode,
  setMode,
}) => {
  const setItemStyle = (itemName: typeof mode, currentMode: typeof mode) => {
    if (itemName === currentMode) {
      return `${styles.panelItem} ${styles.activePanel}`;
    }
    return `${styles.panelItem} ${styles.notActivePanel}`;
  };

  return (
    <div className={styles.tabsPanel}>
      <div
        className={setItemStyle('info', mode)}
        onClick={() => { setMode('info'); }}
      >
        Info
      </div>
      <div
        className={setItemStyle('dives', mode)}
        onClick={() => { setMode('dives'); }}
      >
        Dives
      </div>
      <div
        className={setItemStyle('shops', mode)}
        onClick={() => { setMode('shops'); }}
      >
        Shops
      </div>
    </div>
  );
};

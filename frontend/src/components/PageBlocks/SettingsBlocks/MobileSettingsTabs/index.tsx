import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  mode: 'personal info' | 'preferences' | 'notifications';
  setMode: React.Dispatch<React.SetStateAction<'personal info' | 'preferences' | 'notifications'>>
};

export const MobileSettingsTabs: FC<Props> = ({
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
        className={setItemStyle('personal info', mode)}
        onClick={() => { setMode('personal info'); }}
      >
        Personal Info
      </div>
      <div
        className={setItemStyle('preferences', mode)}
        onClick={() => { setMode('preferences'); }}
      >
        Preferences
      </div>
      <div
        className={setItemStyle('notifications', mode)}
        onClick={() => { setMode('notifications'); }}
      >
        Notifications
      </div>
    </div>
  );
};

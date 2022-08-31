import React, { FC, useMemo, useState } from 'react';

type EditContextType = {
  editedSettings: { settingsBlock: string, settingsItem: string },
  setEditedSettings:
  React.Dispatch<React.SetStateAction<{ settingsBlock: string, settingsItem: string }>>
};

export const EditContext = React.createContext<EditContextType>(undefined);
export const EditContextWrapper: FC = ({ children }) => {
  const [settings, setSettings] = useState({
    settingsBlock: '',
    settingsItem: '',
  });

  // console.log({ settings });

  const contextValue = {
    editedSettings: settings,
    setEditedSettings: setSettings,
  };

  const memoizedValue = useMemo(() => contextValue, [settings, setSettings]);

  return (
    <EditContext.Provider value={memoizedValue}>
      {children}
    </EditContext.Provider>
  );
};

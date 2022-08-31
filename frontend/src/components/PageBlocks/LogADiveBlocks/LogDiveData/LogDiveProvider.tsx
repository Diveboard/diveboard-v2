import React, { FC } from 'react';
import { LogDiveDataContext } from './logDiveContext';
import { UseDiveData } from './useDiveData';

export const LogDiveProvider: FC = ({ children }) => {
  const diveControllers = UseDiveData();

  return (
    <LogDiveDataContext.Provider value={diveControllers}>
      {children}
    </LogDiveDataContext.Provider>
  );
};

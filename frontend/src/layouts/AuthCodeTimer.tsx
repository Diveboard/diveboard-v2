import React, { createContext, FC, useState } from 'react';

export const AuthCodeContext = createContext<
[boolean, React.Dispatch<React.SetStateAction<boolean>>]
>(
  undefined,
);

export const AuthCodeTimer: FC = ({ children }) => {
  const availableState = useState(true);
  const [available, setAvailable] = availableState;
  const startTimer = () => {
    if (!available) {
      setTimeout(() => {
        setAvailable(true);
      }, 5000 * 60);
    }
  };
  startTimer();

  return (
    <AuthCodeContext.Provider value={availableState}>
      {children}
    </AuthCodeContext.Provider>
  );
};

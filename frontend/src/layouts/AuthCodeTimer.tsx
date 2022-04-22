import React, {
  createContext, FC, useEffect, useMemo, useState,
} from 'react';

type ContextType = {
  availableCode: boolean,
  setExpiresTime: React.Dispatch<React.SetStateAction<number>>
};

export const AuthCodeContext = createContext<ContextType>(
  undefined,
);

export const AuthCodeTimer: FC = ({ children }) => {
  const [expires, setExpiresTime] = useState<number | null>(null);
  const [availableCode, setAvailableCode] = useState(true);

  useEffect(() => {
    if (expires) {
      setAvailableCode(false);
      const timerId = setInterval(() => {
        const currentTime = Date.now();
        if (expires < currentTime) {
          setAvailableCode(true);
          setExpiresTime(null);
          clearInterval(timerId);
        }
      }, 5000);
    }
  }, [expires]);

  const authMemoizedState = useMemo(() => ({
    availableCode,
    setExpiresTime,
  }), [expires, availableCode]);

  return (
    <AuthCodeContext.Provider value={authMemoizedState}>
      {children}
    </AuthCodeContext.Provider>
  );
};

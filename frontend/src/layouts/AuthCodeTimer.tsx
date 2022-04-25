import React, {
  createContext, FC, useEffect, useMemo, useRef, useState,
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
  const timerId = useRef< NodeJS.Timer>(null);

  useEffect(() => {
    if (expires) {
      setAvailableCode(false);
      timerId.current = setInterval(() => {
        const currentTime = Date.now();
        if (expires < currentTime) {
          setAvailableCode(true);
          setExpiresTime(null);
          clearInterval(timerId.current);
        }
      }, 5000);
    } else {
      clearInterval(timerId.current);
      setAvailableCode(true);
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

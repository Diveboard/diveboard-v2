import React, {
  createContext, FC, useEffect, useState,
} from 'react';

export const NetworkStatusContext = createContext<boolean>(
  undefined,
);

export const NetworkStatus: FC = ({ children }) => {
  const [isOffline, setIsOffline] = useState(true);

  const networkOfflineHandler = () => {
    setIsOffline(true);
  };

  const networkOnlineHandler = () => {
    setIsOffline(false);
  };

  useEffect(() => {
    setIsOffline(!navigator.onLine);
  }, []);

  useEffect(() => {
    window.addEventListener('offline', networkOfflineHandler);
    window.addEventListener('online', networkOnlineHandler);
    return () => {
      window.removeEventListener('offline', networkOfflineHandler);
      window.removeEventListener('online', networkOnlineHandler);
    };
  }, []);

  return (
    <NetworkStatusContext.Provider value={isOffline}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

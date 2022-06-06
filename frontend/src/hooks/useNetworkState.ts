import React, { useEffect } from 'react';

export const useNetworkState = (
  setIsOffline: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const networkOfflineHandler = () => {
    setIsOffline(true);
  };
  const networkOnlineHandler = () => {
    setIsOffline(false);
  };

  useEffect(() => {
    if (!navigator.onLine) {
      setIsOffline(true);
    } else {
      setIsOffline(false);
    }

    window.addEventListener('offline', networkOfflineHandler);
    window.addEventListener('online', networkOnlineHandler);
    return () => {
      window.removeEventListener('offline', networkOfflineHandler);
      window.removeEventListener('online', networkOnlineHandler);
    };
  }, []);
};

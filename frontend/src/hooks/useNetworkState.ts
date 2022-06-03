import React, { useEffect } from 'react';

export const useNetworkState = (
  isOffline: boolean,
  setIsOffline: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const networkStateHandler = () => {
    setIsOffline(!isOffline);
  };

  useEffect(() => {
    window.addEventListener('offline', networkStateHandler);
    window.addEventListener('online', networkStateHandler);
    return () => {
      window.removeEventListener('offline', networkStateHandler);
      window.removeEventListener('online', networkStateHandler);
    };
  }, []);
};

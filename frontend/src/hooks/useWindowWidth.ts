import { useEffect, useState } from 'react';

export const useWindowWidth = (ms: number, maxWidth: number) => {
  const [isWidth, setIsWidth] = useState(false);
  const [width, setWidth] = useState(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.outerWidth);
    }
    setIsWidth(window.outerWidth < maxWidth);

    let timeoutId: NodeJS.Timeout;
    const delay = async (msDelay: number): Promise<void> => {
      await new Promise<void>((resolve) => {
        timeoutId = setTimeout(() => {
          resolve();
        }, msDelay);
      });
    };

    const setDelayedWidth = async () => {
      await delay(ms);
      setIsWidth(window.outerWidth < maxWidth);
    };

    window.addEventListener('resize', setDelayedWidth);
    return () => {
      window.removeEventListener('resize', setDelayedWidth);
      clearTimeout(timeoutId);
    };
  }, [width]);

  return isWidth;
};

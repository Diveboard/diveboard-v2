import { useLayoutEffect, useState } from 'react';

export const useWindowWidthNumber = (ms: number) => {
  const [width, setWidth] = useState<number>();

  useLayoutEffect(() => {
    setWidth(window.innerWidth);

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
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', setDelayedWidth);
    return () => {
      window.removeEventListener('resize', setDelayedWidth);
      clearTimeout(timeoutId);
    };
  }, []);

  return width;
};

import { useEffect, useState } from "react";

export const useWindowWidth = (ms: number, maxWidth: number) => {
  const [isWidth, setIsWidth] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const delay = async (ms: number): Promise<void> => {
      await new Promise<void>((resolve) => {
        timeoutId = setTimeout(() => {
          resolve();
        }, ms);
      });
    };

    const setDelayedWidth = async () => {
      if (typeof window !== undefined) {
        await delay(ms);
        setIsWidth(window.innerWidth < maxWidth);
      }
    };

    window.addEventListener("resize", setDelayedWidth);
    return () => {
      window.removeEventListener("resize", setDelayedWidth);
      clearTimeout(timeoutId);
    };
  }, []);

  return isWidth;
};

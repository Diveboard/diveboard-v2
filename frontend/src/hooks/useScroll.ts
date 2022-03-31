import { useEffect, useState } from 'react';

export const useScroll = (startOffset: number): { scrolled: boolean } => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const delay = async (ms: number): Promise<void> => {
      await new Promise<void>((resolve) => {
        timeoutId = setTimeout(() => {
          resolve();
        }, ms);
      });
    };

    const checkPageYOffset = async (): Promise<void> => {
      await delay(100);
      const currentPosition = window.pageYOffset;
      setIsScrolled(currentPosition > startOffset);
    };
    window.addEventListener('scroll', checkPageYOffset);
    return () => {
      window.removeEventListener('scroll', checkPageYOffset);
      clearTimeout(timeoutId);
    };
  }, []);

  return { scrolled: isScrolled };
};

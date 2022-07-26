import React, { useEffect, useRef } from 'react';

export const useDebounce = (
  value: string,
  callback: React.Dispatch<React.SetStateAction<string>>,
  ms: number,
) => {
  const mounted = useRef(false);
  const startDebounce = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      const id = setTimeout(async () => {
        await callback(value);
      }, ms);
      return () => {
        clearTimeout(id);
      };
    }
  }, [value]);

  useEffect(() => {

  }, [startDebounce.current]);
};

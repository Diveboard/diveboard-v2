import { useEffect, useState } from 'react';

export const useDebounced = (value, ms) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, ms);
      return () => {
        clearTimeout(handler);
      };
    },
    [value],
  );
  return debouncedValue;
};

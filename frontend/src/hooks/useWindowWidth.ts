import { useEffect, useState } from "react";

export const useWindowWidth = (): number => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== undefined) {
      setWidth(window.innerWidth);
    }
  });

  return width;
};

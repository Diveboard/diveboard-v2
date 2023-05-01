import React, {
  FC, useMemo, useState,
} from 'react';
import { SpotType } from '../firebase/firestore/models';

type SpotsContextType = {
  spotsData: Array<SpotType>;
  setSpotsData: (val: Array<SpotType>) => void;
};

export const SpotsContext = React.createContext<SpotsContextType>(undefined);

export const SpotsLayout: FC = ({ children }) => {
  const [spotsPoints, setSpotsPoints] = useState<Array<SpotType>>(undefined);
  const spotsMemoizedState = useMemo(() => ({
    spotsData: spotsPoints,
    setSpotsData: setSpotsPoints,
  }), [spotsPoints, setSpotsPoints]);
  return (
    <SpotsContext.Provider
      value={spotsMemoizedState}
    >
      {children}
    </SpotsContext.Provider>
  );
};

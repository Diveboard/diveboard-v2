import { createContext } from 'react';
import { UseDiveData } from './useDiveData';

type ContextType = ReturnType<typeof UseDiveData> ;

export const LogDiveDataContext = createContext<ContextType>(
  undefined,
);

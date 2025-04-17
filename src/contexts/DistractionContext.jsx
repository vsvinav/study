import React, { createContext, useContext } from 'react';
import { useDistraction } from '../hooks/useDistraction';
import { useTimerContext } from './TimerContext';

const DistractionContext = createContext();

export function DistractionProvider({ children }) {
  const { running } = useTimerContext();
  const distraction = useDistraction(running);
  return (
    <DistractionContext.Provider value={distraction}>
      {children}
    </DistractionContext.Provider>
  );
}

export const useDistractionContext = () => {
  return useContext(DistractionContext);
};
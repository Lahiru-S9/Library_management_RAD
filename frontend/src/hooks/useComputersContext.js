import { useContext } from 'react';
import { ComputerContext } from '../context/ComputerContext';

export const useComputerContext = () => {
    const context = useContext(ComputerContext);

    if (!context) {
      throw new Error('usecomputerContext must be used within a ComputerContextProvider');
    }
  
    return context;
}

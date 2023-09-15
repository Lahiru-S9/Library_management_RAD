import { useContext } from 'react';
import { ComputerContext } from '../context/ComputerContext';

export const useComputersContext = () => {
    const context = useContext(ComputerContext);

    if (!context) {
      throw new Error('useComputerContext must be used within a ComputerContextProvider');
    }
  
    return context;
}

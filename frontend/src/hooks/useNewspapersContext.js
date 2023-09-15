import { useContext } from 'react';
import { NewspaperContext } from '../context/NewspaperContext';

export const useNewspapersContext = () => {
    const context = useContext(NewspaperContext);

    if (!context) {
      throw new Error('useNewspaperContext must be used within a NewspaperContextProvider');
    }
  
    return context;
}

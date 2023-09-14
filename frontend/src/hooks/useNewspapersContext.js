import { useContext } from 'react';
import { NewspaperContext } from '../context/NewspaperContext';

export const useNewspaperContext = () => {
    const context = useContext(NewspaperContext);

    if (!context) {
      throw new Error('usenewspaperContext must be used within a NewspaperContextProvider');
    }
  
    return context;
}

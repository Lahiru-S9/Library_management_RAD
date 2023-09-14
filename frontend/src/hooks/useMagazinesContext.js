import { useContext } from 'react';
import { MagazineContext } from '../context/MagazineContext';

export const useMagazineContext = () => {
    const context = useContext(MagazineContext);

    if (!context) {
      throw new Error('usemagazineContext must be used within a MagazineContextProvider');
    }
  
    return context;
}

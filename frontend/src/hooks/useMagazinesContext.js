import { useContext } from 'react';
import { MagazineContext } from '../context/MagazineContext';

export const useMagazinesContext = () => {
    const context = useContext(MagazineContext);

    if (!context) {
      throw new Error('useMagazineContext must be used within a MagazineContextProvider');
    }
  
    return context;
}

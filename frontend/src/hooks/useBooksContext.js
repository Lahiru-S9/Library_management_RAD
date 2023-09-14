import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

export const useBooksContext = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error('useBooksContext must be used within a BookContextProvider');
  }

  return context;
}

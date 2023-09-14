import { createContext, useReducer } from 'react';

export const NewspaperContext = createContext();

export const newspaperReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWSPAPERS':
      return {
        newspapers: action.payload,
      };
    case 'CREATE_NEWSPAPER':
      return {
        newspapers: [...state.newspapers, action.payload],
      };
    case 'DELETE_NEWSPAPER':
      return {
        newspapers: state.newspapers.filter((newspaper) => newspaper._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const NewspaperContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newspaperReducer, {
    newspapers: [],
  });

  return (
    <NewspaperContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NewspaperContext.Provider>
  );
};

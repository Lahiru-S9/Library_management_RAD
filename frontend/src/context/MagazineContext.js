import { createContext, useReducer } from 'react';

export const MagazineContext = createContext();

export const magazineReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MAGAZINES':
      return {
        magazines: action.payload,
      };
    case 'CREATE_MAGAZINE':
      return {
        magazines: [...state.magazines, action.payload],
      };
    case 'DELETE_MAGAZINE':
      return {
        magazines: state.magazines.filter((magazine) => magazine._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const MagazineContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(magazineReducer, {
    magazines: [],
  });

  return (
    <MagazineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MagazineContext.Provider>
  );
};

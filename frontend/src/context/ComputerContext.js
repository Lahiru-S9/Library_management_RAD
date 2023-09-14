import { createContext, useReducer } from 'react';

export const ComputerContext = createContext();

export const computerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMPUTERS':
      return {
        computers: action.payload,
      };
    case 'CREATE_COMPUTER':
      return {
        computers: [...state.computers, action.payload],
      };
    case 'DELETE_COMPUTER':
      return {
        computers: state.computers.filter((computer) => computer._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ComputerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(computerReducer, {
    computers: [],
  });

  return (
    <ComputerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ComputerContext.Provider>
  );
};

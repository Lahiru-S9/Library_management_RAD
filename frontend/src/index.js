import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BookContextProvider } from './context/BookContext';
import { MagazineContextProvider } from './context/MagazineContext'; // Import the MagazineContextProvider
import { ComputerContextProvider } from './context/ComputerContext'; // Import the ComputerContextProvider
import { NewspaperContextProvider } from './context/NewspaperContext'; // Import the NewspaperContextProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
    <BookContextProvider>
      <MagazineContextProvider> {/* Add MagazineContextProvider */}
        <ComputerContextProvider> {/* Add ComputerContextProvider */}
          <NewspaperContextProvider> {/* Add NewspaperContextProvider */}
            <App />
          </NewspaperContextProvider>
        </ComputerContextProvider>
      </MagazineContextProvider>
    </BookContextProvider>
  </AuthContextProvider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


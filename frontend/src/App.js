import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Header from "./components/Header";
import AddBook from "./components/addBook";
import AllBooks from './components/AllBooks';
import AddMagazine from './components/addMagazine'; // Import AddMagazine
import AllMagazines from './components/AllMagazines'; // Import AllMagazines
import AddComputer from './components/addComputer'; // Import AddComputer
import AllComputers from './components/AllComputers'; // Import AllComputers
import AddNewspaper from './components/addNewspaper'; // Import AddNewspaper
import AllNewspapers from './components/AllNewspapers'; // Import AllNewspapers
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="/add" element={<AddBook />} />
          <Route
            path="/books"
            element={user ? <AllBooks /> : <Navigate to="/login" />}
          />

          {/* Add routes for magazines */}
          <Route path="/add-magazine" element={<AddMagazine />} />
          <Route
            path="/magazines"
            element={user ? <AllMagazines /> : <Navigate to="/login" />}
          />

          {/* Add routes for computers */}
          <Route path="/add-computer" element={<AddComputer />} />
          <Route
            path="/computers"
            element={user ? <AllComputers /> : <Navigate to="/login" />}
          />

          {/* Add routes for newspapers */}
          <Route path="/add-newspaper" element={<AddNewspaper />} />
          <Route
            path="/newspapers"
            element={user ? <AllNewspapers /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Header from "./components/Header";
import AddBook from "./components/addBook";
import AllBooks from './components/AllBooks';
import { BrowserRouter as Router, Route ,Routes ,Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";


function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div>
        <Header/>
        <Routes>  
          <Route path="/" 
          element={user ? <Home /> : <Navigate to="/login"/>}
          />
          <Route path="/login" 
          element={!user ? <Login/>: <Navigate to="/"/>}
          /> 
          <Route path="/signup"
          element={!user ? <SignUp/>: <Navigate to="/"/>}
          />
          <Route path ="/add" element={<AddBook/>} />
          <Route path="/books" 
          element={user ? <AllBooks /> : <Navigate to="/login"/>}
          />
        </Routes>
        
     </div>
    </Router>
  );
}

export default App;

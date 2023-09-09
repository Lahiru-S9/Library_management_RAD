import './App.css';
import Login from './components/login';
import Header from "./components/Header";
import AddBook from "./components/addBook";
import AllBooks from './components/AllBooks';
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>  
          <Route path="/login" element={<Login/>}/> 
          <Route path ="/add" element={<AddBook/>} />
          <Route path="/books" element={<AllBooks/>} />
        </Routes>
        
     </div>
    </Router>
  );
}

export default App;

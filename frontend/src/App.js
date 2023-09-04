import './App.css';
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
          <Route path ="/add" element={<AddBook/>} />
          <Route path="/" element={<AllBooks/>} />
        </Routes>
        
     </div>
    </Router>
  );
}

export default App;

import CounterClass from "./components/CounterClass";
import CounterFunction from "./components/CounterFunction";
import Header from "./components/Header";
import AddBook from "./components/addBook";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
        <Route path ="/add" element={<AddBook/>} />
        </Routes>
        
     </div>
    </Router>
  );
}

export default App;

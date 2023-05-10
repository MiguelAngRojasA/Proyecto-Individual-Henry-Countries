import { Home, Landing, Detail, Form, FormEdit,About,ErrorMessage} from "./views/index.js";
import { NavBar } from "./components/index.js";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

function App() { 
  const location = useLocation(); 

  return (
    <div className="App">
    {location.pathname === "/" ? null : (
        <NavBar/>
      )}
      <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/detail/:id" element={<Detail/>}></Route>
        <Route path="/create" element={<Form/>}></Route>
        <Route path="/edit" element={<FormEdit/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="*" element={<ErrorMessage errorMessage="PageNotFound"/>} />
      </Routes>
    </div>
  );
}

export default App;



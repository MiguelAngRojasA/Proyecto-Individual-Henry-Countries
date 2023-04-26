import { Home, Landing, Detail, Form } from "./views/index.js";
import { NavBar } from "./components/index.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  const location = useLocation();

function logout() {   
    navigate("/");
  }
function onSearch(){
  
}  

  return (
    <div className="App">
    {location.pathname === "/" ? null : (
        <NavBar logout={logout} onSearch={onSearch} />
      )}
      <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/detail" element={<Detail/>}></Route>
        <Route path="/create" element={<Form/>}></Route>
      </Routes>
    </div>
  );
}

export default App;


//onSearch={onSearch} 
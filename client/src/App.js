import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

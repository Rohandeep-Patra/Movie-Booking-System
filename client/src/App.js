import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useSelector } from "react-redux";

function App() {
  const {loading} = useSelector((state) => state.loaders)
  return (
    <>
      {loading && 
      <div className=" fixed bg-black inset-0 opacity-90 flex justify-center items-center z-50">
        <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin ">
        </div>
      </div>}
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

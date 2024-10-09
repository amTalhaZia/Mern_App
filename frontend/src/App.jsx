import { Route, Routes } from "react-router-dom"; 
import Login from "./components/Login/login.jsx";
import ProtectedRoute from "./components/Protected/ProtectedRoute.jsx";
import Register from "./components/register/Register.jsx";
import House from "./House.jsx";

const App = () => {
  return (
    <div>
      <h1>heey</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/"  
          element={
              <ProtectedRoute>
                 <House/>
              </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

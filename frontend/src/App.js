import { Router, Route, Routes, Switch, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./Pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={user ? <Dashboard /> : <Login />} />
          <Route exact path="/signup" element={user ? <Navigate to="/login" /> : <Signup />} />
          <Route exact path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          <Route exact path="/messenger" element={ <Messenger />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

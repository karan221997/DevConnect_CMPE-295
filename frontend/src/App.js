import { Router, Route, Routes, Switch, BrowserRouter, Navigate } from "react-router-dom";
import QA from "../src/components/QA/QA";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/qa" element={<QA />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

          {/* <Route exact path="/" element={user ? <Dashboard /> : <Login />} />
          <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route exact path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          <Route exact path="/qa" element={<QA />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

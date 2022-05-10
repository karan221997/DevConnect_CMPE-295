import {
  Router,
  Route,
  Routes,
  Switch,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { useContext } from "react";
import Landing from "./Pages/landing/Landing";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./Pages/messenger/Messenger";
import CreatePost from "./components/CreatePost/CreatePost";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
             <Route
            exact
            path="/"
            element={<Landing/>}
          />
          <Route
            exact
            path="/login"
            element={ user ? <Navigate to="/dashboard" /> : <Login />}         />
          <Route
            exact
            path="/signup"
            element={user ? <Navigate to="/login" /> : <Signup />}
          />
          <Route
            exact
            path="/dashboard"
            element={user ?<Dashboard/>:<Navigate to="/login" />}
          />
          <Route exact path="/messenger" element={<Messenger />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, Routes, Switch, BrowserRouter } from "react-router-dom";
import QA from "../src/components/QA/QA";
import Dashboard from "../src/components/Dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/qa" element={<QA />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

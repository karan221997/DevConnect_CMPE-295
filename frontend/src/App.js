import logo from './logo.svg';
import './App.css';
import { Router, Route, Routes, Switch, BrowserRouter } from 'react-router-dom';
import QA from '../src/components/QA/QA'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
            <Route exact path='/qa' element={<QA />} />
            </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

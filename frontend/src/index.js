import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from "./context/AuthContext"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20,400,0,-25" />
      <App />
    </AuthContextProvider>
 
);


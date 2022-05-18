import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from "./context/AuthContext"

//removing strict mode for now
// </React.StrictMode>
//original code
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
 //    <React.StrictMode>
//     <AuthContextProvider>
//       <App />
//     </AuthContextProvider>
 //    </React.StrictMode>
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
 
);


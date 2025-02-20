import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Router>
      <AuthContextProvider>
         <App />
      </AuthContextProvider>
   </Router>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
//  external import
import { BrowserRouter } from 'react-router-dom';
//  internal imports
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../css/base.css';
import '../css/layout.css';
import '../css/tarjeta-producto.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

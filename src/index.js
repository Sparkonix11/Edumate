import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import '../node_modules/@mdi/font/css/materialdesignicons.min.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../node_modules/materialize-css/dist/js/materialize.min.js';
import './styles/styles.scss';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  
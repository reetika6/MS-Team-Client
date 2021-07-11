import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { ContextProvider } from './SocketContext';
import './index.css';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>,
    document.getElementById('root')
);



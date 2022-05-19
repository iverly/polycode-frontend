import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthentificationProvider from './contexts/auth';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'simplebar/src/simplebar.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <CssBaseline />
    <SnackbarProvider>
      <AuthentificationProvider>
        <App />
      </AuthentificationProvider>
    </SnackbarProvider>
  </BrowserRouter>,
);

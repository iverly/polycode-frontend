import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UserProvider from './contexts/user';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <CssBaseline />
    <SnackbarProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SnackbarProvider>
  </BrowserRouter>,
);

import '@radix-ui/themes/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Theme>
    <RouterProvider router={router} />
  </Theme>,
);

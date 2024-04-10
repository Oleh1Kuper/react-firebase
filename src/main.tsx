import '@fontsource-variable/montserrat';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import 'react-toastify/dist/ReactToastify.css';
import '@radix-ui/themes/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>,
);

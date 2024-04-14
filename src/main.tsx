import '@radix-ui/themes/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Provider } from 'react-redux';
import store from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </Provider>,
);

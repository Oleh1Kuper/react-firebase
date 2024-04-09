import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './pages/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);

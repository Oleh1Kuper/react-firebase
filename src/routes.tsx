import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ApplyJob from './pages/ApplyJob';
import Profile from './pages/user/profile/Profile';
import PostJob from './pages/user/postedJobs/PostedJobs';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'apply-job', element: <ApplyJob /> },
      { path: 'profile', element: <Profile /> },
      { path: 'posted-jobs', element: <PostJob /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
]);

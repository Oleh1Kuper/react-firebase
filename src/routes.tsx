import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ApplyJob from './pages/ApplyJob';
import Profile from './pages/Profile';
import PostJob from './pages/PostedJobs';
import EditJob from './pages/EditJob';
import AllJobs from './pages/AllJobs';
import AllUsers from './pages/AllUsers';
import JobDescription from './pages/JobDescription';
import NotificationsPage from './pages/NotificationsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'applied-jobs', element: <ApplyJob /> },
      { path: 'profile/:id', element: <Profile /> },
      { path: 'posted-jobs', element: <PostJob /> },
      { path: 'posted-jobs/new', element: <EditJob /> },
      { path: 'posted-jobs/edit/:id', element: <EditJob /> },
      { path: 'admin/jobs', element: <AllJobs /> },
      { path: 'admin/users', element: <AllUsers /> },
      { path: 'job-description/:id', element: <JobDescription /> },
      { path: 'notifications', element: <NotificationsPage /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
]);

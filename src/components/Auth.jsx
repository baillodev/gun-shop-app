import React from 'react';
import { useUser } from '../contexts/userContext';
import { Navigate, Outlet } from 'react-router-dom';

const Auth = ({ roleRequired }) => {
  const { currentUser, loading } = useUser();

  if (loading) {
    return null; // Ou un spinner
  }

  if (currentUser) {
    if (roleRequired === 'admin' && currentUser.role !== 'admin') {
      return <Navigate to="/store" replace />;
    }
    if (roleRequired === 'user' && currentUser.role !== 'user') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  if (!currentUser || (roleRequired && currentUser.role !== roleRequired)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Auth;

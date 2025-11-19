import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute() {
  const {user} = useSelector((state) => state.userSlice);
  if (!user) {
    return <Navigate to="/account" replace />; // redirect to login page
  }

  return <Outlet />;
}

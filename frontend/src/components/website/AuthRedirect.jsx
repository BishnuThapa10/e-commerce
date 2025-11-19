import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

export default function AuthRedirect() {
  const { user } = useSelector((state) => state.userSlice);

  if(user) {
    return <Navigate to="/" replace />; // redirect to homepage (or dashboard)
  }

  return <Outlet />;
}

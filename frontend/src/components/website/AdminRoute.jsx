import React from 'react'
import { getAutUser } from '../../lib/auth.js';
import { Navigate, Outlet } from 'react-router';

export default function AdminRoute() {
  const auth = getAutUser();

  if (!auth) return <Navigate to="/account" replace />;
  if (auth?.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}

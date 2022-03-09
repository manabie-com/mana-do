import Loading from 'components/Loading';
import React from 'react';
import { RouteProps, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../auth';

const ProtectedRoute = (props: RouteProps) => {
  const { token, isLoading, error } = useAuth();
  if (isLoading) return <Loading />;
  if (!token || error) return <Navigate to="/" />;
  return <Outlet />;
};
export default ProtectedRoute;

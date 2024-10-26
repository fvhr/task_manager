import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

interface ProtectedRouteProps {
  children: React.ReactNode; 
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated  } = useAuth(); 

  if (!isAuthenticated ) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
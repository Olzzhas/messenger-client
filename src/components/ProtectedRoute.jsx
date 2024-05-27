import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
   const { user, userLoading } = useContext(AuthContext);

   if (userLoading) {
      return console.log('Loading...');
   }

   return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

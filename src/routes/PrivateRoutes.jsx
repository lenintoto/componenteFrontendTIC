import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return auth && auth.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
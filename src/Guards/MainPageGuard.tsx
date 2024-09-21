import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const  MainPageGuard = ({ children }: { children: ReactNode }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

   if (token) {
    return <Navigate to="/user/parcel/storage" replace />;
  }

 
  return <>{children}</>;
};

export default  MainPageGuard  ;
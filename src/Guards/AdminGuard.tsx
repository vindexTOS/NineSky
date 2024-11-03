import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const AdminAuthGuard= ({ children }: { children: ReactNode }) => {
  const cookies = new Cookies();
  const token = cookies.get('admin-token');
  
   if (!token) {
    return <Navigate to="/" replace />;
  }

 
  return <>{children}</>;
};

export default AdminAuthGuard ;
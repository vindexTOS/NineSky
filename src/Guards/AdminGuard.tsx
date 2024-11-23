import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode"
const AdminAuthGuard= ({ children }: { children: ReactNode }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  
  const [decoded,setDecoded] = React.useState<any>()


  const decode = () =>{
      
    if(token){
       const decodedToken = jwt_decode(token)
      //  console.log( decodedToken )
       setDecoded(decodedToken )
    }
  }


  React.useEffect(()=>{
   decode()
  },[ ])

   if (!token ) {
    return <Navigate to="/" replace />;
  }

 if(  decoded && decoded.accessLevel  ==  3){
  return <>{children}</>;
 } 

};

export default AdminAuthGuard ;
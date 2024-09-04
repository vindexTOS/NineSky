import React, { ReactNode } from "react";
import NonAuthNavBar from "./components/navbar/NonAuthNavBar";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/forms/auth-forms/LoginForm";
import { useLocation } from "react-router-dom";
import AuthNavBar from "./components/navbar/AuthNavBar";

export default function LayOut({ children }: { children: ReactNode }) {
  const location  =useLocation()
  return (
    <main className="flex flex-col h-100">
      
      {location.pathname === "/user" ? <AuthNavBar/> : <NonAuthNavBar />}
     
       
      <div> {children}</div>

      <Footer />
    </main>
  );
}

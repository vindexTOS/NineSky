import   { ReactNode, useEffect } from "react";
 
import Footer from "./components/footer/Footer";
 
import NavBar from "./components/navbar/NavBar";

export default function LayOut({ children }: { children: ReactNode }) {
 
  return (
    <main className="   main">
      
      {/* {location.pathname.includes('/user')  ? <AuthNavBar/> : location.pathname.includes('/admin') ? '' : <NonAuthNavBar />} */}
      <NavBar/>
       
      <div> {children}</div>
 <Footer />
    </main>
  );
}

import React from "react";
// import BackGroundImage from "../../assets/background.jpg";
import BackGroundImage from "../../assets/background.webp";
import Calculator from "./Calculator";
import Header from "./Header";
import Contacts from "./Contacts";
export default function EnteryPage() {
  return (
    <main className="md:h-[100vh] pt-[5rem] md:pt-50 bg-no-repeat bg-cover bg-center">
      
      <div
        className="w-full  md:h-[100vh] bg-no-repeat bg-center flex  items-end justify-start md:px-20"
        style={{
          backgroundImage: `url(${BackGroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

 <div   className="w-[100%] h-[90%]  items-center flex  justify-between " >
      <div className="  w-[100%] gap-50      justify-between flex flex-col  py-6     ">
      <div></div>  <Header />
 
        <div className="flex  items-end justify-end     py-6 gap-6   ">
        <Calculator />
        </div>
      </div>
      </div>

        </div> 
  
    </main>
  );
}

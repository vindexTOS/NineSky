import React from "react";
// import BackGroundImage from "../../assets/background.jpg";
// import BackGroundImage from "../../assets/background.webp";
// import BackGroundImage from "../../assets/whitemap.jpg";
// import BackGroundImage from "../../assets/Darkmap.jpg";
// import BackGroundImage from "../../assets/particleWorld.jpg";
import BackGroundImage from "../../assets/skytwo.jpg";

import Calculator from "./Calculator";
import Header from "./Header";
import Contacts from "./Contacts";
import Particals from "../../components/particals/Particals";
export default function EnteryPage() {
  return (
    <main className="md:h-[100vh] pt-[5rem] md:pt-50 bg-no-repeat bg-cover bg-center entery">
      <div
        className="w-full  md:h-[100vh] bg-no-repeat bg-center flex  items-end justify-start md:px-20"
        style={{
          backgroundImage: `url(${BackGroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
       <Particals/>

 <div   className="w-[100%] h-[90%]  items-center flex  justify-between " >
      <div className="  w-[100%] gap-50  max_smm:items-center   max_smm:mt-10 max_smm:gap-[3rem]   justify-between flex flex-col  py-6     ">
      
      <Header />
        <div className="flex  items-end justify-end  max_smm:w-[100%]   max_smm:items-center   max_smm:justify-center   py-6 gap-6   ">
        <Calculator />
        </div>
      </div>
      </div>

        </div> 
  
    </main>
  );
}

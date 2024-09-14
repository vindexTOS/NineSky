// src/Footer.js
import React from 'react';
import { EnvironmentOutlined ,  FacebookOutlined} from '@ant-design/icons'; // Import the correct Ant Design location icon
import { IoMdPhonePortrait } from "react-icons/io";
import { SlPhone } from "react-icons/sl";
import { FaFacebook } from "react-icons/fa";
import StaticMapComponent from './Map';
import { MdOutlineEmail } from "react-icons/md";
import { FaTelegram } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
 const Footer = () => {
  const location  =useLocation()

  return (
  <> { !location.pathname.includes('/admin')  && <footer style={{zIndex:1000}} className="bg-gray-800 text-white py-10 ">
    <div className="  max_smm:gap-10  flex md:flex-row flex-col  items-center justify-between px-20  w-[100%]    ">
      {/* Map Component */}
      <div className=" flex  flex-col gap-5  text-center">
          <div className="flex items-center justify-center ">
            <EnvironmentOutlined className="text-2xl mr-2" />
            <span className="text-lg">
              თბილისი, ფონიჭალა lll მ/რ, კ13
            </span>
          </div>
          <div className="" >
            <StaticMapComponent />
          </div>
        </div>
        {/* mid */}
        <div>
      2024 ©NineSky. All rights reserved. 
      </div>
      {/* Contact Information */}
  <div>      
     <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <ul className="list-none space-y-2 mb-4">
          <li className="text-lg flex items-center justify-around gap-2"> <IoMdPhonePortrait /> +995 510 10 10 85</li>
          <li className="text-lg flex items-center justify-around gap-2"> <SlPhone /> (+003) 275 05 77</li>
          <li className="text-lg flex items-center justify-around gap-2"> <MdOutlineEmail />  info@ninesky.ge</li>
        </ul>
        <div className="flex justify-center gap-2   items-center flex">
        <a href="https://t.me/your-telegram-handle" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
        <FaTelegram  className='text-[2.2rem] text-blue-300 ' />
                </a>
                <a href="https://facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook" >
                <FaFacebook className='text-[2rem] text-blue-400 ' />   
                   </a>
        </div>
        </div>
 
      </div>
 
  </footer>}</> 
  );
};

export default Footer;

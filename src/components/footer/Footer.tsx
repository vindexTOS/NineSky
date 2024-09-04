// src/Footer.js
import React from 'react';
import { EnvironmentOutlined ,  FacebookOutlined} from '@ant-design/icons'; // Import the correct Ant Design location icon
import TelegramLogo from "../../assets/Telegram_logo.svg.webp"
import FacebookLogo from "../../assets/Facebook-logo.png"
import StaticMapComponent from './Map';
 const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 ">
    <div className="   flex md:flex-row flex-col  items-center justify-between px-20  w-[100%]    ">
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
      {/* Contact Information */}
  <div>       <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <ul className="list-none space-y-2 mb-4">
          <li className="text-lg">+995 510 10 10 85</li>
          <li className="text-lg">info@ninesky.ge</li>
        </ul>
        <div className="flex justify-center gap-2   items-center flex">
        <a href="https://t.me/your-telegram-handle" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <img className="w-[30px] h-[30px] mt-[1px]" src={TelegramLogo} />
                </a>
                <a href="https://facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook" >
                <FacebookOutlined style={{ fontSize: '33px', color: 'white' }} />              </a>
        </div></div>
 
      </div>
 
  </footer>
  );
};

export default Footer;

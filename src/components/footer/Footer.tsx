import React from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';
import { IoMdPhonePortrait } from "react-icons/io";
import { SlPhone } from "react-icons/sl";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import StaticMapComponent from './Map';
import { MdOutlineEmail } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes('/admin') && (
        <footer style={{ zIndex: 1000 }} className="bg-gray-900 text-white py-12">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 px-6 md:px-20">
            {/* Map Section */}
            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left w-full md:w-1/3">
              <div className="flex items-center text-xl font-semibold">
                <EnvironmentOutlined className="text-3xl mr-3 text-blue-400" />
                <span>თბილისი, ფონიჭალა lll მ/რ, კ13</span>
              </div>
              <div className="w-full h-48 rounded-lg overflow-hidden shadow-lg">
                <StaticMapComponent />
              </div>
            </div>

            {/* Middle Section */}
            <div className="text-center w-full md:w-1/3">
              <p className="text-lg font-light">2024 © NineSky. All rights reserved.</p>
            </div>

            {/* Contact Information Section */}
            <div className="flex flex-col items-center md:items-end gap-5 w-full md:w-1/3">
              <h2 className="text-2xl font-bold mb-2">დაგვიკავშირდით</h2>
              <ul className="list-none space-y-3">
                <li className="text-lg flex items-center gap-3">
                  <IoMdPhonePortrait className="text-2xl text-blue-400" />
                  +995 510 10 10 85
                </li>
                <li className="text-lg flex items-center gap-3">
                  <SlPhone className="text-2xl text-green-400" />
                  (+003) 275 05 77
                </li>
                <li className="text-lg flex items-center gap-3">
                  <MdOutlineEmail className="text-2xl text-yellow-400" />
                  info@ninesky.ge
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://t.me/your-telegram-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="transform hover:scale-110 transition duration-300"
                >
                  <FaTelegram className="text-3xl text-blue-300 hover:text-blue-500" />
                </a>
                <a
                  href="https://facebook.com/your-facebook-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transform hover:scale-110 transition duration-300"
                >
                  <FaFacebook className="text-3xl text-blue-400 hover:text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;

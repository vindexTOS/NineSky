import React, { useEffect, useState } from 'react'
 
import TelegramLogo from "../../assets/Telegram_logo.svg.webp"
import FacebookLogo from "../../assets/Facebook-logo.png"
export default function Contaxts() {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      
      const timer = setTimeout(() => setIsVisible(true), 100); // Delay to ensure the page has loaded
      return () => clearTimeout(timer);
    }, []);
  return (
    <div className={`p-8 bg-white/85 bottom-[-18rem] w-[90%] md:w-[500px] absolute md:rounded-[40px]   gap-2 items-center flex flex-col  text-center ${isVisible ? 'fade-in-up' : ''}`}>
      <h1 className="text-[2rem] font-bold text-blue-500 mb-6 text-shadow-lg">
        <span className={isVisible ? 'slide-in-left' : ''}> კონტაქტი</span>
      </h1>
      <div className={`text- text-gray-500  text-start ${isVisible ? 'fade-in-up' : ''}`}>
      <ul className="list-disc pl-6 space-y-2 text-[1.6rem]">
    <li>
      +995 510 10 10 85
    </li>
    <li>
     info@ninesky.ge
    </li>
   
  </ul>
   
      </div>
      <div className="flex  ">
                <a href="https://t.me/your-telegram-handle" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <img className="w-[50px] h-[50px]" src={TelegramLogo} />
                </a>
                <a href="https://facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img className="w-[80px] h-[50px]" src={ FacebookLogo} />
                </a>
            </div>
    </div>
  )
}

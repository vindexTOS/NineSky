import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { GetPrice } from '../../API/Price/PriceManagment';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [prices, setPrices] = useState<any>(null);

  const { data } = useQuery({
    queryKey: ['parcels-price'],
    queryFn: () => GetPrice(),
  });

  useEffect(() => {
    if (data?.data) {
      console.log(data.data);
      setPrices(data.data);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); // Delay to ensure the page has loaded
    return () => clearTimeout(timer);
  }, []);

  return (  
    <div
      style={{ zIndex: 100 }}
      className={`bg-gradient-to-br from-[#2fb9ff]/90 to-blue-800/80 text-white shadow-lg rounded-2xl mt-5 p-6 w-full md:w-[500px] max-w-[95%] items-center flex flex-col text-center transition-all duration-700 ease-in-out transform ${
        isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}
    >
      {/* Header Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-wide">
        <span className={`${isVisible ? 'animate-slideInLeft' : ''}`}>
          ამანათები ჩინეთიდან და თურქეთიდან
        </span>
      </h1>

      {/* Company Description */}
      <div
        className={`text-white/90 text-start transition-opacity duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-center font-medium text-base md:text-lg mb-4">
          კომპანია NineSky ანხორციელებს ამანათების და პირადი გზავნილების საჰაერო და სახმელეთო გზით ტრანსპორტირებას ჩინეთიდან და თურქეთიდან საქართველოში.
        </p>

        {/* Pricing List */}
        <div className="bg-white/10 p-3 rounded-xl shadow-inner border border-white/20">
  <ul className="list-none space-y-3 text-sm md:text-base">
    <li className="flex items-start md:items-center gap-2">
      <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse mt-[3px]"></span>
      <div className="flex justify-between w-full">
        <span className="font-medium text-[14px]">ჩინეთიდან საჰაერო გზით ტრანსპორტირება 1კგ:  <span className="text-yellow-400 font-bold ml-4">
          {prices && prices['China'] ? `$${prices['China']}` : '$9.85'}
        </span></span>
       
      </div>
    </li>
    <li className="flex items-start md:items-center gap-2">
      <span className="inline-block w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse mt-[3px]"></span>
      <div className="flex justify-between w-full">
        <span className="font-medium text-[14px]">თურქეთიდან სახმელეთო გზით ტრანსპორტირების საფასური 1კგ: <span className="text-teal-400 font-bold ml-4">
          {prices && prices['Turkey'] ? `$${prices['Turkey']}` : '$3'}
        </span></span>
        
      </div>
    </li>
    <li className="flex items-start md:items-center gap-2">
      <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse mt-[3px]"></span>
      <div className="flex justify-between w-full">
        <span className="font-medium">ჩვენი მისამართი:   <span className="ml-4">თბილისი, ფონიჭალა III მ/რ, კ13</span></span>
      
      </div>
    </li>
    <li className="flex items-start md:items-center gap-2">
      <span className="inline-block w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse mt-[3px]"></span>
      <div className="flex justify-between w-full">
        <span className="font-medium">ტელ:      <span className="ml-4">(+003) 275 05 77</span></span>
   
      </div>
    </li>
  </ul>
</div>
      </div>
    </div>
  );
}

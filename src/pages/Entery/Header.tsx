import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { GetPrice } from '../../API/Price/PriceManagment';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [prices, setPrices] = useState<any>(null);

  const { data, refetch } = useQuery({
    queryKey: ['parcels-price'],
    queryFn: () => GetPrice(),
  
  });

  useEffect(() => {
    if (data?.data) {
      console.log(data.data)
      setPrices(data.data);
    }
  }, [data]);
  useEffect(() => {
    
    const timer = setTimeout(() => setIsVisible(true), 100); // Delay to ensure the page has loaded
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{zIndex:100}} className={` bg-white/95  header   shadow-lg  max_smm:rounded-[5px]  max_smm:p-10  md:rounded-[20px] md:p-8  md:w-[500px] w-[95%]   items-center flex flex-col  text-center ${isVisible ? 'fade-in-up' : ''}`}>
      <h1 className="text-[1.5rem] font-bold text-blue-500 mb-6 text-shadow-lg">
        <span className={isVisible ? 'slide-in-left' : ''}> ამანათები ჩინეთიდან და თურქეთიდან</span>
      </h1>
  
      <div className={`text- text-gray-500  text-start ${isVisible ? 'fade-in-up' : ''}`}>
    <p className='text-center font-bold'> კომპანია nine sky ანხორციელებს ამანათების და პირადი გზავნილების საჰაერო და სახმელეთო გზით ტრანსპორტირებას ჩინეთიდან და თურქეთიდან საქართველოში</p> 

    <ul className="list-disc pl-6 space-y-2">
    <li>
      ჩინეთიდან საჰაერო გზით ტრანსპორტირება 1კგ  {prices && prices['China'] ? <p>${prices['China']}</p> : <p>'$9.85'</p> }
    </li>
    {/* <li>
      ჩინეთიდან სახმელეთო გზით 1კგ $4.50
    </li> */}
    <li>
      თურქეთიდან სახმელეთო გზით ტრანსპორტირების საფასური 1კგ  {prices && prices['Turkey'] ? <p>${prices['Turkey']}</p> : <p>'$3'</p> }
    </li>
    {/* <li>
      თურქეთიდან 19კგ ან მეტი წონის ამანათი $1.50
    </li> */}
    <li>
      ჩვენი მისამართი: თბილისი, ფონიჭალა lll მ/რ, კ13
    </li>
    <li>
      ტელ:(+003) 275 05 77
    </li>
  </ul>
      </div>
    </div>
  );
}
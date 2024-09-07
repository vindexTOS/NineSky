import React, { useEffect, useState } from 'react';

export default function Calculator() {
  const [selectedCountry, setSelectedCountry] = useState('china');
  const [weight, setWeight] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [girth, setGirth] = useState('');
  const [price, setPrice] = useState<any>(null);

  const handleCalculate = () => {
  
    const calculatedPrice = (parseFloat(weight) + parseFloat(width) + parseFloat(height) + parseFloat(girth)) * 0.1;
    setPrice(calculatedPrice.toFixed(2));
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => setIsVisible(true), 500); // Delay to ensure the page has loaded
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{zIndex:100}} className={`p-8 md:mb-40   max_smm:rounded-[5px]  max_smm:p-10  bg-white/95 md:rounded-[50px] shadow-lg w-[540px]   max_smm:w-[95%]    flex flex-col justify-between ${isVisible ? 'fade-in-up' : ''}`}>
      <h2 className="text-lg text-blue-500 font-semibold   text-center">ფასის გამოთვლა</h2>
      
      <div className="mb-4">
        <label htmlFor="country" className="block text-xs font-medium text-gray-700 mb-2">ქვეყანა</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="block w-full px-2 py-1 border border-gray-300 rounded-[40px] shadow-sm text-xs"
        >
          <option value="china">ჩინეთი</option>
          <option value="china">ჩინეთი-საჰაერო</option>
          <option value="turkey">თურქეთი</option>
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2 mb-2 md:flex-row flex-col">
          <div className="flex-1">
            <label htmlFor="weight" className="block text-xs font-medium text-gray-700">წონა (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="block w-full px-2 py-1 border border-gray-300  rounded-[40px] shadow-sm text-xs"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="width" className="block text-xs font-medium text-gray-700">სიგრძე (cm)</label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="block w-full px-2 py-1 border border-gray-300 rounded-[40px]  shadow-sm text-xs"
            />
          </div>
      

       
          <div className="flex-1">
            <label htmlFor="height" className="block text-xs font-medium text-gray-700">სიმაღლე (cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="block w-full px-2 py-1 border border-gray-300  rounded-[40px] shadow-sm text-xs"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="girth" className="block text-xs font-medium text-gray-700">სიგანე (cm)</label>
            <input
              type="number"
              id="girth"
              value={girth}
              onChange={(e) => setGirth(e.target.value)}
              className="block w-full px-2 py-1 border border-gray-300 rounded-[40px] shadow-sm text-xs"
            />
       </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 rounded-[40px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
      >
  გამოთვლა
      </button>

      {price !== null && (
        <div className="mt-4 text-center text-lg font-semibold">
         გამოთვილი ფასი: <span className="text-blue-600">${price}</span>
        </div>
      )}
    </div>
  );
}
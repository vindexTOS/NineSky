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
    <div
      style={{ zIndex: 100 }}
      className={`bg-gradient-to-br from-[#2fb9ff]/90 to-blue-800/80 text-white p-6 md:mb-40 rounded-2xl shadow-lg w-full md:w-[480px] max-w-[95%] flex flex-col justify-between transition-all duration-700 ease-in-out transform ${
        isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}
    >
      <h2 className="text-xl text-center font-bold mb-6">ფასის გამოთვლა</h2>

      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium mb-2 text-white/90">
          ქვეყანა
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2fb9ff] rounded-full text-sm shadow-md bg-white text-gray-700"
        >
          <option value="china" className="text-black">ჩინეთი</option>
          <option value="china-air" className="text-black">ჩინეთი-საჰაერო</option>
          <option value="turkey" className="text-black">თურქეთი</option>
        </select>
      </div>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="weight" className="block text-sm font-medium text-white/90 mb-1">წონა (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2fb9ff] rounded-full text-sm shadow-md bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="width" className="block text-sm font-medium text-white/90 mb-1">სიგრძე (cm)</label>
          <input
            type="number"
            id="width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2fb9ff] rounded-full text-sm shadow-md bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="height" className="block text-sm font-medium text-white/90 mb-1">სიმაღლე (cm)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2fb9ff] rounded-full text-sm shadow-md bg-white text-gray-700 placeholder-gray-400"
          />
        </div>

        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="girth" className="block text-sm font-medium text-white/90 mb-1">სიგანე (cm)</label>
          <input
            type="number"
            id="girth"
            value={girth}
            onChange={(e) => setGirth(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2fb9ff] rounded-full text-sm shadow-md bg-white text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full bg-white text-[#2fb9ff] py-2 rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#2fb9ff] transition-all duration-300 text-sm font-semibold shadow-lg"
      >
        გამოთვლა
      </button>

      {price !== null && (
        <div className="mt-6 text-center text-xl font-bold">
          გამოთვლილი ფასი: <span className="text-yellow-400">${price}</span>
        </div>
      )}
    </div>
  );
}

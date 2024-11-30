import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { GetPrice } from '../../API/Price/PriceManagment';

export default function Calculator() {
  const [selectedCountry, setSelectedCountry] = useState('China');
  const [weight, setWeight] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [girth, setGirth] = useState('');
  const [price, setPrice] = useState<any>(null);
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
    const timer = setTimeout(() => setIsVisible(true), 500); // Delay to ensure the page has loaded
    return () => clearTimeout(timer);
  }, []);

  const handleCalculate = () => {
    if (!prices) {
      alert('Prices not loaded yet, please try again later.');
      return;
    }
  
    const weightValue = parseFloat(weight);
    const widthValue = parseFloat(width);
    const heightValue = parseFloat(height);
    const girthValue = parseFloat(girth);
  
    if (isNaN(weightValue) || isNaN(widthValue) || isNaN(heightValue) || isNaN(girthValue)) {
      alert('Please enter valid numeric values for all inputs.');
      return;
    }
  
    // Price per kg for the selected country
    const countryPricePerKg = parseFloat(prices[selectedCountry]);
  
    if (!countryPricePerKg) {
      alert('Price data for the selected country is not available.');
      return;
    }
  
    // Calculate the dimensional weight
    const dimensionalWeight = (widthValue * heightValue * girthValue) / 5000; // Divisor can vary based on the standard
  
    // Use the greater value between actual weight and dimensional weight
    const applicableWeight = Math.max(weightValue, dimensionalWeight);
  
    // Base price calculation using the applicable weight and country-specific price per kg
    let calculatedPrice = applicableWeight * countryPricePerKg;
  
    // Add surcharges if the package is oversized
    const oversizeSurcharge = 10.0; // Arbitrary surcharge value for oversize items
  
    if (widthValue > 100 || heightValue > 100 || girthValue > 100) {
      calculatedPrice += oversizeSurcharge;
    }
  
    setPrice(calculatedPrice.toFixed(2));
  };

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
          <option value="China" className="text-black">ჩინეთი</option>
          <option value="Turkey" className="text-black">თურქეთი</option>
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

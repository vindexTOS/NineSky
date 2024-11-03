import React, { useEffect, useState } from 'react';
import { GetUserInfo } from '../../API/User/GetRequests';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export default function Address() {
  const [userInfo, setUserInfo] = useState<any>();
  const [decodedUser, setDecodedUser] = useState<any>(null);
  const cookies = new Cookies();
  const [selectedCountry, setSelectedCountry] = useState<'china' | 'turkey'>('china');
  const [infoData, setInfoData] = useState<any>();

  const decodeCookie = () => {
    const token = cookies.get("token");
    if (token) {
      const decoded = jwt_decode(token);
      setDecodedUser(decoded);
    }
  };

  useEffect(() => {
    decodeCookie();
  }, []);

  useEffect(() => {
    if (decodedUser && decodedUser.sub) {
      const fetchData = async () => {
        const data: any = await GetUserInfo(decodedUser.sub);
        setUserInfo({ ...decodedUser, ...data?.data });
      };
      fetchData();
    }
  }, [decodedUser]);

  useEffect(() => {
    if (userInfo && userInfo.first_name) {
      console.log("POWER")
      const addresses = {
        china: {
          "First Name":userInfo.first_name,
          "Last Name": userInfo.last_name,
          "Province": "GuangDong Province / 广东省",
          "City": "Guangzhou City / 广州",
          "Street": "Liuhua Street / 流花街",
          "Address": `${userInfo.sub.slice(0.8)}/广州市越秀区站前路/${userInfo.sub.slice(0.8)}//195号广安服装城首层A16`,
          "TEL": "18124204729",
          "ZIP": "510010"
        },
        turkey: {
          "First Name": decodedUser.first_name,
          "Last Name": decodedUser.last_name,
          "Province": "Trabzon",
          "District": "Ortahisar",
          "Street": "Liuhua Street / 流花街",
          "Address": `${userInfo.sub.slice(0.8)} PELİTLİ ŞELALE SOKAK DOĞUKAN KUAFÖR ${userInfo.sub.slice(0.8)}`,
          "ZIP": "19711"
        }
      };
      console.log(addresses)
      setInfoData(addresses);
    }
  }, [  userInfo]);

  const handleCountrySwitch = (country: 'china' | 'turkey') => {
    console.log(infoData)
    setSelectedCountry(country);
  };

  return (
    <section className="p-4">
    <div className="mb-4">
      <button
        className={`px-6 py-3 mr-4 rounded text-lg ${selectedCountry === 'china' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        onClick={() => handleCountrySwitch('china')}
      >
        ჩინეთი
      </button>
      <button
        className={`px-6 py-3 rounded text-lg ${selectedCountry === 'turkey' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        onClick={() => handleCountrySwitch('turkey')}
      >
        თურქეთი
      </button>
    </div>
  
    <div className="border rounded p-4 bg-gray-50" style={{ minHeight: '200px' }}>
      {infoData && (
        <div className="flex flex-col">
          {Object.entries(infoData[selectedCountry]).map(([key, value]: any) => (
            <div key={key} className="mb-2 flex justify-between">
              <strong>{key}:</strong>
              <span>{value}</span>
            </div>
          ))}
          {/* Ensure space for the other fields, even if not used */}
          {selectedCountry === 'turkey' && (
            <>
              <div className="mb-2 flex justify-between">
                <strong>District:</strong>
                <span>—</span> {/* Placeholder for consistent height */}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  </section>
  );
}

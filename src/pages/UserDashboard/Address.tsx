import React, { useEffect, useState } from 'react';
import { GetUserInfo } from '../../API/User/GetRequests';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

export default function Address() {
  const [userInfo, setUserInfo] = useState<any>();
  const [decodedUser, setDecodedUser] = useState<any>(null);
  const cookies = new Cookies();
  const [selectedCountry, setSelectedCountry] = useState<'china' | 'turkey'>('china');
  const [infoData, setInfoData] = useState<any>();

  const decodeCookie = () => {
    const token = cookies.get('token');
    if (token) {
      const decoded = jwt_decode(token);
      setDecodedUser(decoded);
    }
  };

  useEffect(() => {
    decodeCookie();
  }, []);

  useEffect(() => {
    // console.log(decodedUser)

    if (decodedUser && decodedUser.sub) {
      const fetchData = async () => {
        const data: any = await GetUserInfo( );
        // console.log(data)
        setUserInfo({ ...decodedUser, ...data?.data });
      };
      fetchData();
    }
  }, [decodedUser]);

  useEffect(() => {
    // console.log(userInfo)
    if (userInfo && userInfo.userDetails.first_name) {
      const addresses = {
        china: {
          'First Name': userInfo.userDetailsfirst_name,
          'Last Name': userInfo.userDetails.last_name,
          'Province': 'GuangDong Province / 广东省',
          'City': 'Guangzhou City / 广州',
          'Street': 'Liuhua Street / 流花街',
          'Address': `${userInfo.sub}/广州市越秀区站前路/${userInfo.sub}//195号广安服装城首层A16`,
          'TEL': '18124204729',
          'ZIP': '510010'
        },
        turkey: {
          'First Name': userInfo.userDetails.first_name,
          'Last Name': userInfo.userDetails.last_name,
          'Province': 'Trabzon',
          'District': 'Ortahisar',
          'Street': 'Liuhua Street / 流花街',
          'Address': `${userInfo.sub} PELİTLİ ŞELALE SOKAK DOĞUKAN KUAFÖR ${userInfo.sub}`,
          'TEL': '559131313',
          'ZIP': '19711'
        }
      };
      setInfoData(addresses);
    }
  }, [userInfo]);

  const handleCountrySwitch = (country: 'china' | 'turkey') => {
    setSelectedCountry(country);
  };

  return (
    <section className="p-8">
      <div className="flex justify-center mb-8">
        <button
          className={`px-10 py-4 mx-4 rounded-lg text-xl transition-all duration-300 transform ${
            selectedCountry === 'china'
                 ? 'bg-blue-400 text-white shadow-lg scale-105'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleCountrySwitch('china')}
        >
        ჩინეთი
        </button>
        <button
          className={`px-10 py-4 mx-4 rounded-lg text-xl transition-all duration-300 transform ${
            selectedCountry === 'turkey'
                  ? 'bg-blue-400 text-white shadow-lg scale-105'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => handleCountrySwitch('turkey')}
        >
         თურქეთი
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-8 rounded-lg border border-gray-200 shadow-xl bg-white bg-opacity-80 backdrop-blur-lg transition-all duration-300">
        {infoData && infoData[selectedCountry] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(infoData[selectedCountry]).map(([key, value]: any) => (
              <div key={key} className="flex flex-col mb-4 border-b pb-4">
                <span className="text-lg font-semibold text-gray-700 mb-2">{key}:</span>
                <span className="text-xl font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

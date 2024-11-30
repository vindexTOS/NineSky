import React, { useEffect, useState } from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import { GetUserInfo } from '../../API/User/GetRequests';

export default function AuthNavBar() {
  const [userInfo, setUserInfo] = useState<any>();
  const [decodedUser, setDecodedUser] = useState<any>(null);
  const cookies = new Cookies();

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
    if (decodedUser && decodedUser.sub) {
      const fetchUserInfo = async () => {
        const data: any = await GetUserInfo();
        setUserInfo({ ...decodedUser, ...data?.data });
      };
      fetchUserInfo();
    }
  }, [decodedUser]);

  if (userInfo?.email && decodedUser.accessLevel <= 0) {
    return (
      <nav className="w-full bg-[#2fb9ff] fixed top-0 left-0 h-[70px] md:h-[95px] flex items-center justify-between px-4 md:px-10 lg:px-60 z-100">
        <div>
          <h1 className="text-white text-xl md:text-2xl font-bold hidden md:flex">NineSky</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-[70px] md:w-[120px] h-[34px] bg-white rounded-[12px] py-2 md:py-[25px] flex items-center justify-center flex-col">
            <h1 className="text-gray-500 text-[10px] md:text-[12px]">ბალანსი</h1>
            <p className="text-green-800 text-[10px] md:text-[14px]">${userInfo.balance}</p>
          </div>

          <Avatar className="hidden md:flex" size="large" icon={<UserOutlined />} />
          <div className="flex flex-col">
            <h1 className="text-white font-semibold text-[10px] md:text-lg">{userInfo.email}</h1>
            <h1 className="text-red-500 text-[10px] md:text-sm">ID: {userInfo.id}</h1>
          </div>

          {/* Logout Button */}
          {/* Uncomment the below button for Logout functionality */}
          {/* <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            className="ml-2 md:ml-4 w-[3rem] h-[1.2rem] md:w-[6rem] md:h-[2rem] text-[8px] md:text-[10px]"
          >
            Logout
          </Button> */}
        </div>
      </nav>
    );
  }
  return null;
}

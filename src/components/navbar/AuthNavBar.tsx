import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Avatar } from "antd";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode"
import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../API/User/GetRequests';
export default function AuthNavBar() {
  const [userInfo,setUserInfo] = useState<any>()
  const cookies = new Cookies()



useEffect(()=>{
  let token = cookies.get("token")
  const decode = async () =>{
    let decodedUser = await jwt_decode(token)
    console.log(decodedUser )
    setUserInfo(decodedUser)
  }

 decode()

},[])
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["user-info", userInfo ? userInfo.sub : null],
  queryFn: () => userInfo ? GetUserInfo(userInfo.sub) : Promise.resolve(),
  enabled: !!userInfo 
});

  if(isLoading){
    return <div>Loading...</div>
  }


 if(userInfo?.username){

  return (
    <nav style={{zIndex:1000}} className="md:w-full w-[100vw] bg-[#2fb9ff]    lg:px-60  fixed top-0 left-0 h-[95px] flex items-center justify-between px-10 z-100">
    <div>
      <h1 className="text-white text-2xl font-bold  md:flex hidden">NineSky</h1>
    </div>
    <div className="flex items-center space-x-4">
    <div className="md:w-[120px] md:h-[34px] w-[90px] bg-white rounded-[8px]   flex items-center justify-center flex-col "> 

       <h1 className="text-gray-500 md:text-[12px] text-[10px]" >გადასახდელი</h1>
       <p className=" text-green-800 text-[10px] md:text-[14px]">${ data.data.amount_to_paid}</p>
    </div>
 
      <Avatar  className="md:flex hidden" size="large" icon={<UserOutlined />} />
      <div className="flex flex-col">
        <h1 className="text-white   font-semibold md:text-lg  text-[10px]">{userInfo.username}</h1>
        <h1 className="text-red-500 md:text-sm  text-[12px]">ID: {userInfo.sub.slice(0,6)}</h1>

      </div>
      {/* <Button
        type="primary"
        danger
        icon={<LogoutOutlined />}
        className="ml-4 md:w-[6rem] md:h-[2rem]  w-[4rem] h-[1.4rem] text-[10px]"
      >
        Logout
      </Button> */}
    </div>
  </nav>
  )}
}

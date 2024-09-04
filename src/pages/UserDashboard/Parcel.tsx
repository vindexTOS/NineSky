import React, { useEffect } from 'react';
import { Button } from 'antd';
import { SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { FaTruckPlane } from "react-icons/fa6";
import { GiFinishLine } from "react-icons/gi";
import { FaGetPocket } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { GrRadialSelected } from "react-icons/gr";
export default function Parcel() {
    const navigation = useNavigate()
    const location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [])
    return (
        <div className="flex items-start justify-start h-[100vh] flex-col gap-40 pt-40 p-6 rounded-lg  ">

            <div className="flex space-x-4 ">
                <Button
                    onClick={() => navigation('storage')}
                    type="primary"
                    className="w-[20rem] h-[10rem] text-[1.2rem] bg-blue-500 hover:bg-blue-600 text-white flex flex-col items-center justify-center rounded-lg"
                    icon={<HomeOutlined className='text-[2.4rem]' />}
                >
                    {location.pathname === "/user/parcel/storage" && <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-[50%]  " > <GrRadialSelected /></div>}
                    საწყობშია
                </Button>
                <Button
                    onClick={() => navigation('on-the-way')}

                    type="primary"
                    className="w-[20rem] h-[10rem]  text-[1.2rem]   bg-red-500 hover:bg-green-600 text-white flex flex-col items-center justify-center rounded-lg"
                    icon={<FaTruckPlane className='text-[2.4rem]' />}
                >
                    {location.pathname === "/user/parcel/on-the-way" && <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-[50%]  " > <GrRadialSelected /></div>}

                    გზაში
                </Button>
                <Button
                    onClick={() => navigation('arrived')}
                    type="primary"
                    className="w-[20rem] h-[10rem] text-[1.2rem]  bg-yellow-500 hover:bg-yellow-600 text-white flex flex-col items-center justify-center rounded-lg"
                    icon={<  GiFinishLine className='text-[2.4rem]' />}
                >
                    {location.pathname === "/user/parcel/arrived" && <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-[50%]  " > <GrRadialSelected /></div>}

                    ჩამოსულია
                </Button>
                <Button
                    onClick={() => navigation('taken-out')}

                    type="primary"
                    className="w-[20rem] h-[10rem]  text-[1.2rem]  bg-green-500  hover:bg-red-600 text-white flex flex-col items-center justify-center rounded-lg"
                    icon={<FaGetPocket className='text-[2.4rem]' />}
                >
                    {location.pathname === "/user/parcel/taken-out" && <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-[50%]  " > <GrRadialSelected /></div>}

                    გატანილი
                </Button>
            </div>
            <main>
                <Outlet />
            </main>

        </div>
    );
}
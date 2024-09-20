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
        <div className="flex    items-start justify-start   h-[100%] flex-col gap-20 md:mr-80 mr-0 pt-40 p-6 rounded-lg  ">

            <div className="flex md:space-x-4  gap-4 md:flex-nowrap flex-wrap ">
                <Button
                    onClick={() => navigation('storage')}
                    type="primary"
                    className="md:w-[20rem] md:h-[10rem] w-[8rem] h-[5rem] md:text-[1.2rem] text-[1rem] bg-blue-500 hover:bg-blue-600 text-white flex flex-col items-center justify-center rounded-lg"
                    icon={<HomeOutlined className='md:text-[2.4rem] text-[1rem]' />}
                >
                    {location.pathname === "/user/parcel/storage" && <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-[50%]  " > <GrRadialSelected /></div>}
                    საწყობშია
                </Button>
                <Button
                    onClick={() => navigation('on-the-way')}

                    type="primary"
                    className="md:w-[20rem] md:h-[10rem]  w-[8rem] h-[5rem] md:text-[1.2rem] text-[1rem]   bg-red-500 hover:bg-green-600 text-white flex flex-col items-center justify-center rounded-lg"
                    icon={<FaTruckPlane className='md:text-[2.4rem] text-[1rem]' />}
                >
                    {location.pathname === "/user/parcel/on-the-way" && <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-[50%]  " > <GrRadialSelected /></div>}

                    გზაში
                </Button>
                <Button
                    onClick={() => navigation('arrived')}
                    type="primary"
                    className="md:w-[20rem] md:h-[10rem]  w-[8rem] h-[5rem] md:text-[1.2rem] text-[1rem]  bg-yellow-500 hover:bg-yellow-600 text-white flex flex-col items-center justify-center rounded-lg"
                    icon={<  GiFinishLine className='md:text-[2.4rem] text-[1rem]' />}
                >
                    {location.pathname === "/user/parcel/arrived" && <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-[50%]  " > <GrRadialSelected /></div>}

                    ჩამოსულია
                </Button>
                <Button
                    onClick={() => navigation('taken-out')}

                    type="primary"
                    className="md:w-[20rem] md:h-[10rem]   w-[8rem] h-[5rem] md:text-[1.2rem] text-[1rem] bg-green-500  hover:bg-red-600 text-white flex flex-col items-center justify-center rounded-lg"
                    icon={<FaGetPocket className='md:text-[2.4rem] text-[1rem]' />}
                >
                    {location.pathname === "/user/parcel/taken-out" && <div className="absolute top-2 left-2 w-[20px] h-[20px] rounded-[50%]  " > <GrRadialSelected /></div>}

                    გატანილი
                </Button>
            </div>
            <main className="h-[100%] w-[100%]">
                <Outlet />
            </main>

        </div>
    );
}
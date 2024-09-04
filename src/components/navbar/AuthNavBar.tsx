import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Avatar } from "antd";
export default function AuthNavBar() {
  return (
    <nav style={{zIndex:1000}} className="md:w-full w-[100vw] bg-[#002244]    lg:px-60  fixed top-0 left-0 h-[95px] flex items-center justify-between px-10 z-100">
    <div>
      <h1 className="text-white text-2xl font-bold  md:flex hidden">Nine Sky</h1>
    </div>
    <div className="flex items-center space-x-4">
      <Avatar size="large" icon={<UserOutlined />} />
      <div className="flex flex-col">
        <h1 className="text-white text-lg font-semibold">Giorgi</h1>
        <h1 className="text-gray-400 text-sm">ID: 1999125</h1>
      </div>
      <Button
        type="primary"
        danger
        icon={<LogoutOutlined />}
        className="ml-4"
      >
        Logout
      </Button>
    </div>
  </nav>
  )
}

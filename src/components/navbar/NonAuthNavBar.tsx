 
import React, { useState } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import LoginForm from '../forms/auth-forms/LoginForm';
import RegistrationForm from '../forms/auth-forms/ReigstrationForm';
import { FaBars } from "react-icons/fa";
export default function NonAuthNavBar() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <nav style={{ zIndex: 1000 }} className="md:w-full w-[100vw] bg-[#2fb9ff] lg:px-60 fixed top-0 left-0 h-[95px] flex items-center justify-between px-10">
      <div className="flex  max_smm:w-[100%] max_smm:flex max_smm:justify-between">
        <h1 className="text-white text-2xl font-bold  ">NineSky</h1>
        <Button
          className="md:hidden text-white  bg-[#2fb9ff]"
          icon={ <FaBars  className=" text-white  text-[2rem] bg-[#2fb9ff]" />}
          onClick={showDrawer}
        />
      </div>
      
      <div className="hidden md:flex space-x-4">
      <button>
          <LoginForm />
        </button>

        <button>
          <RegistrationForm />
        </button>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={drawerVisible}
        width={250}
       >
        <Menu
          mode="inline"
          onClick={onClose}
          style={{ width: 250 }}
        >
          <Menu.Item key="login">
            <LoginForm />
          </Menu.Item>
          <Menu.Item key="register">
            <RegistrationForm />
          </Menu.Item>
        </Menu>
      </Drawer>
    </nav>
  );
}

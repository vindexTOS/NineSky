import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  SettingOutlined,
  DropboxOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2';

import { Content } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const { Sider } = Layout;

export default function UserMain() {
  const cookies = new Cookies()
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("parcel/storage");
  const handleMenuSelect = async ({ key }: { key: string }) => {
    if (key === 'logout') {
      // Show SweetAlert2 confirmation
      const result = await Swal.fire({
        title: 'ნამდვილად გსურთ გამოსვლა ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'დიახ, log out',
        cancelButtonText: 'არა, cancel',
        customClass: {
          container: 'custom-swal-container',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
        },
      });

      if (result.isConfirmed) {
         
          
         cookies.remove("token")
         setTimeout(()=>{
          navigate('/');  

         },500)
      }
    } else {
      setSelectedKey(key);
      navigate(key);
    }
  };
  const [collaps, setCollaps] = useState(true);
  return (
    <Layout className=" " style={{ height: "100%" }}>
      <Sider   
        collapsible
        defaultChecked
        collapsed={collaps}
        style={{
          overflow: "auto",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10000,backgroundColor:"#0289cc"
        }}
      >
        <div className="logo" style={{ margin: "16px", textAlign: "center" }}>
          {/* <h2 className="text-white text-[12px]">Nine Sky</h2> */}
          {!collaps ? (
            <IoIosArrowBack
              onClick={() => setCollaps(!collaps)}
              className="text-white text-[2.5rem]"
            />
          ) : (
            <IoIosArrowForward
              onClick={() => setCollaps(!collaps)}
              className="text-white text-[2.5rem]"
            />
          )}
        </div>
        <Menu
         className="custom-menu" 
         style={{
          backgroundColor: '#0289cc', // Background color for the menu
        }}
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}

        >
          <Menu.Item  key="parcel/storage" icon={<DropboxOutlined />}>
            ამანათები
          </Menu.Item>
          <Menu.Item key="address" icon={<EnvironmentOutlined />}>
            მისამართები
          </Menu.Item>
          <Menu.Item key="transactions" icon={<DollarOutlined />}>
            ტრანზაქციები
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            პარამეტრები
          </Menu.Item>

          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            გამოსვლა
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout md:ml-[200px] ml-[50px] ">
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div className=" min-h-[100vh] h-[100%] w-[100%] flex items-center justify-center">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

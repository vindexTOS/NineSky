import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  BellOutlined,
  FileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function UserMain() {
  return (
    <Layout style={{  height: '100%' }}>
      <Sider
        collapsible
        defaultCollapsed
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex:10000
        }}
      >
        <div className="logo" style={{ margin: '16px', textAlign: 'center' }}>
          <h2 className="text-white text-[12px]">Nine Sky</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<BellOutlined />}>
            Notifications
          </Menu.Item>
          <Menu.Item key="4" icon={<FileOutlined />}>
            Documents
          </Menu.Item>
          <Menu.Item key="5" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <div className="p-6">
          <h1>UserMain Content Area</h1>
         <div className="h-[100vh] w-[100vw]" >HEllo </div>
        </div>
      </Layout>
    </Layout>
  );
}

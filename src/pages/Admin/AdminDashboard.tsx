import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { MenuOutlined, HomeOutlined, UserOutlined, FileOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are included

const { Header, Sider, Content } = Layout;

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse} theme="dark">
        <div className="logo" style={{ color: 'white', textAlign: 'center', padding: '16px' }}>
          {collapsed ? 'Logo' : 'Admin Dashboard'}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            Reports
          </Menu.Item>
          {/* Add more menu items here */}
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ float: 'right' }}
          >
            <Menu.Item key="1" icon={<MenuOutlined />} />
            {/* Add more items to the top navigation bar here */}
          </Menu>
        </Header>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {/* Dashboard content goes here */}
            <h1>Welcome to the Admin Dashboard</h1>
            {/* Add additional content and components here */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
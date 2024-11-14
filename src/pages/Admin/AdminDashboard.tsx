import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { MenuOutlined, HomeOutlined, UserOutlined, FileOutlined, LogoutOutlined, DollarCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are included
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie"
import Swal from 'sweetalert2';
const { Header, Sider, Content } = Layout;

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
const cookies = new Cookies
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState("/excel-upload");
  const handleMenuSelect = async ({ key }: { key: string }) => {
    if (key == 'logout') {
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


        cookies.remove("token", { path: '/' });
        setTimeout(() => {
          navigate('/');

        }, 500)

      }else{

        setSelectedKey('user-managment');
        return
      }
    
     
    
  }

  setSelectedKey(key);
  navigate(key);
};
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse} theme="dark">
        <div className="logo" style={{ color: 'white', textAlign: 'center', padding: '16px' }}>
          {collapsed ? 'Logo' : 'Admin Dashboard'}
        </div>
        <Menu  theme="dark" mode="inline" defaultSelectedKeys={['excel-upload']}   selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
>
          {/* <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Users
          </Menu.Item>*/}
          <Menu.Item key="user-managment" icon={<UserOutlined />}>
            Users
          </Menu.Item> 
          <Menu.Item key="excel-upload" icon={<FileOutlined />}>
          Upload Parcel
          </Menu.Item>
          <Menu.Item key="price-managment" icon={<DollarCircleOutlined />}>
            ფასის მენეჯმენტი
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            გამოსვლა
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
        
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {/* Dashboard content goes here */}
            <h1>Welcome to the Admin Dashboard</h1>
            {/* Add additional content and components here */}
            <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
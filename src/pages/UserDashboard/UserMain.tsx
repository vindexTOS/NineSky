import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {

  SettingOutlined,

  DropboxOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from '@ant-design/icons';

import { Content } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

export default function UserMain() {
  const navigation = useNavigate()
  const [selectedKey, setSelectedKey] = useState('parcel/storage');
  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
    navigation(key)
  };
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        collapsible
        defaultChecked
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10000,
        }}
      >
        <div className="logo" style={{ margin: '16px', textAlign: 'center' }}>
          <h2 className="text-white text-[12px]">Nine Sky</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}

        >
          <Menu.Item key="parcel/storage" icon={<DropboxOutlined />}>
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
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="h-[100vh] w-[100vw] flex items-center justify-center">

            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

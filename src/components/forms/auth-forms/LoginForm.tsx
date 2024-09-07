import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles
import 'tailwindcss/tailwind.css'; // Import TailwindCSS styles
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
       <Button    onClick={showModal}
        type="primary" 
        className="bg-blue-500 hover:bg-blue-700 text-white border-none rounded-md py-5"
      >
          
          <LoginOutlined />
          <span>Login</span>
      </Button>
      <Modal
        title="Login"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}  
        centered
        className="custom-modal"
      >
        <div className="p-4">
          <Input
            placeholder="Username"
            prefix={<UserOutlined />}
            className="mb-3"
          />
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined />}
            className="mb-3"
          />
          <Button onClick={()=>navigate("/user/parcel/storage")} type="primary" block>
            Login
          </Button>
        </div>
      </Modal>
      <style jsx>{`
        .custom-modal .ant-modal {
          backdrop-filter: blur(10px); /* Apply blur effect to background */
          -webkit-backdrop-filter: blur(10px); /* For Safari */
        }
      `}</style>
    </>
  );
}
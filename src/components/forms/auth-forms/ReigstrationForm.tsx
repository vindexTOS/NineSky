import React, { useState } from 'react';
import { Modal, Input, Button, Form, Switch, Select, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, IdcardOutlined, GlobalOutlined, EnvironmentOutlined, UserAddOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles
import 'tailwindcss/tailwind.css'; // Import TailwindCSS styles

const { Option } = Select;

export default function RegistrationForm() {
  const [visible, setVisible] = useState(false);
  const [isJuridical, setIsJuridical] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSwitchChange = (checked:boolean) => {
    setIsJuridical(checked);
  };

  return (
    <>
     <Button    onClick={showModal}
        type="default" 
        className="bg-orange-500 text-white border-none hover:bg-gray-100 rounded-md py-5"
      >
         <UserAddOutlined />
         <span>Register</span>
      </Button>
      <Modal
        title="Register"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Hides the default footer
        centered
        className="custom-modal"
      >
        <Form layout="vertical">
          <Form.Item>
            <Switch
              checkedChildren="Juridical"
              unCheckedChildren="Physical"
              onChange={handleSwitchChange}
              defaultChecked={isJuridical}
            />
          </Form.Item>

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 space-y-4">
              <Form.Item
                label="Name (Georgian)"
                name="nameGeorgian"
                rules={[{ required: true, message: 'Please enter your name in Georgian!' }]}
              >
                <Input placeholder="Name in Georgian" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="Last Name (Georgian)"
                name="lastNameGeorgian"
                rules={[{ required: true, message: 'Please enter your last name in Georgian!' }]}
              >
                <Input placeholder="Last Name in Georgian" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="Name (English)"
                name="nameEnglish"
                rules={[{ required: true, message: 'Please enter your name in English!' }]}
              >
                <Input placeholder="Name in English" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="Last Name (English)"
                name="lastNameEnglish"
                rules={[{ required: true, message: 'Please enter your last name in English!' }]}
              >
                <Input placeholder="Last Name in English" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="ID Number"
                name="idNumber"
                rules={[{ required: true, message: 'Please enter your ID number!' }]}
              >
                <Input placeholder="ID Number" prefix={<IdcardOutlined />} />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Please enter your phone number!' }]}
              >
                <Input placeholder="Phone Number" prefix={<PhoneOutlined />} />
              </Form.Item>
            </div>

            <div className="flex-1 space-y-4">
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
              >
                <Input placeholder="Email" prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please enter your city!' }]}
              >
                <Input placeholder="City" prefix={<GlobalOutlined />} />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please enter your address!' }]}
              >
                <Input placeholder="Address" prefix={<EnvironmentOutlined />} />
              </Form.Item>

              <Form.Item
                label="Office"
                name="office"
                rules={[{ required: true, message: 'Please select an office!' }]}
              >
                <Select placeholder="Select an office">
                  <Option value="office1">Office 1</Option>
                  <Option value="office2">Office 2</Option>
                  <Option value="office3">Office 3</Option>
                  {/* Add more office options as needed */}
                </Select>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password placeholder="Password" prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                label="Repeat Password"
                name="repeatPassword"
                rules={[{ required: true, message: 'Please repeat your password!' }]}
              >
                <Input.Password placeholder="Repeat Password" prefix={<LockOutlined />} />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must accept the terms and conditions!') }]}
          >
            <Checkbox>
              I have read and agree to the <a href="#">Terms of Service</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
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
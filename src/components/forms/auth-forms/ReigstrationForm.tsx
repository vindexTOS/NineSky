import React, { useEffect, useState } from 'react';
import { Modal, Input, Button, Form, Switch, Select, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, IdcardOutlined, GlobalOutlined, EnvironmentOutlined, UserAddOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles
import 'tailwindcss/tailwind.css'; // Import TailwindCSS styles
import { useMutation } from '@tanstack/react-query';
import { RegisterType } from '../../../types/authTypes';
import { RegisterPostRequest } from '../../../API/Auth/Auth';
import Loading from '../../status/Loading';
import { useNavigate } from 'react-router-dom';
 import ErrorModal from '../../status/Error';
const { Option } = Select;

export default function RegistrationForm() {
  const [visible, setVisible] = useState(false);
  const nav = useNavigate()
  // const [isJuridical, setIsJuridical] = useState(false);
  const mutation = useMutation({
    mutationFn: (body: RegisterType) => {
      return RegisterPostRequest(body);
    },
    onError(err) {
 
    },
    onSuccess(suc) {
      nav("/user/parcel/storage");
    }
  });




  
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // const handleSwitchChange = (checked: boolean) => {
  //   setIsJuridical(checked);
  // };
  const onFinish = async (values:RegisterType) => {
      
     await mutation.mutateAsync({...values })
  };

  const {isPending, error ,isError} = mutation

 
  return (
    <>
      <Button onClick={showModal}
        type="default"
        className="bg-orange-400 text-white border-none hover:bg-gray-100 rounded-md py-5  max_smm:w-[90%]"
      >
        <UserAddOutlined />
        <span>რეგისტრაცია</span>
      </Button>

      <Modal
        title="რეგისტრაცია"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Hides the default footer
        centered
        className="custom-modal"
      >
        <Form onFinish={onFinish} layout="vertical" >
          {/* <Form.Item>
            <Switch
              checkedChildren="Juridical"
              unCheckedChildren="Physical"
              onChange={handleSwitchChange}
              defaultChecked={isJuridical}
            />
          </Form.Item> */}

          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 space-y-4">
              <Form.Item
                label="სახელი"
                name="first_name"
                rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ თქვენი სახელი!' }]}
              > 
                <Input placeholder="სახელი ქართულად" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="გვარი"
                name="last_name"
                rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ თქვენი გვარი!' }]}
              >
                <Input placeholder="გვარი ქართულად" prefix={<UserOutlined />} />
              </Form.Item>

              {/* <Form.Item
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
              </Form.Item> */}

              <Form.Item
                label="ID ნომერი"
                name="personal_number"
                rules={[{ required: true, message: 'გთხოვთ შეიყვანეთ თქვენი ID ნომერი!' }, {
                  validator: (_, value) => {
                    const regex = /^\d+$/; // Regular expression to check if the value contains only digits
                    if (!value || regex.test(value)) {
                      return Promise.resolve(); // Validation passed
                    }
                    return Promise.reject(new Error('ID  ნომერი უნდა შეიცავდეს მხოლოდ ციფრებს!')); // Validation failed
                  },
                },]}
              >
                <Input placeholder="ID ნომერი" prefix={<IdcardOutlined />} />
              </Form.Item>

              <Form.Item
                label="ტელეფონის ნომერი"
                name="phone_number"
                rules={[
                  { required: true, message: 'გთხოვთ შეიყვანეთ თქვენი ტელეფონის ნომერი!' },
                  {
                    validator: (_, value) => {
                      const regex = /^\d+$/; // Regular expression to check if the value contains only digits
                      if (!value || regex.test(value)) {
                        return Promise.resolve(); // Validation passed
                      }
                      return Promise.reject(new Error('ტელეფონის ნომერი უნდა შეიცავდეს მხოლოდ ციფრებს!')); // Validation failed
                    },
                  },
                ]}
              >
                <Input placeholder="ტელეფონის ნომერი" prefix={<PhoneOutlined />} />
              </Form.Item>
            </div>

            <div className="flex-1 space-y-4">
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა!' }, { type: 'email', message: 'გთხოვთ შეიყვანოთ თქვენი ელ-ფოსტა!' }]}
              >
                <Input placeholder="ელ-ფოსტა" prefix={<MailOutlined />} />
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
              
                </Select>
              </Form.Item>

              <Form.Item
                label="პაროლი"
                name="password"
                rules={[{ required: true, message: 'გთხოვთ შეიყვანეთ პაროლი!', }, { min: 6, message: 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო!' }]}
              >
                <Input.Password placeholder="პაროლი" prefix={<LockOutlined />} />
              </Form.Item>
              <Loading loading={isPending} />
               { isError &&  <ErrorModal error={error?.message  || "შეცდომა"} />}
              {/* <Form.Item
                label="Repeat Password"
                name="repeatPassword"
                rules={[{ required: true, message: 'Please repeat your password!' }]}
              >
                <Input.Password placeholder="Repeat Password" prefix={<LockOutlined />} />
              </Form.Item> */}
            </div>
          </div>

          <Form.Item
        
            valuePropName="checked"
            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('გთხოვთ გაეცანით და დაეთანხხმეთ მომსახურეობის პირობებს') }]}
          >
            <Checkbox>
              ვეთანხმები <a href="#">მომსახურების პირობებებს</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              რეგისტრაცია
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
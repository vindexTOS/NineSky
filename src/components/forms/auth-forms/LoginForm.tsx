import React, { useState } from 'react';
import { Modal, Input, Button, Form, } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles
import 'tailwindcss/tailwind.css'; // Import TailwindCSS styles
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LoginType } from '../../../types/authTypes';
import { LoginPostRequest } from '../../../API/Auth/Auth';
import Loading from '../../status/Loading';
import ErrorModal from '../../status/Error';

export default function LoginForm() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()


  const mutation = useMutation({
    mutationFn: (body: LoginType) => {
      return LoginPostRequest(body)
    },onError(err){
       console.log(err)
    },
    onSuccess() {
      navigate("/user/parcel/storage");
    }
  })


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const onFinish = async (values: LoginType) => {

    await mutation.mutateAsync(values)
  };
  const { isPending, error, isError } = mutation

  return (
    <>
      <Button onClick={showModal}
        type="primary"
        className="bg-blue-500 hover:bg-blue-700 text-white border-none rounded-md py-5    max_smm:w-[90%]"
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
        <Form onFinish={onFinish} layout="vertical" >
          <div className="p-4">
            <Form.Item
              label="ელ-ფოსტა"
              name="email"
              rules={[{ required: true, message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა!' }, { type: 'email', message: 'გთხოვთ შეიყვანოთ თქვენი ელ-ფოსტა!' }]}
            >
              <Input
                placeholder="ელ-ფოსტა"
                prefix={<UserOutlined />}
                className="mb-3"
              /></Form.Item>
            <Form.Item
              label="პაროლი"
              name="password"
              rules={[{ required: true, message: 'გთხოვთ შეიყვანეთ პაროლი!', }, { min: 6, message: 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო!' }]}
            >
              <Input.Password placeholder="პაროლი" prefix={<LockOutlined />} />
            </Form.Item>
            <Button  htmlType="submit"  type="primary" block>
              Login
            </Button>
            <Loading loading={isPending} />
            {isError && <ErrorModal error={error?.message || "შეცდომა"} />}
          </div></Form>
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
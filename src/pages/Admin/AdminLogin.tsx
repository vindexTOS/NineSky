import React from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are included
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {  LoginPostRequest } from '../../API/Auth/Auth';
import { LoginType } from '../../types/authTypes';

const { Title } = Typography;

export default function AdminLogin() {
    const navigate = useNavigate()


    const mutation = useMutation({
      mutationFn: (body: LoginType) => {
        return LoginPostRequest (body)
      },onError(err){
         console.log(err)
      },
      onSuccess() {
        navigate("/admin-dashboard")
      }
    })
  
  const onFinish = async (values: LoginType) => {
 
    await mutation.mutateAsync(values)
 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2fb9ff] ">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <Title level={2} className="text-center mb-6">Admin Login</Title>
        <Form
          name="login"
        //   initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            // rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          
          <Form.Item
            name="password"
            label="Password"
            // rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
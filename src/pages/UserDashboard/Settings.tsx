import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message  ,Switch, Select, Checkbox, Skeleton } from 'antd';
 import jwt_decode from "jwt-decode"


import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { GetUserInfo } from '../../API/User/GetRequests';
import InputLoading from '../../components/skeletons/InputLoading';
const { Option } = Select;
interface User {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  personal_number: string;
  office: string;
  city: string;
  address: string;
}

 





const Settings: React.FC = () => {
  const [userInfo,setUserInfo] = useState<any>()
  const cookies = new Cookies()
  useEffect(()=>{
    let token = cookies.get("token")
    const decode = async () =>{
      let decodedUser = await jwt_decode(token)
      console.log(decodedUser )
      setUserInfo(decodedUser)
    }
  
   decode()
  
  },[])


  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user-info", userInfo ? userInfo.sub : null],
    queryFn: () => userInfo ? GetUserInfo(userInfo.sub) : Promise.resolve(),
    enabled: !!userInfo 
  });
  // const mutation = useMutation(updateUserData, {
  //   onSuccess: () => {
  //     message.success('User updated successfully!');
  //   },
  //   onError: () => {
  //     message.error('Failed to update user.');
  //   },
  // });

  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (user) {
  //     form.setFieldsValue(user);
  //   }
  // }, [user, form]);

  const handleFinish = (values: User) => {
    // mutation.mutate(values);
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if(isPending){

    return  <InputLoading />
  }

  return (
    <div className="p-6 pt-20">
    <h2 className="text-2xl mb-4">მომხმარებლის პარამეტრები</h2> {/* User Settings */}
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Form.Item
          name="name"
          label="სახელი" // Name
          rules={[{ required: true, min: 2, max: 30 }]}
      
        >
          <Input     value={data.data.first_name}  />
       
        </Form.Item>
        <Form.Item
          name="first_name"
          label="პირველი სახელი" // First Name
          rules={[{ required: true, min: 2, max: 30 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="ბოლო სახელი" // Last Name
          rules={[{ required: true, min: 2, max: 30 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="ელ. ფოსტა" // Email
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="ტელეფონის ნომერი" // Phone Number
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="personal_number"
          label="პირადი ნომერი" // Personal Number
          rules={[{ required: true }]}
        >
          <Input />
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
          name="city"
          label="ქალაქი" // City
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="მისამართი" // Address
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit"  >
          ცვლილებების შენახვა {/* Save Changes */}
        </Button>
      </Form.Item>
    </Form>
  </div>
  
  );
};

export default Settings;

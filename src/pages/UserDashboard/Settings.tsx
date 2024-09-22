import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Switch, Select, Checkbox, Skeleton } from 'antd';
import jwt_decode from "jwt-decode"


import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { GetUserInfo } from '../../API/User/GetRequests';
import InputLoading from '../../components/skeletons/InputLoading';
import ErrorModal from '../../components/status/Error';
import { RegisterType } from '../../types/authTypes';
import { UpdateUserInfo } from '../../API/User/UpdateRequest';
const { Option } = Select;
interface User  extends RegisterType {}







const Settings: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>()
  const [token, setToken] = useState<string>("")
  const cookies = new Cookies()
  useEffect(() => {

    const decode = async () => {
      let token = await cookies.get("token")
      setToken(token)
      let decodedUser = await jwt_decode(token)
      console.log(decodedUser)
      setUserInfo(decodedUser)
    }

    decode()

  }, [])


  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user-info", userInfo ? userInfo.sub : null],
    queryFn: () => userInfo ? GetUserInfo(userInfo.sub) : Promise.resolve(),
    enabled: !!userInfo
  });
  const mutation = useMutation({
    mutationFn: (body: RegisterType) => {
      return UpdateUserInfo(userInfo.sub, token, body)
    },
    onSuccess: () => {
      message.success("განახლება წარმატებით განხორციელდა");
    },
    onError: (error) => {
      message.error(error.message || "An error occurred!");
    },
  })

  const [form] = Form.useForm();

 

  const handleFinish = (values: User) => {
    mutation.mutate(values);
  };

   

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
      
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        email: data.data.email,
        phone_number: String(data.data.phone_number),
        personal_number: String(data.data.personal_number),
        office: data.data.office,
        city: data.data.city,
        address: data.data.address,
      });
    }
  }, [data, form]);


  if (isPending) {

    return <InputLoading />
  }

  if (isError) {
    return <ErrorModal error={error.message || "შეცდომა!"} />
  }




  return (
    <div className="p-6 pt-20">
      <h2 className="text-2xl mb-4">მომხმარებლის პარამეტრები</h2> {/* User Settings */}
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <ErrorModal error={mutation?.error && mutation.error?.message || ""  } />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
          <Form.Item name="first_name" label="სახელი" rules={[{ required: true, min: 2, max: 30 }]}>
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="გვარი" rules={[{ required: true, min: 2, max: 30 }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="ელ. ფოსტა" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone_number" label="ტელეფონის ნომერი" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="personal_number" label="პირადი ნომერი" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Office" name="office" rules={[{ required: true, message: 'Please select an office!' }]}>
            <Select placeholder="Select an office">
              <Option value="office1">Office 1</Option>
              <Option value="office2">Office 2</Option>
              <Option value="office3">Office 3</Option>
            </Select>
          </Form.Item>
          <Form.Item name="city" label="ქალაქი" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="მისამართი" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isPending}>
            ცვლილებების შენახვა {/* Save Changes */}
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
};

export default Settings;

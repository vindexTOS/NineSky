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
      // console.log(decodedUser)
      setUserInfo(decodedUser)
    }

    decode()

  }, [])


  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user-info", userInfo ? userInfo.sub: null],
    queryFn: () => userInfo ? GetUserInfo( ) : Promise.resolve(),
    enabled: !!userInfo
  });
  const mutation = useMutation({
    mutationFn: (body: any) => {
      return UpdateUserInfo(  body)
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
    // console.log(data)
    if (data) {
      form.setFieldsValue({
      
        first_name: data.data.userDetails.first_name,
        last_name: data.data.userDetails.last_name,
        email: userInfo.email,
        phone_number: Number(data.data.userDetails.phone_number),
        personal_number: String(data.data.userDetails.personal_number),
        office: data.data.userDetails.office,
        city: data.data.userDetails.city,
        address: data.data.userDetails.address,
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
    <div className="p-10 pt-24   to-blue-100 min-h-screen">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-800">მომხმარებლის პარამეტრები</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-6">
        <ErrorModal error={(mutation?.error && mutation.error?.message) || ''} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Form.Item
            name="first_name"
            label="სახელი"
            rules={[{ required: true, min: 2, max: 30 }]}
            className="w-full"
          >
            <Input className="border-blue-300 focus:ring-blue-500 focus:border-blue-500" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="გვარი"
            rules={[{ required: true, min: 2, max: 30 }]}
            className="w-full"
          >
            <Input className="border-blue-300 focus:ring-blue-500 focus:border-blue-500" />
          </Form.Item>
          <Form.Item
            name="email"
            label="ელ. ფოსტა"
            rules={[{ required: true, type: 'email' }]}
            className="w-full"
          >
            <Input className="border-blue-300 focus:ring-blue-500 focus:border-blue-500" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="ტელეფონის ნომერი"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="border-blue-300 focus:ring-blue-500 focus:border-blue-500" />
          </Form.Item>
          <Form.Item
            name="personal_number"
            label="პირადი ნომერი"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="border-blue-300 focus:ring-blue-500 focus:border-blue-500" />
          </Form.Item>
          <Form.Item
            label="Office"
            name="office"
            rules={[{ required: true, message: 'Please select an office!' }]}
            className="w-full"
          >
            <Select
              placeholder="Select an office"
              className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <Option value="office1">Office 1</Option>
              <Option value="office2">Office 2</Option>
              <Option value="office3">Office 3</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            label="ქალაქი"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="border-blue-300 focus:ring-blue-500 focus:border-blue-500" />
          </Form.Item>
          <Form.Item
            name="address"
            label="მისამართი"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="border-blue-300 focus:ring-blue-500 focus:border-blue-500" />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            className="w-full py-4 text-xl bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            ცვლილებების შენახვა {/* Save Changes */}
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>

  );
};

export default Settings;

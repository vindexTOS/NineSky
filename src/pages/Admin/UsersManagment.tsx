import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button, Modal, Form, Input, message } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetAllUsers } from '../../API/User/GetRequests';
import Loading from '../../components/status/Loading';
import { RegisterType } from '../../types/authTypes';
import { UpdateUserInfo } from '../../API/Admin/UpdateUser';
 
export default function UsersManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  const { data, isPending, isError, error, refetch  } = useQuery({
    queryKey: ['many-users-info', searchTerm, currentPage],
    queryFn: () => GetAllUsers(searchTerm, currentPage, 10),
  });

  useEffect(() => {
    console.log(data?.data);
  }, [data]);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    form.setFieldsValue(user);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handlePaginationChange = (page: any) => {
    setCurrentPage(page);
  };

  const mutation = useMutation({
    mutationFn: (body: any) => {
      return UpdateUserInfo(  body);
    },
    onSuccess: () => {
      message.success('განახლება წარმატებით განხორციელდა');
      setIsModalOpen(false);
      setSelectedUser(null);
         refetch();
    },
    onError: (error) => {
      message.error(error.message || 'An error occurred!');
    },
  });

  const handleFinish = (values: any) => {
    mutation.mutate(values);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Phone Number', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Personal Number', dataIndex: 'personal_number', key: 'personal_number' },
    { title: 'Office', dataIndex: 'office', key: 'office' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Access Level', dataIndex: 'accessLevel', key: 'accessLevel' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, user: any) => (
        <Button type="primary" onClick={() => handleEdit(user)}>
          Edit
        </Button>
      ),
    },
  ];

  if (isPending) {
    return <Loading loading={isPending} />;
  }

  if (isError) {
    return <div>Error: {error.message || 'An error occurred!'}</div>;
  }

  return (
    <div className="p-10     min-h-screen">
      <div className=" mx-auto bg-white rounded-lg   p-8">
         <Input.Search
          placeholder="Search users"
          onSearch={setSearchTerm}
          enterButton
          className="mb-6"
          size="large"
        />
        <Table
          columns={columns}
          dataSource={data?.data.users|| []}
          loading={isPending}
          pagination={false}
          rowKey="id"
          className="mb-6"
        />
        <Pagination
          current={currentPage}
          total={data?.data?.totalCount}
          pageSize={10}
          onChange={handlePaginationChange}
          showSizeChanger={false}
          showQuickJumper
          simple
          className="text-center"
        />
        <Modal
          title="Edit User"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedUser && (
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="First Name" name="first_name">
                <Input />
              </Form.Item>
              <Form.Item label="Last Name" name="last_name">
                <Input />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone_number">
                <Input />
              </Form.Item>
              <Form.Item label="Personal Number" name="personal_number">
                <Input />
              </Form.Item>
              <Form.Item label="Office" name="office">
                <Input />
              </Form.Item>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Access Level" name="accessLevel">
                <Input type="number" />
              </Form.Item>
              <Form.Item className="hidden" label="id" name="id">
                <Input type="number" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={mutation.isPending} className="w-full">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    </div>
  );
}
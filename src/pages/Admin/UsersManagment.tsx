import React, { useEffect, useState } from 'react';
import { Table, Pagination, Button, Modal, Form, Input, message, Select ,Typography} from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetAllUsers } from '../../API/User/GetRequests';
import Loading from '../../components/status/Loading';
 import { UpdateUserInfo } from '../../API/Admin/UpdateUser';
import { GetParcels, UpdateParcels } from '../../API/Admin/CreateParcels';
import {ShippingStatus} from "../../types/shipping_status"
import { DeleteUser } from '../../API/Admin/DeleteRequests';
export default function UsersManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalCurrentPage, setModalCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetalseModalOpen, setIsDetalesModalOpen] = useState(false)
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
  const [detaledUserInfo, setDetaledUserInfo] = useState<any>()
  const [form] = Form.useForm();


const {Text} = Typography

  const shippingStatusOptions = Object.values(ShippingStatus).map((status) => ({
    label: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the label
    value: status,
  }));


  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['many-users-info', searchTerm, currentPage],
    queryFn: () => GetAllUsers(searchTerm, currentPage, 10),
  });



  const deleteMutation = useMutation({
     mutationFn:(id:string)=>{
      return DeleteUser(id )
     },
     onSuccess(){
      message.success('მომხმარებელი წაიშალა');

     },
     onError(){
      message.error('შეცდომა მომხმარებელის წაშლა ვერ მოხერხდა!');

     }
  })

  const handleDeleteMutation = async (id:string)=>{
      await deleteMutation.mutateAsync(id)
  }
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleDelete = async (id: string ) => {
    setSelectedUserId(id)
    setIsDeleteModalOpen(true)
  };


  const handleDetales = async (userId: string, page = 1) => {
    setSelectedUserId(userId)
    setIsDetalesModalOpen(true);
    const data = await GetParcels('', userId, page, 10);
    // console.log(data)
    setDetaledUserInfo(data);
    setModalCurrentPage(page); // Set current page for modal pagination
  };

  // Handle modal pagination
  const handleModalPagination = async (page: any) => {
    // console.log(selectedUser)
    if (selectedUserId) {
      await handleDetales(selectedUserId, page); // Fetch data for the new page
    }
  };

  // Close the modal
  const handleCancelDetalesModal = () => {
    setIsDetalesModalOpen(false);
  };
  const handleEdit = (user: any) => {
    //  console.log(user)
    setSelectedUser(user);
    setIsModalOpen(true);
    delete user.userDetails.id
    user.userDetails.id = user.id
    form.setFieldsValue({
      ...user,
      ...user.userDetails,
    });
    // console.log(user)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handlePaginationChange = (page: any) => {
    setCurrentPage(page);
  };

  const mutation = useMutation({
    mutationFn: (body) => {

      return UpdateUserInfo(body);
    },
    onSuccess: () => {
      message.success('განახლება წარმატებით განხორციელდა');
      setIsModalOpen(false);
      setSelectedUser(null);

    },
    onError: (error) => {
      message.error("შეცდომა")
      message.error(error.message || 'An error occurred!');
    },
  });

  const handleFinish = (values: any) => {

    const updatedValues = {
      ...values,

    };

    updatedValues.phone_number = Number(updatedValues.phone_number)
    mutation.mutate(updatedValues);
  };

  const updateMutation = useMutation({
    mutationFn: (body: any) => {
      return UpdateParcels(body);
    },
    onError(err) {
      message.error("Somehing went wrong")
      console.log(err);
    },
    onSuccess() {
      message.success('Parcel updated successfully');
      handleDetales(selectedUserId)

       
    },
  });

  const handleUpdate = (values: any) => {
    // console.log(values)
    const convertedValues = {
    ...values
    
    };

    updateMutation.mutate({ ...convertedValues });
  };

  const handleStatusChange = (id:any, newStatus:any) => {
    const parcel = detaledUserInfo.parcels.find((parcel:any) => parcel.id === id);
    if (parcel) {
      handleUpdate({
        ...parcel,
        shipping_status: newStatus,
      });
    }
  };
   const [selectedParcel, setSelectedParcel] = useState<any>(null);
    const [isDelecrationModalOpen,setIsDeclerationModalOpen] = useState(false)

  const handleOpenDeclaration = (parcel: any) => {
    setSelectedParcel(parcel);
    setIsDeclerationModalOpen(true);
  };
  const columns2 = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
     { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    { title: 'Payment Status', dataIndex: 'payment_status', key: 'payment_status' },
    {
      title: 'Shipping Status',
      dataIndex: 'shipping_status',
      key: 'shipping_status',
      render: (text:any, record:any) => (
        <Select
          value={record.shipping_status}
          onChange={(value) => handleStatusChange(record.id, value)}
          options={shippingStatusOptions}
          style={{ width: 120 }}
        />
      ),
    },
    {
      title: 'Declaration',
      key: 'declaration',
      render: (_: any, parcel: any) =>
        parcel.declaration ? (
          <Button type="link" onClick={() => handleOpenDeclaration(parcel)}>
            დეკლარაცის ნახვა
          </Button>
        ) : (
          <span>დეკლარაცის გარეშე</span>
        ),
    },
  ];





  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'First Name', dataIndex: ['userDetails', 'first_name'], key: 'first_name' },
    { title: 'Last Name', dataIndex: ['userDetails', 'last_name'], key: 'last_name' },
    { title: 'Phone Number', dataIndex: ['userDetails', 'phone_number'], key: 'phone_number' },
    { title: 'Personal Number', dataIndex: ['userDetails', 'personal_number'], key: 'personal_number' },
    { title: 'Office', dataIndex: ['userDetails', 'office'], key: 'office' },
    { title: 'City', dataIndex: ['userDetails', 'city'], key: 'city' },
    { title: 'Address', dataIndex: ['userDetails', 'address'], key: 'address' },
    { title: 'Access Level', dataIndex: 'accessLevel', key: 'accessLevel' },
 
    {
      title: 'Detales',
      key: 'detales',
      render: (_: any, parcel: any) => (
        <Button
          type="primary"
          style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}
          onClick={() => handleDetales(parcel.id)}
        >
          დეტალურად
        </Button>
      ),
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_: any, user: any) => (
        <Button type="primary" onClick={() => handleEdit(user)}>
          შეცვლა
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_: any, parcel: any) => (
        <Button
          type="primary"
          style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }}
          onClick={() => handleDelete(parcel.id)}
        >
          წაშლა
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
    <div className="   p-10 min-h-screen 
    max_smm:p-0 max_smm:m-0 max_smm:min-h-0 
    max_smm:absolute">
    <div className="mx-auto bg-white mr-50 rounded-lg p-8 max-w-6xl w-full max_smm:mr-30 max_smm:w-[300px]">
      <Input.Search
        placeholder="Search users"
        onSearch={setSearchTerm}
        enterButton
        className="mb-6 w-full md:w-auto"
        size="large"
      />
      <Table
        columns={columns}
        dataSource={data?.data?.parsedUser || []}
        loading={isPending}
        pagination={false}
        rowKey="id"
        className="mb-6 overflow-x-auto"
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
        title="Parcel Details"
        open={isDetalseModalOpen}
        onCancel={handleCancelDetalesModal}
        footer={null}
        width={800}
      >
        {detaledUserInfo ? (
          <Table
            dataSource={detaledUserInfo.parcels}
            rowKey="id"
            columns={columns2}
            pagination={false}
            className="overflow-x-auto"
          />
        ) : (
          <Loading loading={!detaledUserInfo} />
        )}
        <Pagination
          current={modalCurrentPage}
          total={detaledUserInfo?.totalCount || 0}
          pageSize={10}
          onChange={handleModalPagination}
          className="mt-4"
        />
      </Modal>
  
      <Modal title="Edit User" open={isModalOpen} onCancel={handleCancel} footer={null}>
        {selectedUser && (
          <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-4">
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
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
              <Input type="text" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={mutation.isPending} className="w-full">
                შენახვა
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
  
      <Modal
        title="Delete Declaration"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={null}
      >
        <div className="text-center">
          <Text strong style={{ fontSize: '16px' }}>
            დარცუმებული ხარხთ რომ გსურთ ამ უსერის წაშლა ?
          </Text>
          <div className="mt-4 flex justify-center">
            <Button
              type="primary"
              danger
              onClick={() => {
                handleDeleteMutation(selectedUserId);
                setIsDeleteModalOpen(false);
              }}
              className="mr-4"
            >
              კი,წაშალე
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)}>გაუაქმება</Button>
          </div>
        </div>
      </Modal>
  
      <Modal
        title="Declaration Details"
        open={isDelecrationModalOpen}
        onCancel={() => setIsDeclerationModalOpen(false)}
        footer={null}
      >
        {selectedParcel?.declaration ? (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center">
              <span className="font-semibold w-full md:w-1/3">ID:</span>
              <span className="w-full md:w-2/3">{selectedParcel.declaration.id}</span>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <span className="font-semibold w-full md:w-1/3">ტიპი:</span>
              <span className="w-full md:w-2/3">{selectedParcel.declaration.type}</span>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <span className="font-semibold w-full md:w-1/3">ფასი:</span>
              <span className="w-full md:w-2/3">${selectedParcel.declaration.price}</span>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <span className="font-semibold w-full md:w-1/3">Website:</span>
              <a
                href={selectedParcel.declaration.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 w-full md:w-2/3"
              >
                {selectedParcel.declaration.website}
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <span className="font-semibold w-full md:w-1/3">კომენტარი:</span>
              <span className="w-full md:w-2/3">{selectedParcel.declaration.comment}</span>
            </div>
            {selectedParcel.declaration.invoice_Pdf && (
              <div className="flex justify-center mt-6">
                <Button
                  type="primary"
                  onClick={() => {
                    const blob = new Blob(
                      [new Uint8Array(selectedParcel.declaration.invoice_Pdf.data)],
                      { type: 'application/pdf' }
                    );
                    const url = URL.createObjectURL(blob);
                    window.open(url);
                  }}
                >
                  ინვოისის ნახვა
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Declaration Available</p>
        )}
      </Modal>
    </div>
  </div>
  );
}
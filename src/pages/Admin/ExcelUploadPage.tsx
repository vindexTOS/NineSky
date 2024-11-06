import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { CreateParcles, GetParcels, UpdateParcels } from '../../API/Admin/CreateParcels';
import Loading from '../../components/status/Loading';
import { Button, Modal, Form, Input, message, Table, Pagination, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function ExcelUploadPage() {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [form] = Form.useForm();

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const binaryStr = event?.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      setData(jsonData);
      await createMutation.mutateAsync(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const createMutation = useMutation({
    mutationFn: (body: any) => {
      console.log(body)
      return CreateParcles(body);
    },
    onError(err) {
      console.log(err);
    },
    onSuccess() {
      
      message.success('Parcels created successfully');
      refetch();
    },
  });
  const updateMutation = useMutation({
    mutationFn: (body: any) => {
      return UpdateParcels(body);  
    },
    onError(err) {
      console.log(err);
    },
    onSuccess() {
      message.success('Parcel updated successfully');
      refetch();  
      handleCancel();  
    },
  });
  const { data: parcelsData, isLoading: isLoadingParcels, isError, error, refetch } = useQuery({
    queryKey: ['parcels-info', searchTerm, currentPage],
    queryFn: () => GetParcels(searchTerm, currentPage, 10),
  });

  const handleManualOpen = () => {
    form.resetFields();
    setIsModalOpen(true);
    setSelectedParcel(null);
  };

  const handleCancel =  async ( ) => {

  
    setIsModalOpen(false);
    setSelectedParcel(null);
  };
  const handleFinish = (values: any) => {
    const convertedValues = {
      ...values,
      tracking_id: values.tracking_id ? Number(values.tracking_id) : undefined,
      flight_id: values.flight_id ? Number(values.flight_id) : undefined,
      arrived_at: values.arrived_at  ,
      weight: values.weight ? String(values.weight) : undefined,
       price: values.price ? Number(values.price) : undefined,
       ownerId:values.ownerId ? Number(values.ownerId) : undefined
    };

    if (selectedParcel) {
      // Editing an existing parcel
      updateMutation.mutate({ ...convertedValues });
    } else {
      const arr = []
      arr.push(convertedValues)
 
 
      createMutation.mutate(arr);
      handleCancel()
    }
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { title: 'Tracking ID', dataIndex: 'tracking_id', key: 'tracking_id' },
    { title: 'Flight ID', dataIndex: 'flight_id', key: 'flight_id' },
    { title: 'Flight From', dataIndex: 'flight_from', key: 'flight_from' },
    { title: 'Arrived At', dataIndex: 'arrived_at', key: 'arrived_at' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    // { title: 'Owner', key: 'ownerId', render: (_: any, parcel: any) => (
    //   // <span>{parcel.owner.first_name} {parcel.owner.last_name}</span>
    // )},
    {
      title: 'Action',
      key: 'action',
      render: (_: any, parcel: any) => (
        <Button type="primary" onClick={() => handleEdit(parcel)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (parcel: any) => {
    console.log(parcel)
    setSelectedParcel(parcel);
    setIsModalOpen(true);
    form.setFieldsValue(parcel);
  };

  return (
    <div className="p-10 min-h-screen">
      <div className="mx-auto bg-white rounded-lg p-8">
        <div className="flex justify-between mb-6 flex-col">
        <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="custom-upload-input mb-4 w-full"
          />
          <Button type="primary" icon={<i className="fa fa-plus" />} onClick={handleManualOpen}>
      +  ამანათის ხელით დამატება +
          </Button>
        </div>
        <Input.Search
          placeholder="Search by Tracking ID"
          onSearch={(value) => setSearchTerm(value)}
          enterButton
          className="mb-6"
          size="large"
        />
        <Loading loading={createMutation.isPending || isLoadingParcels} />

        <Table
          columns={columns}
          dataSource={parcelsData?.parcels || []}
          loading={isLoadingParcels}
          pagination={false}
          rowKey="tracking_id"
          className="mb-6"
        />
        <Pagination
          current={currentPage}
          total={parcelsData?.totalCount || 0}
          pageSize={10}
          onChange={handlePaginationChange}
          showSizeChanger={false}
          showQuickJumper
          simple
          className="text-center"
        />

        <Modal
          title={selectedParcel ? 'Edit Parcel' : 'Add Parcel Manually'}
          open={isModalOpen}
          onCancel={ handleCancel }
           
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={ handleFinish }>
            <Form.Item label="Tracking ID" name="tracking_id">
              <Input />
            </Form.Item>
        {  !selectedParcel &&  <Form.Item label="Owner ID" name="ownerId">
              <Input />
            </Form.Item>}
            <Form.Item label="Flight ID" name="flight_id">
              <Input />
            </Form.Item>
            <Form.Item label="Flight From" name="flight_from">
              <Input />
            </Form.Item>
            <Form.Item label="Arrived At" name="arrived_at">
              <Input />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input type="number" />
            </Form.Item>
            {/* <Form.Item label="Vol Weight" name="vol_weight">
              <Input type="number" />
            </Form.Item> */}
            <Form.Item label="Price" name="price">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Shipping Status" name="shipping_status">
              <Input />
            </Form.Item>
            <Form.Item label="Payment Status" name="payment_status">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={createMutation.isPending} className="w-full">
                Save Parcel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

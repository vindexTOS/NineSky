import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import { CreateParcles, GetParcels, UpdateParcels } from '../../API/Admin/CreateParcels';
import Loading from '../../components/status/Loading';
import { Button, Modal, Form, Input, message, Table, Pagination, Upload, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function ExcelUploadPage() {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSingleParcelModalOpen, setIsSingleParcelModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const [singleParcelForm] = Form.useForm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleManualOpen = () => {
    form.resetFields();
    setIsModalOpen(true);
    setSelectedParcel(null);
  };

 

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryStr = event?.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      const updatedData = jsonData.map((item: any) => ({
        ...item,
        tracking_id: String(item.tracking_id),
        weight:Number(item.weight)
      }));
      setData(updatedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleUploadFinish = () => {
    if (data.length > 0) {
      const uploadData = {
        flight_info: {
          flight_id: form.getFieldValue('flight_id'),
          flight_from: form.getFieldValue('flight_from'),
          arrived_at: form.getFieldValue('arrived_at'),
        },
        parcels: data,
      };
      createMutation.mutate(uploadData);
      handleCancel();
    } else {
      message.error('Please upload a valid Excel file with parcel data.');
    }
  };

  const createMutation = useMutation({
    mutationFn: (body: any) => {
      return CreateParcles(body);
    },
    onError(err) {
      console.log(err);
      message.error("Something went wrong")
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
    queryFn: () => GetParcels(searchTerm, '',currentPage, 10),
  });

  useEffect(() => {
    console.log(parcelsData);
  }, [parcelsData]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
  };

  const handleSingleParcelCancel = () => {
    setIsSingleParcelModalOpen(false);
  };

  const handleSingleParcelOpen = () => {
    singleParcelForm.resetFields();
    setIsSingleParcelModalOpen(true);
  };

  const handleSingleParcelFinish = (values: any) => {
    // Transform values into CreateParcelDto format
    const newParcel    = {
      tracking_id: values.tracking_id,
      weight: values.weight ? Number(values.weight) : undefined,
      ownerId: values.ownerId,
    };

    // Create the flight information for a single parcel
    const flightInfo = {
      flight_id: values.flight_id,
      flight_from: values.flight_from.toLowerCase(),
      arrived_at: values.arrived_at,
    };

    const uploadData = {
      flight_info: flightInfo,
      parcels: [newParcel],
    };

    createMutation.mutate(uploadData);
    handleSingleParcelCancel();
  };

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenDeclaration = (parcel: any) => {
    if (parcel.declaration && parcel.declaration.invoice_Pdf) {
      const blob = new Blob([new Uint8Array(parcel.declaration.invoice_Pdf.data)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url);
    }
  };
  const handleUpdate = (values: any) => {
    const convertedValues = {
      ...values,
      tracking_id: values.tracking_id ? values.tracking_id : undefined,
      flight_id: values.flight_id ? values.flight_id : undefined,
      arrived_at: values.arrived_at,
      weight: values.weight ? String(values.weight) : undefined,
      price: values.price ? Number(values.price) : undefined,
      ownerId: values.ownerId ? values.ownerId : undefined,
      id: selectedParcel.id,
    };

    updateMutation.mutate(convertedValues);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setSelectedParcel(null);
  };
 useEffect(()=>{
 console.log(parcelsData?.parcels)
 },[parcelsData?.parcels])
  const columns = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: 'Tracking ID', dataIndex: 'tracking_id', key: 'tracking_id' },
    { title: 'Shipping status', dataIndex: 'shipping_status', key: 'shipping_status' },
    { title: 'Pay Status', dataIndex: 'payment_status', key: 'payment_status' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Declaration',
      key: 'declaration',
      render: (_: any, parcel: any) =>
        parcel.declaration ? (
          <Button type="link" onClick={() => handleOpenDeclaration(parcel)}>
            View Declaration
          </Button>
        ) : (
          <span>No Declaration</span>
        ),
    },
   
    {
      title: 'Action',
      key: 'action',
      render: (_: any, parcel: any) => (
        <Button type="primary"  onClick={() => handleEdit(parcel)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (parcel: any) => {
    console.log(parcel)
    setSelectedParcel(parcel);
    setIsEditModalOpen(true);
    editForm.setFieldsValue({
      ...parcel,
      ownerId: parcel.owner?.id || '',
      flight_id: parcel.flight_info?.flight_id || '', // Handle flight_id from flight_info if it exists
      flight_from: parcel.flight_info?.flight_from?.toLowerCase() || '', // Handle flight_from from flight_info
      arrived_at: parcel.flight_info?.arrived_at || '', // Handle arrived_at from flight_info
    });  };
  return (
    <div className="p-10 min-h-screen">
      <div className="mx-auto bg-white rounded-lg p-8">
        <div className="flex justify-between mb-6 flex-col">
          <Button type="primary" onClick={handleManualOpen}>
            +  ექსელით შექმნა   +
          </Button>
          <Button type="primary" onClick={handleSingleParcelOpen} className="mt-4">
            + ერთის შექმნა +
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
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleUploadFinish}>
            <Form.Item label="Flight ID" name="flight_id">
              <Input />
            </Form.Item>
            <Form.Item label="Flight From" name="flight_from">
              <Select>
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="Turkey">Turkey</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Arrived At" name="arrived_at">
              <Input />
            </Form.Item>
            <Upload.Dragger
              name="file"
              multiple={false}
              accept=".xlsx, .xls"
              beforeUpload={(file) => {
                handleFileUpload(file);
                return false;
              }}
              className="mb-4"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single file upload in .xlsx or .xls format.</p>
            </Upload.Dragger>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={createMutation.isPending} className="w-full">
                Save Parcel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
{/* 
 */}

<Modal
          title="Edit Parcel"
          open={isEditModalOpen}
          onCancel={handleEditCancel}
          footer={null}
        >
          <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
            {/* <Form.Item
              label="Flight ID"
              name="flight_id"
              rules={[{ required: true, message: 'Please enter a Flight ID' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Flight From"
              name="flight_from"
              rules={[{ required: true, message: 'Please select a Flight From' }]}
            >
              <Select>
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="turkey">Turkey</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Arrived At"
              name="arrived_at"
              rules={[{ required: true, message: 'Please enter Arrival Information' }]}
            >
              <Input />
            </Form.Item> */}
            <Form.Item
              label="Tracking ID"
              name="tracking_id"
              rules={[{ required: true, message: 'Please enter a Tracking ID' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Owner ID"
              name="ownerId"
              rules={[{ required: true, message: 'Please enter an Owner ID' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Shipping Status"
              name="shipping_status"
              rules={[{ required: true, message: 'Please enter a Shipping Status' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Payment Status"
              name="payment_status"
              rules={[{ required: true, message: 'Please enter a Payment Status' }]}
            >
              <Select>
                <Select.Option value="PAID">PAID</Select.Option>
                <Select.Option value="UNPAID">UNPAID</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={updateMutation.isPending} className="w-full">
                Update Parcel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      {/*  */}
        <Modal
          title="Add Single Parcel"
          open={isSingleParcelModalOpen}
          onCancel={handleSingleParcelCancel}
          footer={null}
        >
          <Form form={singleParcelForm} layout="vertical" onFinish={handleSingleParcelFinish}>
            <Form.Item
              label="Flight ID"
              name="flight_id"
              rules={[{ required: true, message: 'Please enter a Flight ID' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Flight From"
              name="flight_from"
              rules={[{ required: true, message: 'Please select a Flight From' }]}
            >
              <Select>
                <Select.Option value="china">China</Select.Option>
                <Select.Option value="turkey">Turkey</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Arrived At"
              name="arrived_at"
              rules={[{ required: true, message: 'Please enter Arrival Information' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tracking ID"
              name="tracking_id"
              rules={[{ required: true, message: 'Please enter a Tracking ID' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Owner ID"
              name="ownerId"
              rules={[{ required: true, message: 'Please enter an Owner ID' }]}
            >
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

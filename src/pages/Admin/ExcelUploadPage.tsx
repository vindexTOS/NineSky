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
  const [singleParcelForm] = Form.useForm();

  const handleManualOpen = () => {
    form.resetFields();
    setIsModalOpen(true);
    setSelectedParcel(null);
  };

  const handleSingleParcelOpen = () => {
    singleParcelForm.resetFields();
    setIsSingleParcelModalOpen(true);
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

  const handleFinish = (values: any) => {
    const convertedValues = {
      ...values,
      tracking_id: values.tracking_id ? values.tracking_id : undefined,
      flight_id: values.flight_id ? values.flight_id : undefined,
      arrived_at: values.arrived_at,
      weight: values.weight ? String(values.weight) : undefined,
      price: values.price ? Number(values.price) : undefined,
      ownerId: values.ownerId ? values.ownerId : undefined,
      id: values.id,
    };

    if (selectedParcel) {
      updateMutation.mutate({ ...convertedValues });
    } else {
      const arr = [];
      arr.push(convertedValues);
      createMutation.mutate(arr);
      handleCancel();
    }
  };

  const handleSingleParcelFinish = (values: any) => {
    const arr = [];
    arr.push(values);
    createMutation.mutate(arr);
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
        <Button type="primary" onClick={() => handleEdit(parcel)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (parcel: any) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
    form.setFieldsValue(parcel);
  };

  return (
    <div className="p-10 min-h-screen">
      <div className="mx-auto bg-white rounded-lg p-8">
        <div className="flex justify-between mb-6 flex-col">
          <Button type="primary" onClick={handleManualOpen}>
            + Parcel Upload +
          </Button>
          <Button type="primary" onClick={handleSingleParcelOpen} className="mt-4">
            + Add Single Parcel +
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

        <Modal
          title="Add Single Parcel"
          open={isSingleParcelModalOpen}
          onCancel={handleSingleParcelCancel}
          footer={null}
        >
          <Form form={singleParcelForm} layout="vertical" onFinish={handleSingleParcelFinish}>
            <Form.Item label="Tracking ID" name="tracking_id">
              <Input />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Owner ID" name="ownerId">
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

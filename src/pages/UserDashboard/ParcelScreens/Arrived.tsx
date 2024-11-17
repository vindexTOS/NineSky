
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../../API/User/GetRequests';
import { FakeParcldata } from '../../../assets/data/fakeJson';
import ParcelsTable from '../../../components/parcels/ParcelsTable';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import Cookies from 'universal-cookie';
import { Button, Modal, Table } from 'antd';
import { PayForParcel } from '../../../API/Deposite/Deposite';
export default function Arrived() {

  const [userInfo, setUserInfo] = useState<any>()
  const [StorageData, setStorageData] = useState([])
  const [payAmount, setPayAmount] = useState<any>(0)
  const [openModal, setOpenModal] = useState(false)
  const [selectedRows, setSelectedRows] = useState<any>([]);
 const [selectedRowPrice,setSelectedRowPrice] = useState<number>(0)

  const handleSelectedRowPrice = (rb:any)=>{
        console.log(rb)

        let totalPrice = rb.map((val:any)=> Number(val.price)).reduce((a:number,b:number)=> a + b)
    setSelectedRowPrice(totalPrice)
    
  }
  const cookies = new Cookies()
  useEffect(() => {

    const decode = async () => {
      let token = await cookies.get("token")


      let decodedUser = await jwt_decode(token)
 
      setUserInfo(decodedUser)
    }

    decode()

  }, [])




  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => userInfo ? GetUserInfo() : Promise.resolve(),
    enabled: !!userInfo
  });
  useEffect(() => {
    if (data && data?.data) {
 
      let newData = data.data.parcels.filter((val: any) => val.shipping_status == "Arrived")
      setStorageData(newData)
    }
  }, [data])


const mutation  = useMutation({
mutationFn:(body)=>{
   return PayForParcel (body)
}   
}) 

const payMoney =async ()=>{
     await mutation.mutateAsync(selectedRows)
     setOpenModal(false);
}


const calclatePayAmount = () => {
  const unpaidItems = StorageData.filter((val: any) => val.payment_status === 'Unpaid');

   if (unpaidItems.length > 0) {
    const amountPay: number = unpaidItems
      .map((val: any) => Number(val.price))
      .reduce((a, b) => a + b);

    setPayAmount(amountPay.toFixed(2));
  } else {
    setPayAmount(0);
  }
  
 };

  useEffect(() => {
    console.log(StorageData)
    if (StorageData.length > 0) {
      calclatePayAmount()
    }

  }, [StorageData])


 

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Payment Status',
      dataIndex: 'payment_status',
      key: 'payment_status',
    },
    {
      title: 'Shipping Status',
      dataIndex: 'shipping_status',
      key: 'shipping_status',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log( selectedRowKeys)
      let newArr =  selectedRowKeys.map((val:any)=> {
        return {tracking_id:val}
      })
      console.log(newArr)
      setSelectedRows(newArr);
      handleSelectedRowPrice (selectedRows)
    },
  };



  return (
    <div>
      <div className="flex items-center flex-row gap-5">
        <h1>
          გადასახდელი თანხა ჯამური <span className="text-green-500">${payAmount}</span>
        </h1>
        <Button onClick={() => setOpenModal(true)}>გადახდა</Button>
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          title="Arrived Parcels"
          footer={null}
        >
          <div><p>  გადასახდელი ჯამი: <span>{selectedRowPrice.toFixed(2)}</span></p></div>
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={StorageData.filter((val:any)=> val.payment_status == 'Unpaid').map((item: any) => ({ ...item, key: item.id }))}
            pagination={false}
          />
          <div className="mt-4 flex justify-end">
            <Button
              type="primary"
              onClick={payMoney}
            >
            გადახდა
            </Button>
          </div>
        </Modal>
      </div>
      <ParcelsTable data={StorageData} color={'#ffb71c'} title={'ჩამოსული'} />
    </div>

  );
}

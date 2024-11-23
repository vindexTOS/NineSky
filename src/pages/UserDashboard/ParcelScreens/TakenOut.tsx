 
import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../../API/User/GetRequests';
import { FakeParcldata } from '../../../assets/data/fakeJson';
import ParcelsTable from '../../../components/parcels/ParcelsTable';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import Cookies from 'universal-cookie';
export default function TakenOut() {

  const [userInfo, setUserInfo] = useState<any>()
  const [StorageData,setStorageData] = useState([])
  const cookies = new Cookies()
  useEffect(() => {

    const decode = async () => {
      let token = await cookies.get("token")
 

      let decodedUser = await jwt_decode(token)
      // console.log(decodedUser)
      setUserInfo(decodedUser)
    }

    decode()

  }, [])

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["user-info"  ],
    queryFn: () => userInfo ? GetUserInfo( ) : Promise.resolve(),
    enabled: !!userInfo
  });
      useEffect(()=>{
        if(data && data?.data ){
          // console.log(data.data.parcels)
  let newData = data.data.parcels.filter((val:any) => val.shipping_status == "Taken")
  setStorageData (newData)
        }
      },[data])

  return (

    <ParcelsTable refetch={refetch} data={StorageData} color={'#00cd63'} title={'გატანილი'} />

  )
}

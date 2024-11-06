 
import { useQuery } from '@tanstack/react-query';
import { GetUserInfo } from '../../../API/User/GetRequests';
import { FakeParcldata } from '../../../assets/data/fakeJson';
import ParcelsTable from '../../../components/parcels/ParcelsTable';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import Cookies from 'universal-cookie';

export default function StorageUnit() {
  const [userInfo, setUserInfo] = useState<any>()
  const [StorageData,setStorageData] = useState()
  const cookies = new Cookies()
  useEffect(() => {

    const decode = async () => {
      let token = await cookies.get("token")
 

      let decodedUser = await jwt_decode(token)
      console.log(decodedUser)
      setUserInfo(decodedUser)
    }

    decode()

  }, [])

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user-info"  ],
    queryFn: () => userInfo ? GetUserInfo( ) : Promise.resolve(),
    enabled: !!userInfo
  });
      useEffect(()=>{
        console.log(data)
      },[data ])
   
     return (
     
       
       <ParcelsTable data={FakeParcldata}   color={'#579cff'}   title={'საწყობი'} />
 
     );
  
}

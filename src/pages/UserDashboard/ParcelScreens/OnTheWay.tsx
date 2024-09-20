 
 import { FakeParcldata } from '../../../assets/data/fakeJson';
import ParcelsTable from '../../../components/parcels/ParcelsTable';

export default function OnTheWay() {
 

  return (
 
       <ParcelsTable data={FakeParcldata}   color={'#ff5223'}   title={'გამოგზავნილი'} />

     )
}

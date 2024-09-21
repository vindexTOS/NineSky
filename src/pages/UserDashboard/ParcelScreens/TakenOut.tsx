
import { FakeParcldata } from '../../../assets/data/fakeJson';
import ParcelsTable from '../../../components/parcels/ParcelsTable';

export default function TakenOut() {

  return (

    <ParcelsTable data={FakeParcldata} color={'#00cd63'} title={'გატანილი'} />

  )
}

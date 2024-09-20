
import { FakeParcldata } from '../../../assets/data/fakeJson';

import ParcelsTable from '../../../components/parcels/ParcelsTable';

export default function Arrived() {



  return (
    <ParcelsTable data={FakeParcldata} color={'#ffb71c'} title={'ჩამოსული'} />
  );
}

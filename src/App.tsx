import React, { Children } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navbar/NonAuthNavBar';
import LayOut from './LayOut';
import EnteryPage from './pages/Entery/EnteryPage';
import UserMain from './pages/UserDashboard/UserMain';
import Parcel from './pages/UserDashboard/Parcel';
import StorageUnit from './pages/UserDashboard/ParcelScreens/StorageUnit';
import OnTheWay from './pages/UserDashboard/ParcelScreens/OnTheWay';
import Arrived from './pages/UserDashboard/ParcelScreens/Arrived';
import TakenOut from './pages/UserDashboard/ParcelScreens/TakenOut';
import Address from './pages/UserDashboard/Address';
import Transactions from './pages/UserDashboard/Transactions';
import Settings from './pages/UserDashboard/Settings';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';


const NotFound = () => <h1>404 - Not Found</h1>;



function App() {
  return (
    <LayOut  >
      <Routes>
        <Route path="/" element={<EnteryPage />} />

        <Route path="/user" element={<UserMain />}>
          {/* parcel */}
          <Route path="parcel" element={<Parcel />}>
            {/* parcel  children*/}
            <Route path="storage" element={<StorageUnit />} />
            <Route path="on-the-way" element={<OnTheWay />} />
            <Route path="arrived" element={<Arrived />} />
            <Route path="taken-out" element={<TakenOut />} />
        </Route>
          {/*address  */}
  <Route path="address" element={<Address />} />
  <Route path="transactions" element={<Transactions />} />
  <Route path="settings" element={<Settings />} />
        </Route>
{/* admin */}
 <Route path='/admin' element={<AdminLogin/>} />
 <Route path='/admin-dashboard' element={<AdminDashboard/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayOut>

  );
}

export default App;
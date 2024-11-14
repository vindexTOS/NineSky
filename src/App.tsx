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
import Guard from './Guard';
import MainPageGuard from './Guards/MainPageGuard';
import ExcelUploadPage from './pages/Admin/ExcelUploadPage';
import AdminAuthGuard from './Guards/AdminGuard';
import UsersManagment from './pages/Admin/UsersManagment';
import PriceManagment from './pages/Admin/PriceManagment';
import Terms from './pages/TermsAndServices/Terms';


const NotFound = () => <h1 className='h-[100vh] flex items-center  justify-center w-[100%] '>404 - Not Found</h1>;



function App() {
  return (
    <LayOut  >
      <Routes>
        <Route path="/" element={<MainPageGuard><EnteryPage /></MainPageGuard>} />

        <Route path="/user" element={<Guard><UserMain /></Guard>}>
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
 <Route path='/admin-dashboard' element={<AdminAuthGuard><AdminDashboard/></AdminAuthGuard>}  > 
 <Route path="excel-upload" element={<AdminAuthGuard><ExcelUploadPage/></AdminAuthGuard>} />
 <Route  path="user-managment"  element={<AdminAuthGuard><UsersManagment/></AdminAuthGuard>}/>
 <Route  path="price-managment"  element={<AdminAuthGuard><PriceManagment/></AdminAuthGuard>}/>
 </Route>
{/*  */}

        <Route path="*" element={<NotFound />} />
        {/* <Route path="/terms"  element={<Terms/>}    />  */}
      </Routes>
    </LayOut>

  );
}

export default App;
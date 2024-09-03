import React from 'react';
import {   Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navbar/NonAuthNavBar';
import LayOut from './LayOut';
import EnteryPage from './pages/Entery/EnteryPage';

 
const About = () => <h1>About Page</h1>;
const NotFound = () => <h1>404 - Not Found</h1>;

// Define the routes array
const routes = [
  { path: '/', element: <EnteryPage /> },
  { path: '/about', element: <About /> },
  { path: '*', element: <NotFound /> }  // Catch-all for undefined routes
];

function App() {
  return (
    <LayOut>
    
     

        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
   
    </LayOut>

  );
}

export default App;
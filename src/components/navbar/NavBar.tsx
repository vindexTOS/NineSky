import React from 'react'
import AuthNavBar from './AuthNavBar'
import NonAuthNavBar from './NonAuthNavBar'
import { useLocation } from 'react-router-dom'

function NavBar() {
    const location  =useLocation()

  return (
 <>
       {location.pathname.includes('/user')  ? <AuthNavBar/> : location.pathname.includes('/admin') ? '' : <NonAuthNavBar />}
</>
  )
}

export default NavBar
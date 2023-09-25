import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout({user,setUser}) {
  let navigate = useNavigate()
  function logout(){
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }
  return (
    <div>
        <Navbar user={user} logout={logout}/>
            <Outlet></Outlet>
        <Footer/>
    </div>
  )
}


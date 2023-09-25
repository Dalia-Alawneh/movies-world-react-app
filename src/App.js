import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Movies from './components/Movies/Movies.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Notfound from './components/Notfound/Notfound.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Protected from './components/Protected/Protected.jsx';

function App() {
  let [user, setUser] = useState(null)
  function getUser(){
    let token = localStorage.getItem('token')
    let usr = jwtDecode(token)
    setUser(usr)
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getUser()
    }
  },[])
  const routes = createBrowserRouter([
    {
      path:'', element:<Layout user={user} setUser={setUser}/>,children:[
        {index:true, element:<Home></Home>},
        {path:'movie', element:<Protected><Movies/></Protected>},
        {path:'login', element:<Login getUser={getUser}/>},
        {path:'register', element:<Register/>},
        {path:"*", element:<Notfound/>}
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;

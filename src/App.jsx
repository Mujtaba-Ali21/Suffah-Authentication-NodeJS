import React from 'react'
import Navbar from './Component/Navbar'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import { Route, Routes } from 'react-router-dom'
import "./index.css"
import useAuth from "./hooks/useAuth"
import Permission from './Component/Permission'
import Signup from './Component/Signup'
import Universal from './Component/Universal'
// import Logout from './Component/Logout'
function App() {
  const {isLoggedIn} = useAuth()
  return (
    <>
    <Navbar></Navbar>
  
     <div>
       <Routes>
        <Route path='/' element={<Login/>}/>
        {/* <Route path='/logout' element={<Logout/>}/> */}
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard/> : <Permission/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path='*' element={<Universal/>}/>

       </Routes>
     </div>
     </>
    )
}

export default App
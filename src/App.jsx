import { useContext, useState } from 'react'
import './App.css'
import Announce from './Components/Announcements/Announce.jsx'
import Complaint from './Components/Complaints/Complaint.jsx'
import Faculty from './Components/Faculty/Faculty.jsx'
import Landing from './Components/Landingpage/Landing.jsx'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Components/Home/Home.jsx'
import { Route,Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import { AuthContext } from './context/AuthContext.jsx'
function App() {
  const {user,loading}= useContext(AuthContext)
  if(loading){
    return(
      <h2>Loading....</h2>
    )
  }
  return (
    <>
     <Header/>
     <Routes> 
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={user? <Navigate to="/home"/>: <Landing/>}/>
      <Route path="/home" element={user? <Home/>:<Landing/>}/>
      <Route path="/complaints" element={<Complaint/>}/>
      <Route path="/announcements" element={<Announce/>}/>
      <Route path="/faculty" element={<Faculty/>}/>
     </Routes>
     <Footer/>
    </>

  )
}

export default App

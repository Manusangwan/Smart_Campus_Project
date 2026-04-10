import { useState } from 'react'
import './App.css'
import Announce from './Components/Announcements/Announce.jsx'
import Complaint from './Components/Complaints/Complaint.jsx'
import Faculty from './Components/Faculty/Faculty.jsx'
import Landing from './Components/Landingpage/Landing.jsx'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
function App() {
  
  return (
    <>
      {/* <Landing/> */}
      {/* <Announce/> */}
      {/* <Complaint/> */}
      {/* <Faculty/> */}
      {/* <Landing/> */}
      <Header></Header>
      <Landing></Landing>
      <Footer></Footer>
    </>

  )
}

export default App

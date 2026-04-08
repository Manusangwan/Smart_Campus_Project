import { useState } from 'react'
import './App.css'
import Announce from './Components/Announcements/Announce.jsx'
import Complaint from './Components/Complaints/Complaint.jsx'
import Faculty from './Components/Faculty/Faculty.jsx'
function App() {
  
  return (
    <>
      <Announce/>
      <Complaint/>
      <Faculty/>
    </>
  )
}

export default App

import { Route, Routes, Navigate } from "react-router-dom";
import Announce from "./Components/Announcements/Announce.jsx";
import Complaint from "./Components/Complaints/Complaint.jsx";
import Faculty from "./Components/Faculty/Faculty.jsx";
import Landing from "./Components/Landingpage/Landing.jsx";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Components/Home/Home.jsx";
import PollPage from "./pages/PollPage.jsx";

function App() {
  let user = true;

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Landing />} />
        <Route path="/home" element={user ? <Home /> : <Landing />} />
        <Route path="/complaints" element={<Complaint />} />
        <Route path="/announcements" element={<Announce />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/poll" element={<PollPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
// ==============================
// src/App.jsx
// ==============================

import "./App.css";
import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

import Landing from "./Components/Landingpage/Landing.jsx";
import Home from "./Components/Home/Home.jsx";
import Complaint from "./Components/Complaints/Complaint.jsx";
import Announce from "./Components/Announcements/Announce.jsx";
import Faculty from "./Components/Faculty/Faculty.jsx";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import PollPage from "./pages/PollPage.jsx";

import { AuthContext } from "./context/AuthContext.jsx";

function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Header />

            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={user ? <Navigate to="/home" /> : <Landing />}
                />

                <Route
                    path="/login"
                    element={user ? <Navigate to="/home" /> : <Login />}
                />

                <Route
                    path="/signup"
                    element={user ? <Navigate to="/home" /> : <Signup />}
                />

                {/* Protected Routes */}
                <Route
                    path="/home"
                    element={user ? <Home /> : <Navigate to="/login" />}
                />

                <Route
                    path="/complaints"
                    element={user ? <Complaint /> : <Navigate to="/login" />}
                />

                <Route
                    path="/announcements"
                    element={user ? <Announce /> : <Navigate to="/login" />}
                />

                <Route
                    path="/faculty"
                    element={user ? <Faculty /> : <Navigate to="/login" />}
                />

                <Route
                    path="/poll"
                    element={user ? <PollPage /> : <Navigate to="/login" />}
                />

                {/* Fallback */}
                <Route
                    path="*"
                    element={<Navigate to={user ? "/home" : "/"} />}
                />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
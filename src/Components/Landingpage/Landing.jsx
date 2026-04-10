import React from "react";
import './Landing.css'
import Showcard from "./Showcard";
import Stepcard from "./Stepcard";
import Navbar from "./navbar";
export default function Landing(){
    return(
        <div>
            <div id="hero">
                <div id="content">
                    <p id="heading">Smart Campus Assistant</p>
                    <p id="para">Manage complaints, announcements, and faculty details in one place.</p>
                    <div>
                        <button className="bt sign next">Get Started</button>
                    </div>
                </div>
            </div>
            <div className="boxcontainer">
                <div className="cardbox">
                    <Showcard imglink="/megaphone.png" title="Announcements" info="Stay updated with latest campus news" color="pink"/>
                    <Showcard imglink="/complaints.png" title="Complaints" info="Raise and track your issues early" color="yellow"/>
                    <Showcard imglink="/facultyfinder.png" title="Faculty Finder" info="Find faculty details instantly" color="blue"/>
                </div>
            </div>
            <div id="maintext">
                <p id="styletext">How  It  Works</p>
            </div>
            <div className="boxcontainer">
                <div className="cardbox">
                    <Stepcard num={1} text={"Login to platform"} info={"Sign up or log in with your student account"} color="blu"/>
                    <Stepcard num={2} text={"Access Services"} info={"Quickly navigate to announcements, complaints, and faculty finder"} color="green"/>
                    <Stepcard num={3} text={"Get issues resolved"} info={"Report problems and get them resolved quickly"} color="darkyellow"/>
                </div>
            </div>
            <div id="last">
                <div id="campus">
                    <p id="text">Ready to simplify your campus life?</p>
                    <button className="bts sign nexting">Sign Up Now</button>
                </div>
            </div>
        </div>
            
    )
}
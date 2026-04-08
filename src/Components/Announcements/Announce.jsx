import React, { useState, useEffect } from "react";
import announcements from './Announce.js'
import Card from "./Card.jsx";
import './Announce.css'
export default function Announce(){
    const [active,setactive]= useState("btn1")
    const [announcement, setannouncement]= useState(announcements)
    const [filteredarray,setfilteredarray]= useState(announcement)
    useEffect(()=>{
        setfilteredarray(announcement)
    },[announcement])
    function filterinternship(){
        setfilteredarray(announcement.filter((obj)=>{
            return obj.category==="Internship"
        }))
    }
    function filteropportunities(){
        setfilteredarray(announcement.filter((obj)=>{
            return obj.category==="Opportunities"
        }))
    }
    function filterevents(){
        setfilteredarray(announcement.filter((obj)=>{
            return obj.category==="Events"
        }))
    }
    function filterurgent(){
        setfilteredarray(announcement.filter((obj)=>{
            return obj.category==="Urgent"
        }))
    }
    const sorteddata= [...filteredarray].sort((a, b) => {
  const now = new Date();
  if (a.category === "Urgent" && b.category !== "Urgent") return -1;
  if (b.category === "Urgent" && a.category !== "Urgent") return 1;

  if (a.deadline && b.deadline) {
    return new Date(a.deadline) - new Date(b.deadline);
  }

  return new Date(b.createdAt) - new Date(a.createdAt);

    });
    return(
        <div id="mainbox">
        <div id="box">
            <h1 id="heading">Announcements</h1>
            <div id="bttext">
                <button onClick={()=>{setactive("btn1")
                    setfilteredarray(announcement)}}
                className={active==="btn1" ? "active_btn" : "bt"}>All</button>
                <button onClick={()=>{setactive("btn2")
                    filterinternship()}} className={active==="btn2" ? "active_btn" : "bt"}>Internships</button>
                <button onClick={()=>{setactive("btn3")
                    filteropportunities()}} className={active==="btn3" ? "active_btn" : "bt"}>Opportunities</button>
                <button onClick={()=>{setactive("btn4")
                    filterevents()}} className={active==="btn4" ? "active_btn" : "bt"}>Events</button>
                <button onClick={()=>{setactive("btn5")
                    filterurgent()}} className={active==="btn5" ? "active_btn" : "bt"}>Urgent</button>
            </div>
            <div id="line"></div>
            <div id="cardholder">
                {
                    sorteddata.map((declare)=>{
                        return (
                            <Card key={declare.id} announce={declare}/>
                        )
                    })
                }
            </div>
        </div>
        </div>
    )
}
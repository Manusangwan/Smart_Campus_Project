import React from "react";
import { useState , useEffect} from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import './Card.css'
dayjs.extend(relativeTime);

export default function Card({announce }) {
    const [now, setnow] = useState(dayjs())
    useEffect(() => {
        const interval = setInterval(() => {
            setnow(dayjs())
        }, 60000)
        return () => clearInterval(interval)
    }, [])

    const daysleft = () => {
        const end = dayjs(announce.deadline)
        const days = end.diff(now, "day")
        return days > 0 ? `${days} days left` : "Expired";
    }

    const timeago= ()=>{
        const posted= dayjs(announce.createdAt)
        if(now.diff(posted,"minute")<1) return "Just now";
        if(now.diff(posted,"day")===1) return "Yesterday";
        if(now.diff(posted,"day")<7) return `${now.diff(posted,"day")} days ago`
        if(now.diff(posted,"week")===1) return "Last week";
        return posted.from(now);
    }

    const formatdate= ()=>{
        return dayjs(announce.eventDate).format("D MMMM YYYY")
    }

    function getcolor(category){
        if(category==="Urgent"){
            return "#fee2e2";
        }
        if(category==="Internship"){
            return "#fef9c3";
        }
        if(category==="Opportunities"){
            return "#dcfce7";
        }
        return "#dbeafe";
    }
    function getcolour(category){
        if(category==="Urgent"){
            return "#dc2626";
        }
        if(category==="Internship"){
            return "#ca8a04";
        }
        if(category==="Opportunities"){
            return "#16a34a";
        }
        return "#2563eb";
    }
    return (
        <div id="outer">
            <div id="inner">
                <div id="first">
                     <h2>{announce.title}</h2>
                <p>{announce.description}</p>
                {(announce.category === "Opportunities" || announce.category === "Internship") &&
                    (
                        <p className="inf deadline">{daysleft()}</p>
                    )}
                {(announce.category === "Urgent") &&
                    (
                        <p className="inf">Posted {timeago()}</p>
                    )}
                {(announce.category === "Event") &&
                    (
                        <p className="inf deadline">Date: {formatdate()}</p>
                    )}
                </div>
                <div id="cat"><span id="head" style={{backgroundColor: getcolor(announce.category), color:getcolour(announce.category), borderColor:getcolour(announce.category)}}>{announce.category}</span></div>
            </div>
        </div>
    )
}
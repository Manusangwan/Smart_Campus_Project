import React from "react";
import { useState, useEffect } from "react";
import '../Announcements/Card.css'
import './ComplaintCard.css'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function ComplaintCard({ comp, upvotehandler }) {
    const [now, setnow] = useState(dayjs())
    useEffect(() => {
        const interval = setInterval(() => {
            setnow(dayjs())
        }, 60000)
        return () => clearInterval(interval)
    }, [])
    function getstatusicon(status) {
        if (status === "Resolved") return "✔";
        if (status === "Pending") return "⚠";
        if (status === "In Progress") return "↻";
        return "";
    }
    function getstatusclass(status) {
        if (status === "Resolved") return "resolved";
        if (status === "Pending") return "pending";
        return "progress";
    }
    const timeago = () => {
        const posted = dayjs(comp.createdAt)
        if (now.diff(posted, "minute") < 1) return "Just now";
        if (now.diff(posted, "hour") < 1)
            return `${now.diff(posted, "minute")} min ago`;
        if (now.diff(posted, "day") < 1)
            return `${now.diff(posted, "hour")} hrs ago`;
        if (now.diff(posted, "day") === 1) return "Yesterday";
        if (now.diff(posted, "day") < 7) return `${now.diff(posted, "day")} days ago`
        if (now.diff(posted, "week") === 1) return "Last week";
        return posted.from(now);
    }
    return (
        <div id="outer">
            <div id="inner" className="in">
                <div id="balance">
                    <div id="com">
                        <h2>{comp.title}</h2>
                        <p>{comp.description}</p>
                    </div>
                    <div id="stat">
                        <span className={`status ${getstatusclass(comp.status)}`}>{getstatusicon(comp.status)} {comp.status}</span>
                    </div>
                </div>
                <div>
                    <p>
                        <button
  className={`mybt ${comp.userUpvoted ? "active" : ""}`}
  onClick={() => upvotehandler(comp.id)}
>
  ▲ {comp.upvotes} upvotes
</button>
                        <span id="graytext">    | Posted {timeago()}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import complaints from "./Complaint";
import ComplaintCard from "./ComplaintCard";
import '../Announcements/Announce.css'
import './Complaint.css'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Form from "./Form";

dayjs.extend(relativeTime);

export default function Complaint() {

    const [activetab, setactivetab] = useState("All");
    const [complaint, setcomplaint] = useState(complaints)
    const [search, setsearch] = useState("")
    const [statusfilter, setstatusfilter] = useState("All")

    const location = useLocation();

    const user = "user1"
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(dayjs());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // 🔥 DIRECT OPEN FORM
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("new") === "true") {
            setactivetab("New");
        }
    }, [location]);

    useEffect(() => {
        setsearch("");
        setstatusfilter("All")
    }, [activetab]);

    let filteredarr = complaint

    if (activetab === "My") {
        filteredarr = filteredarr.filter(c => c.createdBy === user);
    }

    if (activetab === "Recent") {
        filteredarr = filteredarr.filter(c =>
            dayjs(c.createdAt).isSame(now, "day")
        );
    }

    if (statusfilter !== "All") {
        filteredarr = filteredarr.filter((c) => {
            return c.status === statusfilter;
        })
    }

    if (search.trim() !== "") {
        filteredarr = filteredarr.filter((c) => {
            return c.title.toLowerCase().includes(search.toLowerCase()) ||
                   c.description.toLowerCase().includes(search.toLowerCase())
        })
    }

    filteredarr = [...filteredarr].sort((a, b) => b.upvotes - a.upvotes);

    // 🔥 TOGGLE UPVOTE
    function upvotehandler(id) {
        setcomplaint((prev) =>
            prev.map((c) => {
                if (c.id === id) {
                    return {
                        ...c,
                        upvotes: c.userUpvoted ? c.upvotes - 1 : c.upvotes + 1,
                        userUpvoted: !c.userUpvoted,
                    };
                }
                return c;
            })
        );
    }

    return (
        <div id="mainbox">
            <div id="box">

                <h1 id="heading">Complaints</h1>

                <div id="bttext">
                    <button onClick={() => setactivetab("All")}
                        className={activetab === "All" ? "active_btn" : "bt"}>
                        All Complaints
                    </button>

                    <button onClick={() => setactivetab("My")}
                        className={activetab === "My" ? "active_btn" : "bt"}>
                        My Complaints
                    </button>

                    <button onClick={() => setactivetab("Recent")}
                        className={activetab === "Recent" ? "active_btn" : "bt"}>
                        Recent Complaints
                    </button>

                    <button onClick={() => setactivetab("New")}
                        className={activetab === "New" ? "active_btn" : "bt"}>
                        + New Complaint
                    </button>
                </div>

                <div id="line"></div>

                <div id="extra">

                    {activetab !== "New" && (
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search Complaints...."
                                value={search}
                                onChange={(e) => setsearch(e.target.value)}
                            />
                            <svg className="icon" viewBox="0 0 24 24">
                                <path d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                            </svg>
                        </div>
                    )}

                    {activetab !== "New" && (
                        <select
                            id="drop"
                            value={statusfilter}
                            onChange={(e) => setstatusfilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                            <option value="In Progress">In Progress</option>
                        </select>
                    )}
                </div>

                <div id="cardhold">

                    {activetab !== "New" &&
                        filteredarr.map((comp) => (
                            <ComplaintCard
                                key={comp.id}
                                comp={comp}
                                upvotehandler={upvotehandler}
                            />
                        ))
                    }

                    {activetab === "New" && (
                        <Form complaint={complaint} upvotehandler={upvotehandler} />
                    )}

                </div>

            </div>
        </div>
    )
}
import React, { useEffect } from "react";
import { useState } from "react";
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
    const user = "user1"
    const [now, setNow] = useState(dayjs());
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(dayjs());
        }, 60000);

        return () => clearInterval(interval);
    }, []);
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
            return c.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || c.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        })
    }
    filteredarr = [...filteredarr].sort((a, b) => b.upvotes - a.upvotes);

    function upvotehandler(id) {
        setcomplaint((prev) => {
            return prev.map((c) => {
                if (c.id === id && !c.userUpvoted) {
                    return {
                        ...c,
                        upvotes: c.upvotes + 1,
                        userUpvoted: true
                    }
                }
                return c;
            })
        })
    }

    return (
        <div id="mainbox">
            <div id="box">
                <h1 id="heading">Complaints</h1>
                <div id="bttext">
                    <button onClick={() => setactivetab("All")} className={activetab === "All" ? "active_btn" : "bt"}>All Complaints</button>
                    <button onClick={() => setactivetab("My")} className={activetab === "My" ? "active_btn" : "bt"}>My Complaints</button>
                    <button onClick={() => setactivetab("Recent")} className={activetab === "Recent" ? "active_btn" : "bt"}>Recent Complaints</button>
                    <button onClick={() => setactivetab("New")} className={activetab === "New" ? "active_btn" : "bt"}>+ New Complaint</button>
                </div>
                <div id="line"></div>
                <div id="extra">
                    <div >
                        {activetab !== "New" && (
                            <div className="search-container">
                                <input type="text" placeholder="Search Complaints...." value={search} onChange={(e) => setsearch(e.target.value)} />
                                <svg class="icon" viewBox="0 0 24 24">
                                    <path d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                                </svg>
                            </div>

                        )}
                    </div>
                    <div>
                        {activetab !== "New" && (
                            <div>
                                {/* <label htmlFor="status">Sort By:</label> */}
                                <select id="drop" value={statusfilter} onChange={(e) => setstatusfilter(e.target.value)}>
                                    <option value="All">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="In Progress">In Progress</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                <div id="cardhold">
                    {activetab === "All" && (
                        filteredarr.map((comp) => {
                            return <ComplaintCard key={comp.id} comp={comp} upvotehandler={upvotehandler} />
                        })
                    )}
                    {activetab === "My" && (
                        filteredarr.map((comp) => {
                            return <ComplaintCard key={comp.id} comp={comp} upvotehandler={upvotehandler} />
                        })
                    )}
                    {activetab === "Recent" && (
                        filteredarr.map((comp) => {
                            return <ComplaintCard key={comp.id} comp={comp} upvotehandler={upvotehandler} />
                        })
                    )}
                    {activetab === "New" && (
                        <Form complaint={complaint} upvotehandler={upvotehandler} />
                    )}
                </div>
            </div>
        </div>
    )
}
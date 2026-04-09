import React from "react";
import './Stepcard.css'
export default function Stepcard({num,text,info,color}){
    return(
        <div id="outerbox">
            <div id="innerbox">
                <div id="first">
                    <span className={`circle ${color}`}>{num}</span>
                    <span id="chat">{text}</span>
                </div>
                <div id="chatcontent">
                    <p>{info}</p>
                </div>
            </div>
        </div>
    )
}
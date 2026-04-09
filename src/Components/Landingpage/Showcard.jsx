import React from "react";
import './Showcard.css'
export default function Showcard({imglink,title,info,color}){
    return(
        <div id="outercard" className={color}>
            <div id="innercard">
                <img src={imglink} alt="" width="50px" height="50px" />
                <p id="some">{title}</p>
                <p id="extra">{info}</p>
            </div>
        </div>
    )
}
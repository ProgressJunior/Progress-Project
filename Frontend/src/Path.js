import React, { useState } from "react";
import Xarrow from "react-xarrows";
import "./path.css";
import useWindowDimensions from "./useWindowDimensions.js";

function Path() {
    const { height, width } = useWindowDimensions();
    let arrowStrokeWidth = 0.0015*width;
    let count = 0;

    let pathArray = [   "TP8","TP9","TP11","EMPTY","TP14.1","TP18",
                        "TP7","TP10","TP12","TP13","TP14","TP16",
                        "TP6","TP5","EMPTY","TP24","TP22","TP17",
                        "TP3","TP4","EMPTY", "TP25","TP23","TP18",
                        "TP2","TP1","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"]
    
    let path1 = [       "TP8","TP9","TP11","EMPTY","TP14.1","TP18",
                        "ACTIVE","ACTIVE","ACTIVE","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"]   

    let path2 = [   "ACTIVE","ACTIVE","ACTIVE","EMPTY","TP14.1","TP18",
                        "ACTIVE","TP10","ACTIVE","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"] 

    let path3 = [   "TP8","TP9","TP11","EMPTY","ACTIVE","ACTIVE",
                    "ACTIVE","ACTIVE","ACTIVE","ACTIVE","ACTIVE","ACTIVE",
                    "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                    "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                    "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                    "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"]  

    let path4 = [   "ACTIVE","ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE",
                    "ACTIVE","TP10","ACTIVE","ACTIVE","ACTIVE","ACTIVE",
                    "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                    "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                    "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                    "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"]

    return (
        <div className="parent">

            {pathArray.map((element) => {
                // count needs to be incremented first and subtracted at path
                // because it cant be incremented at the end due to the fact
                // that divs are returned first
                count++;
                if (element === "EMPTY") {
                    return (<div className="empty"></div>)
                }
                else {
                    if(path4[count-1] === "ACTIVE") {
                        return (<div id={element} className="rectangle active" />)
                    }
                    return (<div id={element} className="rectangle disabled" />)
                }
            })}

            {/* <div id="TP8" className="rectangle disabled" />
            <div id="TP9" className="rectangle disabled" />
            <div id="TP11" className="rectangle disabled" />
            <div className="empty" />
            <div id="TP14.1" className="rectangle disabled" />
            <div id="TP18" className="rectangle disabled" />

            <div id="TP7" className="rectangle disabled" />
            <div id="TP10" className="rectangle disabled" />
            <div id="TP12" className="rectangle active" />
            <div id="TP13" className="rectangle disabled" />
            <div id="TP14" className="rectangle disabled" />
            <div id="TP16" className="rectangle active" />

            <div id="TP6" className="rectangle active" />
            <div id="TP5" className="rectangle active" />
            <div className="empty" />
            <div id="TP24" className="rectangle active" />
            <div id="TP22" className="rectangle active" />
            <div id="TP17" className="rectangle active" />

            <div id="TP3" className="rectangle active" />
            <div id="TP4" className="rectangle active" />
            <div className="empty" />
            <div id="TP25" className="rectangle disabled" />
            <div id="TP23" className="rectangle disabled" />
            <div id="TP18" className="rectangle disabled" />

            <div id="TP2" className="rectangle active" />
            <div id="TP1" className="rectangle active" />
            <div className="empty" />
            <div id="TP26" className="rectangle disabled" />
            <div className="empty" />
            <div id="TP19" className="rectangle disabled" />

            <div className="empty" />
            <div className="empty" />
            <div className="empty" />
            <div id="TP27" className="rectangle disabled" />
            <div id="TP21" className="rectangle disabled" />
            <div id="TP20" className="rectangle disabled" /> */}

            <Xarrow
                start="TP1" //can be react ref
                end="TP2" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />

            <Xarrow
                start="TP2" //can be react ref
                end="TP3" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />

            <Xarrow
                start="TP3" //can be react ref
                end="TP4" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />

            <Xarrow
                start="TP4" //can be react ref
                end="TP5" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />

            <Xarrow
                start="TP5" //can be react ref
                end="TP6" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />


            <Xarrow
                start="TP12" //can be react ref
                end="TP13" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />

            <Xarrow
                start="TP13" //can be react ref
                end="TP14" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />

            <Xarrow
                start="TP16" //can be react ref
                end="TP17" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />

            <Xarrow
                start="TP17" //can be react ref
                end="TP22" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />
            
            <Xarrow
                start="TP22" //can be react ref
                end="TP24" //or an id
                strokeWidth={arrowStrokeWidth}
                color="red"
            />
        </div>
    );
}

export default Path;

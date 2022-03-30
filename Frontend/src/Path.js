import React, { useState } from "react";
import Xarrow from "react-xarrows";
import "./path.css";
import useWindowDimensions from "./useWindowDimensions.js";

function Path(props) {
    const { height, width } = useWindowDimensions();
    let arrowStrokeWidth = 0.0015*width;
    let count = 0;


    let pathTemplate = [   "TP8","TP9","TP11","EMPTY","TP14.1","TP18",
                        "TP7","TP10","TP12","TP13","TP14","TP16",
                        "TP6","TP5","EMPTY","TP24","TP22","TP17",
                        "TP3","TP4","EMPTY", "TP25","TP23","TP18",
                        "TP2","TP1","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"]
    

    let pathArray = {
        "Path 1" : [    "TP8","TP9","TP11","EMPTY","TP14.1","TP18",
                        "ACTIVED","ACTIVED","ACTIVE","ACTIVED","ACTIVED","ACTIVED",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"],

        "Path 2" : [    "ACTIVED","ACTIVED","ACTIVED","EMPTY","TP14.1","TP18",
                        "ACTIVED","TP10","ACTIVED","ACTIVED","ACTIVED","ACTIVED",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"],

        "Path 3" : [    "TP8","TP9","TP11","EMPTY","ACTIVED","ACTIVED",
                        "ACTIVED","ACTIVED","ACTIVED","ACTIVED","ACTIVED","ACTIVED",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"],

        "Path 4" : [    "ACTIVED","ACTIVED","ACTIVED","EMPTY","ACTIVED","ACTIVED",
                        "ACTIVED","TP10","ACTIVED","ACTIVED","ACTIVED","ACTIVED",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"]
    }
    
    let arrowPaths = {
        "Path 1": [ <Xarrow start="TP7" end="TP10" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP10" end="TP12" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP14" end="TP16" strokeWidth={arrowStrokeWidth} color="red"/>],

        "Path 2" : [ <Xarrow start="TP7" end="TP8" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP8" end="TP9" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP9" end="TP11" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP11" end="TP12" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP14" end="TP16" strokeWidth={arrowStrokeWidth} color="red"/>],

        "Path 3" : [ <Xarrow start="TP7" end="TP10" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP10" end="TP12" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP14" end="TP14.1" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP14.1" end="TP18" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP18" end="TP16" strokeWidth={arrowStrokeWidth} color="red"/>],

        "Path 4" : [ <Xarrow start="TP7" end="TP8" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP8" end="TP9" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP9" end="TP11" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP11" end="TP12" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP14" end="TP14.1" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP14.1" end="TP18" strokeWidth={arrowStrokeWidth} color="red"/>,
        <Xarrow start="TP18" end="TP16" strokeWidth={arrowStrokeWidth} color="red"/>]
    }

    let temp = props.obj;

    return (
        <div className="parent">
            {pathTemplate.map((element) => {
                // count needs to be incremented first and subtracted at path
                // because it cant be incremented at the end due to the fact
                // that divs are returned first
                count++;
                if (element === "EMPTY") {
                    return (<div className="empty"></div>)
                }
                else {
                    if(pathArray["Path 1"][count-1] === "ACTIVE") {
                        return (<div id={element} className="rectangle active" />)
                    }
                    // ActiveD = ActiveDynamic
                    // aka. the part of the path that actually changes
                    else if(pathArray[temp][count-1] === "ACTIVED"){
                        return (<div id={element} className="rectangle activeD" />)
                    }
                    return (<div id={element} className="rectangle disabled" />)
                }
            })}

            {arrowPaths[temp].map((element) => {
                return element
            })}

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
                start="TP6" //can be react ref
                end="TP7" //or an id
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

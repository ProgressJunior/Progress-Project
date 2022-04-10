import React, { useState } from "react";
import Xarrow from "react-xarrows";
import "./path.css";
import useWindowDimensions from "./useWindowDimensions.js";

function Path(props) {
    const { height, width } = useWindowDimensions();
    let arrowStrokeWidth = 0.0015*width;
    let count = 0;


    let pathTemplate = [   "TP8","TP9","TP11","EMPTY","TP14.1","TP15",
                        "TP7","TP10","TP12","TP13","TP14","TP16",
                        "TP6","TP5","EMPTY","TP24","TP22","TP17",
                        "TP3","TP4","EMPTY", "TP25","TP23","TP18",
                        "TP2","TP1","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"
    ] 

    let pathArray = {
        "0" : [    "TP8","TP9","TP11","EMPTY","TP14.1","TP15",
                        "ACTIVED","ACTIVED","ACTIVE","ACTIVED","ACTIVED","ACTIVED",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"],

        "1" : [    "ACTIVED","ACTIVED","ACTIVED","EMPTY","TP14.1","TP15",
                        "ACTIVED","TP10","ACTIVED","ACTIVED","ACTIVED","ACTIVED",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"],

        "2" : [    "TP8","TP9","TP11","EMPTY","ACTIVED","ACTIVED",
                        "ACTIVED","ACTIVED","ACTIVED","ACTIVED","ACTIVED","ACTIVED",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"],

        "3" : [    "ACTIVED","ACTIVED","ACTIVED","EMPTY","ACTIVED","ACTIVED",
                        "ACTIVED","TP10","ACTIVED","ACTIVED","ACTIVED","ACTIVED",
                        "ACTIVE","ACTIVE","EMPTY","ACTIVE","ACTIVE","ACTIVE",
                        "ACTIVE","ACTIVE","EMPTY", "TP25","TP23","TP18",
                        "ACTIVE","ACTIVE","EMPTY","TP26","EMPTY","TP19",
                        "EMPTY","EMPTY","EMPTY","TP27","TP21","TP20"]
    }
    
    let arrowPaths = {
        "0": [ {start: "TP7"   , end: "TP10"  },
                    {start: "TP10"  , end: "TP12"  },
                    {start: "TP14"  , end: "TP16"  }],

        "1": [ {start: "TP7"   , end: "TP8"   },
                    {start: "TP8"   , end: "TP9"   },
                    {start: "TP9"   , end: "TP11"  },
                    {start: "TP11"  , end: "TP12"  },
                    {start: "TP14"  , end: "TP16"  }],

        "2": [ {start: "TP7"   , end: "TP10"  },
                    {start: "TP10"  , end: "TP12"  },
                    {start: "TP14"  , end: "TP14.1"},
                    {start: "TP14.1", end: "TP15"  },
                    {start: "TP15"  , end: "TP16"  }],

        "3": [ {start: "TP7"   , end: "TP8"   },
                    {start: "TP8"   , end: "TP9"   },
                    {start: "TP9"   , end: "TP11"  },
                    {start: "TP11"  , end: "TP12"  },
                    {start: "TP14"  , end: "TP14.1"},
                    {start: "TP14.1", end: "TP15"  },
                    {start: "TP15"  , end: "TP16"  }],        
    }

    let fixedArrows = [{start: "TP1",   end: "TP2"},
                        {start: "TP2",  end: "TP3"},
                        {start: "TP3",  end: "TP4"},
                        {start: "TP4",  end: "TP5"},
                        {start: "TP5",  end: "TP6"},
                        {start: "TP6",  end: "TP7"},
                        {start: "TP12", end: "TP13"},
                        {start: "TP13", end: "TP14"},
                        {start: "TP16", end: "TP17"},
                        {start: "TP17", end: "TP22"},
                        {start: "TP22", end: "TP24"}
    ]

    let temp = props.path;

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
                    if(pathArray["0"][count-1] === "ACTIVE")
                        return (<div id={element} className="rectangle active" />)
                    else if(pathArray[temp][count-1] === "ACTIVED")
                        return (<div id={element} className="rectangle activeD" />)
                    return (<div id={element} className="rectangle disabled" />)
                }
            })}

            {arrowPaths[temp].map((element) => {
                return (<Xarrow start={element.start} end={element.end} strokeWidth={arrowStrokeWidth} color="red"/>)
            })}

            {fixedArrows.map((element) => {
                return (<Xarrow start={element.start} end={element.end} strokeWidth={arrowStrokeWidth} color="red"/>)
            })}
            
        </div>
    );
}

export default Path;

import React from "react";
import Xarrow from "react-xarrows";
import "./path.css";
import useWindowDimensions from "./useWindowDimensions.js";

function Path(props) {
    const { width } = useWindowDimensions();
    let arrowStrokeWidth = 0.0015*width;
    let count = 0;
    let path = props.path;


    // EMTY = Empty          (aka. white space)
    // ACT  = Active         (aka. stations that can't be changed)
    // ACTD = Active Dynamic (aka. stations that can be changed)

    // PathTemplate and pathArray are to be looked at 
    // as a top down view of all the stations
    let pathTemplate = ["TP8",  "TP9",  "TP11", "EMTY", "TP14.1", "TP15",
                        "TP7",  "TP10", "TP12", "TP13", "TP14",   "TP16",
                        "TP6",  "TP5",  "EMTY", "TP24", "TP22",   "TP17",
                        "TP3",  "TP4",  "EMTY", "TP25", "TP23",   "TP18",
                        "TP2",  "TP1",  "EMTY", "TP26", "EMTY",   "TP19",
                        "EMTY", "EMTY", "EMTY", "TP27", "TP21",   "TP20"
    ] 

    let pathArray = {
            "0" : [     "TP8",  "TP9",  "TP11", "EMTY", "TP14.1", "TP15",
                        "ACTD", "ACTD", "ACT",  "ACTD", "ACTD",   "ACTD",
                        "ACT",  "ACT",  "EMTY", "ACT",  "ACT",    "ACT",
                        "ACT",  "ACT",  "EMTY", "TP25", "TP23",   "TP18",
                        "ACT",  "ACT",  "EMTY", "TP26", "EMTY",   "TP19",
                        "EMTY", "EMTY", "EMTY", "TP27", "TP21",   "TP20"],

            "1" : [     "ACTD", "ACTD", "ACTD", "EMTY", "TP14.1", "TP15",
                        "ACTD", "TP10", "ACTD", "ACTD", "ACTD",   "ACTD",
                        "ACT",  "ACT",  "EMTY", "ACT",  "ACT",    "ACT",
                        "ACT",  "ACT",  "EMTY", "TP25", "TP23",   "TP18",
                        "ACT",  "ACT",  "EMTY", "TP26", "EMTY",   "TP19",
                        "EMTY", "EMTY", "EMTY", "TP27", "TP21",   "TP20"],

            "2" : [     "TP8",  "TP9",  "TP11", "EMTY", "ACTD", "ACTD",
                        "ACTD", "ACTD", "ACTD", "ACTD", "ACTD", "ACTD",
                        "ACT",  "ACT",  "EMTY", "ACT",  "ACT",  "ACT",
                        "ACT",  "ACT",  "EMTY", "TP25", "TP23", "TP18",
                        "ACT",  "ACT",  "EMTY", "TP26", "EMTY", "TP19",
                        "EMTY", "EMTY", "EMTY", "TP27", "TP21", "TP20"],

            "3" : [     "ACTD", "ACTD", "ACTD", "EMTY", "ACTD", "ACTD",
                        "ACTD", "TP10", "ACTD", "ACTD", "ACTD", "ACTD",
                        "ACT",  "ACT",  "EMTY", "ACT",  "ACT",  "ACT",
                        "ACT",  "ACT",  "EMTY", "TP25", "TP23", "TP18",
                        "ACT",  "ACT",  "EMTY", "TP26", "EMTY", "TP19",
                        "EMTY", "EMTY", "EMTY", "TP27", "TP21", "TP20"]
    }
    
    // All the arrows that change dynamically
    let arrowPaths = {
        "0": [      {start: "TP7"   , end: "TP10"  },
                    {start: "TP10"  , end: "TP12"  },
                    {start: "TP14"  , end: "TP16"  }],

        "1": [      {start: "TP7"   , end: "TP8"   },
                    {start: "TP8"   , end: "TP9"   },
                    {start: "TP9"   , end: "TP11"  },
                    {start: "TP11"  , end: "TP12"  },
                    {start: "TP14"  , end: "TP16"  }],

        "2": [      {start: "TP7"   , end: "TP10"  },
                    {start: "TP10"  , end: "TP12"  },
                    {start: "TP14"  , end: "TP14.1"},
                    {start: "TP14.1", end: "TP15"  },
                    {start: "TP15"  , end: "TP16"  }],

        "3": [      {start: "TP7"   , end: "TP8"   },
                    {start: "TP8"   , end: "TP9"   },
                    {start: "TP9"   , end: "TP11"  },
                    {start: "TP11"  , end: "TP12"  },
                    {start: "TP14"  , end: "TP14.1"},
                    {start: "TP14.1", end: "TP15"  },
                    {start: "TP15"  , end: "TP16"  }],        
    }

    // All the arrows that stay the same no matter what
    let fixedArrows = [ {start: "TP1",  end: "TP2"},
                        {start: "TP2",  end: "TP3"},
                        {start: "TP3",  end: "TP4"},
                        {start: "TP4",  end: "TP5"},
                        {start: "TP5",  end: "TP6"},
                        {start: "TP6",  end: "TP7"},
                        {start: "TP12", end: "TP13"},
                        {start: "TP13", end: "TP14"},
                        {start: "TP16", end: "TP17"},
                        {start: "TP17", end: "TP22"},
                        {start: "TP22", end: "TP24"}]

    return (
        <div className="parent">
            {pathTemplate.map((element) => {
                // count needs to be incremented first and subtracted at path
                // because it cant be incremented at the end due to the fact
                // that divs are returned first
                count++;
                if (element === "EMTY") {
                    return (<div className="EMTY"></div>)
                }
                else {
                    if(pathArray["0"][count-1] === "ACT")
                        return (<div id={element} className="rectangle ACT" />)
                    else if(pathArray[path][count-1] === "ACTD")
                        return (<div id={element} className="rectangle ACTD" />)
                    return (<div id={element} className="rectangle disabled" />)
                }
            })}

            {arrowPaths[path].map((element) => {
                return (<Xarrow start={element.start} end={element.end} strokeWidth={arrowStrokeWidth} color="red"/>)
            })}

            {fixedArrows.map((element) => {
                return (<Xarrow start={element.start} end={element.end} strokeWidth={arrowStrokeWidth} color="red"/>)
            })}
            
        </div>
    );
}

export default Path;

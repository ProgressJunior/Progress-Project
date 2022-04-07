import React, { useState, useEffect } from "react";

// import use navigate
import { useNavigate } from "react-router-dom";

// import button from bootstrap
import Button from "react-bootstrap/Button";

// for css
import "./lastStep.css";

function LastSTep({ value }) {

    let navigate = useNavigate();

    return (
        <div className="lastStepParent">
            <p>Thank you</p>
            {/* Navigate to / */}                
            <Button className="lastButton"onClick={()=>{navigate("/")}}>Restart</Button>
        </div>
    );
}

export default LastSTep;

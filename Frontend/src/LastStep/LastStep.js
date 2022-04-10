import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./lastStep.css";

function LastSTep({ value }) {
    let navigate = useNavigate();
    return (
        <div className="lastStepParent">
            <p>Thank you</p>
            <Button className="lastButton"onClick={()=>{navigate("/")}}>Restart</Button>
        </div>
    );
}

export default LastSTep;

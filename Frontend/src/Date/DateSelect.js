import React, { useState, useEffect } from "react";

// import use navigate
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

// for css
import "./date.css";

function DateSelect({ childToParent }) {
    let navigate = useNavigate();

    const [date, setDate] = useState(new Date());

    function updateDate() {
        childToParent(date)
    }


    return (
        <div>
            <Button
                className="backButton"
                variant="outline-primary"
                onClick={() => {
                    navigate("/Storage");
                }}
            >
                Back
            </Button>
        </div>
    );
}

export default DateSelect;

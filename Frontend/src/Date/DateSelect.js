import React, { useState, useEffect } from "react";


// import use navigate
import { useNavigate } from "react-router-dom";


import Button from "react-bootstrap/Button";

// for css
import "./date.css";

// for Date and Time Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker'

function DateSelect({ childToParent }) {
    let navigate = useNavigate();

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('00:00')

    function updateDate() {
        let temp = date.toISOString().substring(0,11) + time + ":00.000"
        childToParent(temp);
        navigate("/Storage")
    }

    return (
        <div className="componentParent">
            <div className="dateContainer">
                <DatePicker className="dateWrapper" selected={date} onChange={(date) => setDate(date)} />
                <TimePicker className="timeWrapper" onChange={setTime} value={time}/>
            </div>

            <div className="buttonContainer">
                <Button
                    className="backButton"
                    variant="outline-primary"
                    onClick={() => {
                        navigate("/");
                    }}
                >Back</Button>

                <Button
                    className="backButton"
                    variant="outline-primary"
                    onClick={() => {
                        updateDate()
                    }}
                >Next</Button>
            </div>

        </div>
    );
}

export default DateSelect;

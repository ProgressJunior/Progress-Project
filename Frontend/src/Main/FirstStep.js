// For Date picker
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";

// For Dropdown
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

// For React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

// For Path
import Path from "./Path";
import "./firstStep.css"

function FirstStep() {
    const [date, setDate] = useState(Date.now);
    const [path, setPath] = useState("Path 1");

    let navigate = useNavigate();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <DatePicker
                    label="Basic example"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

                <Dropdown className="fixed20vw">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic"  className="fixed20vw">
                        {path}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="fixed20vw">
                        <Dropdown.Item onClick={()=> {setPath("Path 1")}}>Path 1</Dropdown.Item>
                        <Dropdown.Item onClick={()=> {setPath("Path 2")}}>Path 2</Dropdown.Item>
                        <Dropdown.Item onClick={()=> {setPath("Path 3")}}>Path 3</Dropdown.Item>
                        <Dropdown.Item onClick={()=> {setPath("Path 4")}}>Path 4</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Path path={path}/>

                <Button variant="outline-primary" onClick={()=> {navigate('/storage')}}>Primary</Button>{' '}
            </div>
        </LocalizationProvider>
    );
}

export default FirstStep;

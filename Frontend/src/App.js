import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import React, { useState } from "react";

import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

import Path from "./Path";
import "./app.css"

function App() {
    const [date, setDate] = useState(Date.now);
    const [path, setPath] = useState("Path 1");

    let test = {
        path: 'Path 1',
    }

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

                <Path obj={path}/>
            </div>
        </LocalizationProvider>
    );
}

export default App;

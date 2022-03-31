// For Date picker
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
// import { TextField } from "@mui/material";

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
        // <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                
                <div className="optionsWrapper "> 

                {/* <div className="fixed20vw fixed10vh">
                    <DatePicker
                        className="fixed20vw fixed10vh"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField className="fixed20vw" {...params} />}
                    />
                </div> */}
                

                <Dropdown className="fixed20vw fixed10vh">
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic"  className="fixed20vw">
                        {path}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="fixed20vw">
                        <Dropdown.Item onClick={()=> {setPath("Path 1")}}>Path 1</Dropdown.Item>
                        <Dropdown.Item onClick={()=> {setPath("Path 2")}}>Path 2</Dropdown.Item>
                        <Dropdown.Item onClick={()=> {setPath("Path 3")}}>Path 3</Dropdown.Item>
                        <Dropdown.Item onClick={()=> {setPath("Path 4")}}>Path 4</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>

                <Path path={path}/>

                <div className="buttonBarBottom">
                    <Button variant="outline-primary" onClick={()=> {navigate('/storage')}}>Next</Button>{' '}
                </div>
            </div>
        // </LocalizationProvider>
    );
}

export default FirstStep;

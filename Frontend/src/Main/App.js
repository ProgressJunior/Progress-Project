import React, { useState } from "react";
import FirstStep from "./FirstStep";
import StorageSelect from "../Storage/StorageSelect";
import DateSelect from "../Date/DateSelect";
import LastStep from "../LastStep/LastStep";
import "./main.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    const [path, setPath] = useState("");
    const [storage, setStorage] = useState("");
    const [date, setDate] = useState("");

    const updatePath = (path) =>{
        setPath(path);
    }

    const updateDate = (date) =>{
        setDate(date);
    }

    const updateStorage = (storage) =>{
        setStorage(storage);

        let col = storage.substring(storage.indexOf('col:') + 5)
        let row = storage.substring(5, storage.indexOf('col:'))
        // console.log(path);
        // console.log(col + "|" + row);
        // console.log(date);

            const url = "http://localhost:3030/path/"+path+"/"+date+"/"+col + "|" + row
            // console.log(url);
            fetchData(url)

    }

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <Router>
            <Routes>
                {/*Needed so you cant access prop directly without first selecting path, etc.*/}

                <Route exact path="/" element={<FirstStep childToParent={updatePath}/>} />
                {path != "" && (<Route path="/date" element={<DateSelect childToParent={updateDate} />} />)}
                {path != "" && date != "" && (<Route path="/storage" element={<StorageSelect childToParent={updateStorage} date={date}/>} />)}
                {path != "" && date != "" && storage != "" && (<Route path="/lastStep" element={<LastStep value={"test"}/>} />)}
                {/* Wildcard */}
                <Route exact path="/*" element={<FirstStep childToParent={updatePath}/>} />
            </Routes>
        </Router>
    );
}

export default App;

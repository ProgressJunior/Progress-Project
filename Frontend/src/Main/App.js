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

        console.log(path);
        console.log(storage);
        console.log(date);


    }

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<FirstStep childToParent={updatePath}/>} />
                <Route path="/date" element={<DateSelect childToParent={updateDate} />} />
                <Route path="/storage" element={<StorageSelect childToParent={updateStorage} date={date}/>} />
                <Route path="/lastStep" element={<LastStep value={"test"}/>} />
                {/* <Route exact path="/login" element={<Login />} />
                    <Route
                        exact
                        path="/recovery-password"
                        element={<RecoveryPassword />}
                    />
                    <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
}

export default App;

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
            console.log(url);
    
            // const fetchData = async () => {
            //     try {
            //         const response = await fetch(url);
            //         const json = await response.json();
            //         json.forEach((e) => {
            //             filter(e)
            //         })
            //     // console.log("occupied:" + occupied)
            //     } catch (error) {
            //         console.log("error", error);
            //     }
            //     genStorageButtons()
            //     setButtons(storageRowButtons)
            // };



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

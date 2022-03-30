import React, { useState } from "react";
import FirstStep from "./FirstStep";
import StorageSelect from "../Storage/StorageSelect";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<FirstStep />} />
                <Route path="/storage" element={<StorageSelect />} />
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

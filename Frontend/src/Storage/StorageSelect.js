import React, { useState } from "react";

// import use navigate
import { useNavigate } from "react-router-dom";

// import button from bootstrap
import Button from "react-bootstrap/Button";

async function StorageSelect() {
    //use state
    const [occLG, setOccLG] = useState("");

    let navigate = useNavigate()


    const response = await fetch('http://localhost:3030/');
    const data = await response.json();
    setOccLG(data);

    return (
        <div>
            <p>{data}</p>

            <Button variant="outline-primary" onClick={()=> {navigate('/')}}>Back</Button>{' '}

        </div>
    );
}

export default StorageSelect;

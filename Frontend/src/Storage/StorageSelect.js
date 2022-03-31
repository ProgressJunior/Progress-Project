import React, { useState, useEffect } from "react";

// import use navigate
import { useNavigate } from "react-router-dom";

// import button from bootstrap
import Button from "react-bootstrap/Button";

function StorageSelect() {

    let navigate = useNavigate()

    useEffect(() => {
        const url = "http://localhost:3030/occLG";
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response;
            console.log(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);

    return (
        <div>
            <Button variant="outline-primary" 
                    onClick={()=> {navigate('/')}}>
                Back
            </Button>
            <p>test</p>
        </div>
    );
}

export default StorageSelect;

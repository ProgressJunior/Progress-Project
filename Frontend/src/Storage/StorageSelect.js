import React, { useState, useEffect } from "react";

// import use navigate
import { useNavigate } from "react-router-dom";

// import button from bootstrap
import Button from "react-bootstrap/Button";

// for css
import "./Storage.css";

function StorageSelect() {
    let navigate = useNavigate();

    useEffect(() => {
        const url = "http://localhost:3030/occLG";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    function test(row, col) {
        console.log("row: " + row + " col: " + col);
    }

    let storageRows = [1, 2, 3, 4, 5, 6];

    return (
        <div>
            <div className="storageParent">
                {storageRows.map((e) => {
                    let storageColumn = [];

                    for (let i = 0; i < 6; i++) {
                        storageColumn.push(
                            <Button className="storageButton" onClick={() => {test(e, i);}}>
								Row {e} | Column {i}
							</Button>
					);}

                    return storageColumn;
                })}
            </div>

            <Button
                variant="outline-primary"
                onClick={() => {
                    navigate("/");
                }}
            >
                Back
            </Button>

            {/* <Button
                variant="outline-primary"
                onClick={() => {
                    test();
                }}
            ></Button> */}
        </div>
    );
}

export default StorageSelect;

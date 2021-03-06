// For React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

// For Dropdown
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

// For Path
import Path from "./Path";
import "./firstStep.css";

function FirstStep({ childToParent }) {
    const [path, setPath] = useState("0");

    let navigate = useNavigate();

    function nextButtonFunction() {
        navigate("/date");
        childToParent(path);
    }

    async function clearDb() {
        try {
            const response = await fetch("http://185.5.199.33:3030/clear");
            const json = await response.json();
            if (json["OK!"] === "OK!") {
                alert("Database cleared!");
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className="componentParent">
            <div className="optionsWrapper ">
                <Dropdown className="fixed20vw">
                    <Dropdown.Toggle
                        variant="outline-primary"
                        id="dropdown-basic"
                        className="fixed20vw"
                    >
                        Path {parseInt(path) + 1}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="fixed20vw">
                        <Dropdown.Item
                            onClick={() => {
                                setPath("0");
                            }}
                        >
                            Path 1
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setPath("1");
                            }}
                        >
                            Path 2
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setPath("2");
                            }}
                        >
                            Path 3
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                setPath("3");
                            }}
                        >
                            Path 4
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button
                    variant="outline-primary"
                    onClick={() => {
                        clearDb();
                    }}
                >
                    Clear Database
                </Button>{" "}
                <Button
                    variant="outline-primary"
                    onClick={() => {
                        nextButtonFunction();
                    }}
                >
                    Next
                </Button>{" "}
            </div>

            <Path path={path} />
        </div>
    );
}

export default FirstStep;

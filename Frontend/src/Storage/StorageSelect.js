import React, { useState, useEffect } from "react";

// import use navigate
import { useNavigate } from "react-router-dom";

// import button from bootstrap
import Button from "react-bootstrap/Button";

// for css
import "./Storage.css";

function StorageSelect({ childToParent, date }) {
    let navigate = useNavigate();
    const [buttons, setButtons] = useState([]);
    let storageRows = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let storageRowButtons = [];
    // Sotrage units which are already occupied get stored here
    let occupied = []

    // UseEffect is called on component did mount
    // it then fetechs which storage units are occupied
    // it calls genStorageButtons which generates each row of buttons
    // each row is then pushed into storageRowButtons
    // it then sets the storageRowButtons to the state
    useEffect(() => {
        const url = "http://185.5.199.33:3030/occLG/"+date;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json)
                json.forEach((e) => {
                    filter(e)
                })
            } catch (error) {
                console.log("error", error);
            }
            genStorageButtons()
            setButtons(storageRowButtons)
        };

        fetchData();
    }, []);

    // Filters unnecessary data from query
    // LG 1 | 2 --> 1 - 2
    const filter = (query) => {
        let newQuery = query.replace("LG ", "");
        let filtered = newQuery.split("|");
        occupied.push(filtered[0] + "-" + filtered[1]);
    };

    // genStorageButtons generates each row of buttons
    // it then pushes each row into storageRowButtons
    function genStorageButtons(){ 
        storageRows.map((e) => {
            let storageColumn = [];

            for (let i = 5; i > 0; i--) {
                if(!occupied.includes(i + "-" + e)) {
                storageColumn.push(
                    <Button className="storageButton" onClick={() => {updatePath(e, i);}}>
                        Row {e} | Column {i}
                    </Button>
                );}
                else{
                    storageColumn.push(
                        <Button variant="danger" className="storageButtonDisabled" >
                            Row {e} | Column {i}
                        </Button>
                    )
                } 
            }
            storageRowButtons.push(storageColumn);
            // Done for best practice
            return ""
        })
    }

    // updatePath is called when a button is clicked
    // it then calls the parent function to set the sotrage unit there
    // so it can be accessed when sending the final request
    function updatePath(row, col) {
        childToParent("row: " + row + " col: " + col)
        navigate("/lastStep");
    }


    return (
        <div className="backgroundDark">
            <div className="storageParentContainer">
                <div className="storageParent">
                    {buttons.map((e)=>{return e})}
                </div>
            </div>

            <Button
                className="backButton"
                variant="outline-primary"
                onClick={() => {
                    navigate("/date");
            }}>Back</Button>

        </div>
    );
}

export default StorageSelect;

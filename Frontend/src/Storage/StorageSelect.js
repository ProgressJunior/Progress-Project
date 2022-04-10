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
    let storageRowButtons = [];
    let occupied = []

    // UseEffect is called on component did mount
    // it then fetechs which storage units are occupied
    // it calls genStorageButtons which generates the Buttons
    // and disables the ones where the storage is occupied
    // it then sets the buttons to the state

    useEffect(() => {
        const url = "http://185.5.199.33:3030/occLG/"+date;
        // console.log(url);

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                json.forEach((e) => {
                    filter(e)
                })
            // console.log("occupied:" + occupied)
            } catch (error) {
                console.log("error", error);
            }
            genStorageButtons()
            setButtons(storageRowButtons)
        };

        fetchData();
    }, []);



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
            // console.log(storageColumn)
            storageRowButtons.push(storageColumn);
        })
    }


    const filter = (query) => {
        // remove LG from query
        let newQuery = query.replace("LG ", "");
        let filtered = newQuery.split("|");
        occupied.push(filtered[0] + "-" + filtered[1]);
    };


    function updatePath(row, col) {
        childToParent("row: " + row + " col: " + col)
        navigate("/lastStep");
    }

    let storageRows = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    return (
        <div>
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
                }}  >Back</Button>

        </div>
    );
}

export default StorageSelect;

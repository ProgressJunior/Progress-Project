//     //         const fetchData = async () => {
//     //             try {
//     //                 const response = await fetch(url);
//     //                 const json = await response.json();
//     //                 json.forEach((e) => {
//     //                     // filter(e)
//     //                     return (e)
//     //                 })
//     //             // console.log("occupied:" + occupied)
//     //             } catch (error) {
//     //                 console.log("error", error);
//     //             }
//     //             // genStorageButtons()
//     //             // setButtons(storageRowButtons)
//     //         };

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StorageSelection = ({ route, navigation }) => {
    let storageRows = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let occupied = [];
    let storageRowButtons = [];
    const [buttons, setButtons] = useState([]);

    const { path } = route.params.path;
    const { date } = route.params.date;
    // add 2 hours to date because we need to convert to ISOString
    // for the fetch requests but doing so sets time back 2 hours
    // due to standartization of timezones
    let newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 2);
    const url = "http://185.5.199.33:3030/occLG/" + newDate.toISOString();
    const [isLoading, setLoading] = useState(true);

    // Use effect first fetches occupied LGs
    // they are then filtered to return only the row and col number
    // and added to occupied array

    // then each row of buttons is generated
    // then buttons are pushed to storageRowButtons
    // an array, which then contains ALL the buttons

    // storageRowButtons is then set to the buttons state
    // state is used for the view to reload after stateChange
    
    // Finally setLoading is set to false to show the buttons
    // and the loading screen is hidden
    useEffect(() => {
        // console.log(url);
        // fetch(url)
        //     .then((response) => setData(response))
        //     .then((json) => json.forEach((e)=>{filter(e)}))
        //     .catch((error) => console.error(error))
        //     .finally(() => {genStorageButtons();setLoading(false)});
        let json = ["LG 1|1", "LG 2|2", "LG 3|3", "LG 4|7"];

        json.forEach((e) => {
            filter(e);
        });
        genStorageButtons();
        setButtons(storageRowButtons);
        setLoading(false);
    }, []);

    function selectPath(row, col) {
        fetch("http://185.5.199.33:3030/path/"+path["value"]+"/"+newDate.toISOString()+"/"+col + "|" + row)
            .then((response) => setData(response))
            .catch((error) => console.error(error))
            .finally(() => {console.log("Request Sent")});
        let newPath = path["value"].toString().substring(5, path["value"].length)
        // cast newPath to int
        newPath = parseInt(newPath)-1;
        console.log(newPath);
        console.log("http://185.5.199.33:3030/path/"+newPath+"/"+newDate.toISOString()+"/"+col + "|" + row);
        // navigate to /lastStep
        // navigation.navigate("/lastStep");

    }

    const filter = (query) => {
        // remove LG from query
        let newQuery = query.replace("LG ", "");
        let filtered = newQuery.split("|");
        occupied.push(filtered[0] + "-" + filtered[1]);
    };

    function genStorageButtons() {
        storageRows.map((e) => {
            let storageColumn = [];

            for (let i = 5; i > 0; i--) {
                if (!occupied.includes(i + "-" + e)) {
                    storageColumn
                        .push(
                        <Pressable style={styles.button} onPress={() => selectPath(e,i)}>
                            <Text style={styles.buttonText}>R {e} | C {i}</Text>
                        </Pressable>
                        )
                        ;
                } else {
                    storageColumn.push(
                        <Pressable style={styles.buttonOccupied}>
                            <Text style={styles.buttonText}> R {e} | C {i}</Text>
                        </Pressable>
                    );
                }
            }
            // console.log(storageColumn)
            storageRowButtons.push(storageColumn);
        });
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    {buttons.map((e) => {
                        return <View style={styles.rowWrapper}>{e}</View>;
                    })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333333",
        paddingTop : windowHeight/20,
        // alignItems: "center",
        // justifyContent: "center",
    },
    button: {
        color: "#333333",
        backgroundColor: "#ffffff",
        width: windowWidth /8,
        height: windowHeight / 20,
        borderRadius: windowWidth / 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowHeight / 100,
    },
    buttonText: {
        color: "#000000",
        fontSize: windowWidth / 35,
    },
    buttonOccupied: {
        color: "#333333",
        backgroundColor: "#ff0000",
        width: windowWidth /8,
        height: windowHeight / 20,
        borderRadius: windowWidth / 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowHeight / 100,
    },
    rowWrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
});

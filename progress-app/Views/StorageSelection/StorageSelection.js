import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable, BackHandler, Alert } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StorageSelection = ({ route, navigation }) => {
    // disables Hardwarebackbuttonfunctionality
    BackHandler.addEventListener("hardwareBackPress", function () {
        return false;
    });

    const { path } = route.params.path;
    const { date } = route.params.date;
    const [buttons, setButtons] = useState([]);
    const [isLoading, setLoading] = useState(true);

    // ChildKeyCounter is used to give each button a unique key
    // This is not needed but encouraged as best practice 
    let childrenKeyCounter = 0;
    let storageRows = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    // All storage units that are already occupied get saved here
    let occupied = [];
    let storageRowButtons = [];
        
    // add 2 hours to date because we need to convert to ISOString
    // for the fetch requests but doing so sets time back 2 hours
    // due to standartization of timezones
    let newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 2);
    newDate = newDate.toISOString();
    newDate = newDate.substring(0, newDate.length - 1);
    
    const url = "http://185.5.199.33:3030/occLG/" + newDate;

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
        fetch(url)
            .then((response) => response.json())
            .then((json) => 
                json.forEach((e) => {
                    filter(e);
                }))                
            .catch((error) => Alert.alert("Error", "Server antwortet nicht", [{text: "Ok"}]))
            .finally(() => {
                genStorageButtons();
                setLoading(false);
            });
        setButtons(storageRowButtons);
    }, []);

    function selectPath(row, col) {
        let newPath = parseInt(path["value"].toString().substring(5, path["value"].length)) - 1;

        fetch("http://185.5.199.33:3030/path/"+newPath+"/"+newDate+"/"+col+"|"+row)
            .then((response) => console.log(""))
            .catch((error) => {
                Alert.alert("Error", "Server antwortet nicht", [{text: "Ok",},]);
                return ""})
            navigation.navigate("LastScreen")
    }

    // Filters unnecessary data from query
    // LG 1 | 2 --> 1 - 2
    const filter = (query) => {
        let newQuery = query.replace("LG ", "");
        let filtered = newQuery.split("|");
        if(!occupied.includes(filtered[0] + "-" + filtered[1]))
            occupied.push(filtered[0] + "-" + filtered[1]);
    };

    // Generates each row of all storage units
    // it then pushes each row to storageRowButtons
    function genStorageButtons() {
        storageRows.map((e) => {
            let storageColumn = [];
            for (let i = 5; i > 0; i--) {
                if (!occupied.includes(i + "-" + e)) {
                    storageColumn.push(
                        <Pressable
                            key={i + "-" + e}
                            style={[styles.button, styles.buttonNeutral]}
                            onPress={() => selectPath(e, i)}
                        ><Text style={styles.buttonText}>
                            R {e} | C {i}
                        </Text>
                        </Pressable>
                    );
                } else {
                    storageColumn.push(
                        <Pressable
                            key={i + "-" + e}
                            style={[styles.button, styles.buttonOccupied]}
                        ><Text style={styles.buttonText}>
                            R {e} | C {i}
                        </Text>
                        </Pressable>
                    );
                }
            }
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
                        return (
                            <View
                                key={++childrenKeyCounter}
                                style={styles.rowWrapper}
                            >{e}</View>
                        );
                    })}
                </View>
            )}
            <Pressable
                onPress={() => {
                    navigation.navigate("PathSelection");
                }}
                style={styles.backButton}
            >
                <Text>Back</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333333",
        paddingTop: windowHeight / 20,
    },
    backButton: {
        backgroundColor: "#ffffff",
        width: windowWidth / 3,
        height: windowHeight / 15,
        borderRadius: windowWidth / 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowHeight / 100,
        marginLeft: windowWidth / 3,
    },
    button: {
        backgroundColor: "transparent",
        borderWidth: windowWidth / 250,
        width: windowWidth / 7,
        height: windowHeight / 22,
        borderRadius: windowWidth / 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowHeight / 100,
    },
    buttonNeutral: {
        backgroundColor: "#098BCA",
        borderWidth: 0,
    },
    buttonOccupied: {
        borderColor: "#D9534F",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: windowWidth / 35,
    },
    buttonOccupiedText: {
        color: "#333333",
    },
    rowWrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
});

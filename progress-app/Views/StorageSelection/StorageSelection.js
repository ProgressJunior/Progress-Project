import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable, BackHandler } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default StorageSelection = ({ route, navigation }) => {

    BackHandler.addEventListener('hardwareBackPress', function () {
        return navigation.navigate('PathSelection')
    });

    const { path } = route.params.path;
    const { date } = route.params.date;

    let childrenKeyCounter = 0;
    let storageRows = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let occupied = [];
    let storageRowButtons = [];
    const [buttons, setButtons] = useState([]);
    
    let newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 2);
    newDate = newDate.toISOString().substring(0,newDate.toISOString().length-1)
    const url = "http://185.5.199.33:3030/occLG/" + newDate;
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
        fetch(url)
            .then((response) => response.json())
            .then((json) =>
                json.forEach((e) => {
                    filter(e);
                })
            )
            .catch((error) => console.error(error))
            .finally(() => {
                genStorageButtons();
                setLoading(false);
            });
        // let json = ["LG 1|1", "LG 2|2", "LG 3|3", "LG 4|7"];

        // json.forEach((e) => {
        //     filter(e);
        // });
        genStorageButtons();
        setButtons(storageRowButtons);
        setLoading(false);
    }, []);

    function selectPath(row, col) {
        let newPath = parseInt(path["value"].toString().substring(5, path["value"].length)) - 1;
        
        // add 2 hours to date because we need to convert to ISOString
        // for the fetch requests but doing so sets time back 2 hours
        // due to standartization of timezones
        fetch("http://185.5.199.33:3030/path/"+newPath+"/"+newDate.substring(0,newDate.toISOString().length-1)+"/"+col+"|"+row)
            .then((response) => console.log(""))
            .catch((error) => console.error(error))
            .finally(() => {
                console.log("Request Sent");
            });
        navigation.navigate("LastScreen");
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
                    storageColumn.push(
                        <Pressable
                            key={i + "-" + e}
                            style={styles.button}
                            onPress={() => selectPath(e, i)}
                        >
                            <Text style={styles.buttonText}>
                                R {e} | C {i}
                            </Text>
                        </Pressable>
                    );
                } else {
                    storageColumn.push(
                        <Pressable key={i + "-" + e} style={styles.buttonOccupied}>
                            <Text style={styles.buttonOccupiedText}>
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
                        return <View key={++childrenKeyCounter} style={styles.rowWrapper}>{e}</View>;
                    })}
                </View>
            )}
            <Pressable onPress={()=>{navigation.navigate("PathSelection")}} style={styles.backButton}><Text>Back</Text></Pressable>
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
        backgroundColor: "#098BCA",
        width: windowWidth / 7,
        height: windowHeight / 22,
        borderRadius: windowWidth / 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowHeight / 100,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: windowWidth / 35,
    },
    buttonOccupiedText: {
        color: "#333333",
    },
    buttonOccupied: {
        color: "#333333",
        backgroundColor: "#FEDD00",
        width: windowWidth / 8,
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

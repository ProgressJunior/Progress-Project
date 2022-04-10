import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable, Alert } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Dropdown
import DropDownPicker from "react-native-dropdown-picker";

// Arrows
import ArrowBarLeft from "react-native-bootstrap-icons/icons/arrow-bar-left";
import ArrowUp from "react-native-bootstrap-icons/icons/arrow-up";
import ArrowDown from "react-native-bootstrap-icons/icons/arrow-down";
import ArrowLeft from "react-native-bootstrap-icons/icons/arrow-left";
import ArrowRight from "react-native-bootstrap-icons/icons/arrow-right";

export default function PathSelection({ navigation }) {
    let pathTemplate = [
        ["TP8",  "TP9",  "TP11", "EMTY", "TP14.1", "TP18"],
        ["TP7",  "TP10", "TP12", "TP13", "TP14",   "TP16"],
        ["TP6",  "TP5",  "EMTY", "TP24", "TP22",   "TP17"],
        ["TP3",  "TP4",  "EMTY", "TP25", "TP23",   "TP18"],
        ["TP2",  "TP1",  "EMTY", "TP26", "EMTY",   "TP19"],
        ["EMTY", "EMTY", "EMTY", "TP27", "TP21",   "TP20"],
    ];

    let pathArray = {
        "Path 1": [
            "TP8",
            "TP9",
            "TP11",
            "EMTY",
            "TP14.1",
            "TP18",
            "ACTD",
            "ACTD",
            "ACT",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACT",
            "ACT",
            "EMTY",
            "ACT",
            "ACT",
            "ACT",
            "ACT",
            "ACT",
            "EMTY",
            "TP25",
            "TP23",
            "TP18",
            "ACT",
            "ACT",
            "EMTY",
            "TP26",
            "EMTY",
            "TP19",
            "EMTY",
            "EMTY",
            "EMTY",
            "TP27",
            "TP21",
            "TP20",
        ],

        "Path 2": [
            "ACTD",
            "ACTD",
            "ACTD",
            "EMTY",
            "TP14.1",
            "TP18",
            "ACTD",
            "TP10",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACT",
            "ACT",
            "EMTY",
            "ACT",
            "ACT",
            "ACT",
            "ACT",
            "ACT",
            "EMTY",
            "TP25",
            "TP23",
            "TP18",
            "ACT",
            "ACT",
            "EMTY",
            "TP26",
            "EMTY",
            "TP19",
            "EMTY",
            "EMTY",
            "EMTY",
            "TP27",
            "TP21",
            "TP20",
        ],

        "Path 3": [
            "TP8",
            "TP9",
            "TP11",
            "EMTY",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACT",
            "ACT",
            "EMTY",
            "ACT",
            "ACT",
            "ACT",
            "ACT",
            "ACT",
            "EMTY",
            "TP25",
            "TP23",
            "TP18",
            "ACT",
            "ACT",
            "EMTY",
            "TP26",
            "EMTY",
            "TP19",
            "EMTY",
            "EMTY",
            "EMTY",
            "TP27",
            "TP21",
            "TP20",
        ],

        "Path 4": [
            "ACTD",
            "ACTD",
            "ACTD",
            "EMTY",
            "ACTD",
            "ACTD",
            "ACTD",
            "TP10",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACTD",
            "ACT",
            "ACT",
            "EMTY",
            "ACT",
            "ACT",
            "ACT",
            "ACT",
            "ACT",
            "EMTY",
            "TP25",
            "TP23",
            "TP18",
            "ACT",
            "ACT",
            "EMTY",
            "TP26",
            "EMTY",
            "TP19",
            "EMTY",
            "EMTY",
            "EMTY",
            "TP27",
            "TP21",
            "TP20",
        ],
    };

    let arrowArray = {
        // The Empty entries in the array need to be there
        // because some elements never change, these get taken from "Path 1"
        // and for correct counting there need to be some EMTY elements
        "Path 1": [,,,,,,
            <ArrowRight   width="50" fill="rgb(255,0,0)" />,
            <ArrowRight   width="50" fill="rgb(255,0,0)" />,
            <ArrowRight   width="50" fill="rgb(255,0,0)" />,
            <ArrowRight   width="50" fill="rgb(255,0,0)" />,
            <ArrowRight   width="50" fill="rgb(255,0,0)" />,
            <ArrowDown    width="50" fill="rgb(255,0,0)" />,
            <ArrowUp      width="50" fill="rgb(255,0,0)" />,
            <ArrowLeft    width="50" fill="rgb(255,0,0)" />,,
            <ArrowLeft    width="50" fill="rgb(255,0,0)" />,
            <ArrowLeft    width="50" fill="rgb(255,0,0)" />,
            <ArrowLeft    width="50" fill="rgb(255,0,0)" />,
            <ArrowRight   width="50" fill="rgb(255,0,0)" />,
            <ArrowUp      width="50" fill="rgb(255,0,0)" />,,,,,
            <ArrowUp      width="50" fill="rgb(255,0,0)" />,
            <ArrowBarLeft width="50" fill="rgb(255,0,0)" />,,,,,,,,,,,
        ],

        "Path 2": [
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowDown  width="50" fill="rgb(255,0,0)" />,,,,
            <ArrowUp    width="50" fill="rgb(255,0,0)" />,,,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowDown  width="50" fill="rgb(255,0,0)" />
            ,,,,,,,,,,,,,,,,,,,,,,,,,,
        ],

        "Path 3": [,,,,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowDown  width="50" fill="rgb(255,0,0)" />,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowUp    width="50" fill="rgb(255,0,0)" />,
            <ArrowDown  width="50" fill="rgb(255,0,0)" />,
            ,,,,,,,,,,,,,,,,,,,,,,,,],

        "Path 4": [
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowDown  width="50" fill="rgb(255,0,0)" />,,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowDown  width="50" fill="rgb(255,0,0)" />,
            <ArrowUp    width="50" fill="rgb(255,0,0)" />,,,
            <ArrowRight width="50" fill="rgb(255,0,0)" />,
            <ArrowUp    width="50" fill="rgb(255,0,0)" />,
            <ArrowDown  width="50" fill="rgb(255,0,0)" />,
            ,,,,,,,,,,,,,,,,,,,,,,,,
        ],
    };

    let count = 0;
    // For dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("Path 1");
    const [items, setItems] = useState([
        { label: "Path 1", value: "Path 1" },
        { label: "Path 2", value: "Path 2" },
        { label: "Path 3", value: "Path 3" },
        { label: "Path 4", value: "Path 4" },
    ]);

    function clearDb() {
        fetch("http://localhost:3030/clear")
            .then((response) => response.json())
            .then((json) => {
                if (json["OK!"] === "OK!") {
                    Alert.alert("Cleared", "Datenbank wurde gecleart!", [
                        { text: "Ok" },
                    ]);
                } else {
                    Alert.alert(
                        "Error",
                        "Datenbank konnte nicht gecleart werden!",
                        [{ text: "Ok" }]
                    );
                }
            })
            .catch((error) =>
                Alert.alert(
                    "Error",
                    "Datenbank konnte nicht gecleart werden!",
                    [{ text: "Ok" }]
                )
            );
    }

    return (
        <View style={styles.container}>
            {pathTemplate.map((element) => {
                let storageRows = [];
                for (let i = 0; i < element.length; i++) {
                    count++;
                    if (element[i] == "EMTY") {
                        storageRows.push(
                            <View key={count - 1} style={[styles.box, styles.EMTY]}></View>
                        );
                    } else {
                        if (pathArray["Path 1"][count - 1] === "ACT") {
                            storageRows.push(
                                <View key={count - 1} style={[styles.box, styles.boxActive]}>
                                    {arrowArray["Path 1"][count - 1]}
                                </View>
                            );
                        } else if (pathArray[value][count - 1] === "ACTD")
                            storageRows.push(
                                <View key={count - 1} style={[styles.box, styles.boxActiveD]}>
                                    {arrowArray[value][count - 1]}
                                </View>
                            );
                        else
                            storageRows.push(
                                <View
                                    key={count - 1}
                                    style={[styles.box, styles.boxActiveDisabled]}
                                ></View>
                            );
                    }
                }
                return (
                    <View key={count - 1} style={styles.rowWrapper}>
                        {storageRows}
                    </View>
                );
            })}

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.dropdown}
            />

            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, styles.dangerButton]}
                    onPress={() => clearDb()}
                ><Text style={styles.text}>Clear Database</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.successButton]}
                    onPress={() =>
                        navigation.navigate("DateSelection", {
                            path: { value },
                        })
                    }
                ><Text style={styles.text}>Next</Text>
                </Pressable>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333333",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#ffffff",
    },
    buttonContainer: {
        width: windowWidth,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        color: "#333333",
        backgroundColor: "transparent",
        width: windowWidth / 3,
        height: windowHeight / 20,
        borderRadius: windowWidth / 50,
        borderWidth: windowWidth / 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowHeight / 50,
    },
    dangerButton: {
        borderColor: "#D9534F",
    },
    successButton: {
        borderColor: "#5CB85C",
    },
    warningButton: {
        borderColor: "#F0AD4E",
    },
    dropdown: {
        marginLeft: windowWidth / 4,
        marginTop: windowHeight / 20,
        width: windowWidth / 2,
    },
    box: {
        width: windowWidth / 6.5,
        height: 50,
        backgroundColor: "red",
        margin: windowWidth / 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    boxActive: {
        backgroundColor: "#098BCA",
    },
    boxActiveD: {
        backgroundColor: "#FEDD00",
    },
    boxActiveDisabled: {
        backgroundColor: "gray",
    },
    EMTY: {
        backgroundColor: "rgba(0,0,0,0)",
    },
    rowWrapper: {
        flexDirection: "row",
    },
});
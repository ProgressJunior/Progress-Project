import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

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

export default function PathSelection({navigation}) {

    let pathTemplate = [
        ["TP8", "TP9", "TP11", "EMPTY", "TP14.1", "TP18"],
        ["TP7", "TP10", "TP12", "TP13", "TP14", "TP16"],
        ["TP6", "TP5", "EMPTY", "TP24", "TP22", "TP17"],
        ["TP3", "TP4", "EMPTY", "TP25", "TP23", "TP18"],
        ["TP2", "TP1", "EMPTY", "TP26", "EMPTY", "TP19"],
        ["EMPTY", "EMPTY", "EMPTY", "TP27", "TP21", "TP20"],
    ];
    
    let pathArray = {
        "Path 1": [
            "TP8",
            "TP9",
            "TP11",
            "EMPTY",
            "TP14.1",
            "TP18",
            "ACTIVED",
            "ACTIVED",
            "ACTIVE",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "TP25",
            "TP23",
            "TP18",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "TP26",
            "EMPTY",
            "TP19",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "TP27",
            "TP21",
            "TP20",
        ],

        "Path 2": [
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "EMPTY",
            "TP14.1",
            "TP18",
            "ACTIVED",
            "TP10",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "TP25",
            "TP23",
            "TP18",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "TP26",
            "EMPTY",
            "TP19",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "TP27",
            "TP21",
            "TP20",
        ],

        "Path 3": [
            "TP8",
            "TP9",
            "TP11",
            "EMPTY",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "TP25",
            "TP23",
            "TP18",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "TP26",
            "EMPTY",
            "TP19",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "TP27",
            "TP21",
            "TP20",
        ],

        "Path 4": [
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "EMPTY",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "TP10",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVED",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "TP25",
            "TP23",
            "TP18",
            "ACTIVE",
            "ACTIVE",
            "EMPTY",
            "TP26",
            "EMPTY",
            "TP19",
            "EMPTY",
            "EMPTY",
            "EMPTY",
            "TP27",
            "TP21",
            "TP20",
        ],
    };

    let arrowArray = {
        // The empty entries in the array need to be there
        // because some elements never change, these get taken from "Path 1"
        // and for correct counting there need to be some empty elements
        "Path 1": [ ,,,,,,
            <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowDown width="50" fill="rgb(255,0,0)"/>,
            <ArrowUp width="50" fill="rgb(255,0,0)"/>,<ArrowLeft width="50" fill="rgb(255,0,0)"/>,,<ArrowLeft width="50" fill="rgb(255,0,0)"/>, <ArrowLeft width="50" fill="rgb(255,0,0)"/>, <ArrowLeft width="50" fill="rgb(255,0,0)"/>,
            <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowUp width="50" fill="rgb(255,0,0)"/>,,,,,
            <ArrowUp width="50" fill="rgb(255,0,0)"/>, <ArrowBarLeft width="50" fill="rgb(255,0,0)"/>,,,,,
            ,,,,,,],
        
        "Path 2": [ <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowDown width="50" fill="rgb(255,0,0)"/>,,,,
            <ArrowUp width="50" fill="rgb(255,0,0)"/>,,,<ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowDown width="50" fill="rgb(255,0,0)"/>,
            ,,,,,,,,,,,,,,,,,,,,,,,,],
        
        "Path 3": [ ,,,,<ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowDown width="50" fill="rgb(255,0,0)"/>,
            <ArrowRight width="50" fill="rgb(255,0,0)"/>,,,<ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowUp width="50" fill="rgb(255,0,0)"/>, <ArrowDown width="50" fill="rgb(255,0,0)"/>,
            ,,,,,,,,,,,,,,,,,,,,,,,,],
        
        "Path 4": [ <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowDown width="50" fill="rgb(255,0,0)"/>,,<ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowDown width="50" fill="rgb(255,0,0)"/>,
            <ArrowUp width="50" fill="rgb(255,0,0)"/>,,,<ArrowRight width="50" fill="rgb(255,0,0)"/>, <ArrowUp width="50" fill="rgb(255,0,0)"/>, <ArrowDown width="50" fill="rgb(255,0,0)"/>,
            ,,,,,,,,,,,,,,,,,,,,,,,,],
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

    return (
        <View style={styles.container}>

            {/* draw arrow from elsoderfer/react-arrow */}

            {/* Draws correct rectangles for stations */}
            {pathTemplate.map((element) => {
                let temp = [];
                for (let i = 0; i < element.length; i++) {
                    count++;
                    if (element[i] == "EMPTY") {
                        temp.push(<View style={styles.empty}></View>);
                    } else {
                        if (pathArray["Path 1"][count - 1] === "ACTIVE") {
                            temp.push(<View style={styles.boxActive}>{arrowArray["Path 1"][count - 1]}</View>);
                        } else if (pathArray[value][count - 1] === "ACTIVED")
                            temp.push(<View style={styles.boxActiveD}>{arrowArray[value][count - 1]}</View>);
                        else
                            temp.push(
                                <View style={styles.boxActiveDisabled}></View>
                            );
                    }
                }
                return <View style={styles.rowWrapper}>{temp}</View>;
            })}

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('DateSelection',{path: {value}})}
            ><Text>Next</Text></Pressable>

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
    turnedRight: {
        transform: [{ rotate: "90deg" }],
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green"
    },
    box: {
        width: windowWidth / 6.5,
        height: 50,
        backgroundColor: "red",
        margin: windowWidth / 200,
    },
    boxActive: {
        width: windowWidth / 6.5,
        height: 50,
        backgroundColor: "#098BCA",
        margin: windowWidth / 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    boxActiveD: {
        width: windowWidth / 6.5,
        height: 50,
        backgroundColor: "#FEDD00",
        margin: windowWidth / 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    boxActiveDisabled: {
        width: windowWidth / 6.5,
        height: 50,
        backgroundColor: "gray",
        margin: windowWidth / 200,
    },
    empty: {
        width: windowWidth / 6.5,
        height: 50,
        backgroundColor: "rgba(0,0,0,0)",
        margin: windowWidth / 200,
    },
    rowWrapper: {
        flexDirection: "row",
    },
    text: {
        color: "#ffffff",
    },
    button: {
        color: "#333333",
        backgroundColor: "#ffffff",
        width: windowWidth / 3,
        height: windowHeight / 20,
        borderRadius: windowWidth / 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowHeight / 50,
    },
});

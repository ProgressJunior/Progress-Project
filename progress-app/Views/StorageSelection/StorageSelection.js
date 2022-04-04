import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function StorageSelection({navigation}) {

    let storageRows = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    const url = "http://localhost:3030/occLG/"+date;
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

    return (
        <View style={styles.container}>

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

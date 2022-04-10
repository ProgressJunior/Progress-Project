import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LastScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.thankYou}>Thank you</Text>
            <Pressable onPress={()=>{navigation.navigate("PathSelection")}} style={styles.restartButton}>
                <Text style={styles.restartText}>Restart</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4BAE4F",
        alignItems: "center",
        justifyContent: "center",
    },
    thankYou: {
        fontSize: windowHeight / 10,
        color: "#ffffff",
        fontWeight: "bold",
    },
    restartButton: {
        backgroundColor: "#098BCA",
        width: windowWidth / 1.5,
        height: windowHeight / 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: windowHeight / 20,
        marginTop: windowHeight / 30,
    },
    restartText: {
        fontSize: windowHeight / 20,
        color: "#ffffff",
        fontWeight: "bold",
    },
});

import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Date Picker
import DatePicker from "react-native-date-picker";

export default function PathSelection({ route, navigation }) {
    // For date picker
    const [date, setDate] = useState(new Date());
    const { path } = route.params;

    return (
        <View style={styles.container}>
            {/* <Text>{JSON.stringify(path)}</Text> */}

            <DatePicker
                date={date}
                onDateChange={setDate}
                fadeToColor={"#333333"}
                androidVariant={"iosClone"}
                textColor={"#ababab"}
            />

            <Pressable
                style={[styles.button, styles.dangerButton]}
                onPress={() => setDate(new Date())}
                // onPress={() => navigation.navigate('DateSelection')}
            >
            <Text style={styles.text}>Reset Date</Text>
            </Pressable>
            {/* <Text id="elem2" style={styles.text}>{date.toISOString()}</Text> */}

            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, styles.warningButton]}
                    onPress={() => navigation.navigate("PathSelection")}
                >
                <Text style={styles.text}>Back</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.successButton]}
                    onPress={() =>
                        navigation.navigate("StorageSelection", {
                            path: { path },
                            date: { date },
                        })
                    }
                >
                <Text style={styles.text}>Next</Text>
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
});

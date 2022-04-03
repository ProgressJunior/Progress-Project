import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Date Picker
import DatePicker from "react-native-date-picker";

export default function PathSelection({navigation}) {
    // For date picker
    const [date, setDate] = useState(new Date());

    return (
        <View style={styles.container}>

            <DatePicker
                date={date}
                onDateChange={setDate}
                fadeToColor={"#333333"}
                androidVariant={"iosClone"}
                textColor={"#ababab"}
            />

            <Pressable
                style={styles.button}
                onPress={() => setDate(new Date())}
                // onPress={() => navigation.navigate('DateSelection')}
            >
                <Text>Reset Date</Text>
            </Pressable>
            <Text id="elem2" style={styles.text}>{date.toISOString()}</Text>

            <View style={styles.navigationButtonWrapper}>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('PathSelection')}
                >
                    <Text>Back</Text>
                </Pressable>

                <Pressable
                    style={styles.button}
                    // onPress={() => navigation.navigate('DateSelection')}
                >
                    <Text>Next</Text>
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
    navigationButtonWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: windowHeight / 100,
        width: windowWidth / 1.1
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
    },
});

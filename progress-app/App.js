import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";

const windowWidth = Dimensions.get("window").width;

// Date Picker
import DatePicker from "react-native-date-picker";

// Dropdown
import DropDownPicker from "react-native-dropdown-picker";

export default function App() {
    // For date picker
    const [date, setDate] = useState(new Date());

    // For dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.rowWrapper}>
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
            </View>

            <View style={styles.rowWrapper}>
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
            </View>

            <View style={styles.rowWrapper}>
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
            </View>

            <View style={styles.rowWrapper}>
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
            </View>

            <View style={styles.rowWrapper}>
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
            </View>

            <View style={styles.rowWrapper}>
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
                <View style={styles.box} />
            </View>

            <DatePicker date={date} onDateChange={setDate} />
            <Button
                title="Reset Date"
                onPress={() => setDate(new Date())}
            ></Button>
            <Text>{date.toISOString()}</Text>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

			{/* Text for items */}
			<Text>{value}</Text>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        width: windowWidth / 6.5,
        height: 50,
        backgroundColor: "red",
        margin: windowWidth / 200,
    },
    rowWrapper: {
        flexDirection: "row",
    },
});

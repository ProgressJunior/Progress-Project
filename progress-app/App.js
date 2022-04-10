import { createStackNavigator } from "@react-navigation/stack";

import PathSelection from "./Views/PathSelection/PathSelection.js";
import DateSelection from "./Views/DateSelection/DateSelection.js";
import StorageSelection from "./Views/StorageSelection/StorageSelection.js";
import LastScreen from "./Views/LastScreen/LastScreen.js";

import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                // hide navigation header
                screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="PathSelection" component={PathSelection} />
                <Stack.Screen name="DateSelection" component={DateSelection} />
                <Stack.Screen name="StorageSelection" component={StorageSelection} />
                <Stack.Screen name="LastScreen" component={LastScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

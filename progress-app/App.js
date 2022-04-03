import { createStackNavigator } from "@react-navigation/stack";

import PathSelection from "./PathSelection/PathSelection";
import DateSelection from "./DateSelection/DateSelection";

import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                // hide navigation header (thx github copilot ;P )
                headerMode="none"
            >
                <Stack.Screen name="PathSelection" component={PathSelection} />
                <Stack.Screen name="DateSelection" component={DateSelection} />
                {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

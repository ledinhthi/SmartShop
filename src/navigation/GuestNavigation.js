import {
    CardStyleInterpolators,
    createStackNavigator
} from "@react-navigation/stack";

import * as React from "react";

const Stack = createStackNavigator();

export const GuestStack = () => {
    return (
        <Stack.Navigator>
            // Login 
            <Stack.Screen>

            </Stack.Screen>
            // Register
        </Stack.Navigator>
    )
}


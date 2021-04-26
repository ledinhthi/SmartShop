import {
    CardStyleInterpolators,
    createStackNavigator
} from "@react-navigation/stack";
import { Login } from "../screens/Login"
import { Register } from "../screens/Register"
import Constant from "../utils/Constants"
import * as React from "react";

const Stack = createStackNavigator();

export const GuestStack = () => {
    return (
        <Stack.Navigator headerMode='none' initialRouteName={Constant.PAGE_KEY.LOGIN_PAGE_KEY}>
            <Stack.Screen name={Constant.PAGE_KEY.LOGIN_PAGE_KEY} component={Login} />
            <Stack.Screen
                name={Constant.PAGE_KEY.REGISTER_PAGE_KEY} component={Register} />
        </Stack.Navigator>
    )
}



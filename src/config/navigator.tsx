import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack";
import { Home, Settings, SinglePlayerGame } from "@screens";
import { colors } from "@utils";

export type stackNavigatorParams = {
    Home: undefined;
    SinglePlayerGame: undefined;
    Settings: undefined;
};

const navigatorOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.purple,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    headerTintColor: colors.lightGreen,
    headerTitleAlign: "center",
    headerTitleStyle: {
        fontFamily: "DeliusUnicase_700Bold",
        fontSize: 20,
    },
    headerBackTitleStyle: {
        fontFamily: "DeliusUnicase_400Regular",
        fontSize: 14,
    },
};

const Stack = createStackNavigator<stackNavigatorParams>();

export default function Navigator(): ReactElement {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={navigatorOptions}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen
                    name="SinglePlayerGame"
                    component={SinglePlayerGame}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

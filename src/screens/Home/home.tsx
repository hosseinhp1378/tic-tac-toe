import { ScrollView, View, Image } from "react-native";
import React, { ReactElement, useContext } from "react";
import { styles } from "./home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackNavigatorParams } from "@config/navigator";
import { Button, GradientBackground, Text } from "@components";
import { useAuth } from "@contexts/auth-context";

type HomeProps = {
    navigation: StackNavigationProp<stackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    const { user } = useAuth();

    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require("@assets/logo.png")} style={styles.logo} />
                <View style={styles.buttons}>
                    <Button
                        onPress={() => navigation.navigate("SinglePlayerGame")}
                        style={styles.button}
                        title="Single Player"
                    />
                    <Button style={styles.button} title="multiplayer" />
                    <Button
                        onPress={() => {
                            if (user) {
                                null;
                            } else {
                                navigation.navigate("Login");
                            }
                        }}
                        style={styles.button}
                        title={user ? "Logout" : "Login"}
                    />
                    <Button
                        onPress={() => navigation.navigate("Settings")}
                        style={styles.button}
                        title="Settings"
                    />

                    {user && (
                        <Text weight={400} style={styles.loggedInText}>
                            {" "}
                            Logged In as <Text weight={700}> {user.username} </Text>
                        </Text>
                    )}
                </View>
            </ScrollView>
        </GradientBackground>
    );
}

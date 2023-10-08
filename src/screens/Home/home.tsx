import { ScrollView, View, Image } from "react-native";
import React, { ReactElement, useState } from "react";
import { styles } from "./home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackNavigatorParams } from "@config/navigator";
import { Button, GradientBackground, Text } from "@components";
import { useAuth } from "@contexts/auth-context";
import { Auth } from "aws-amplify";

type HomeProps = {
    navigation: StackNavigationProp<stackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    const { user } = useAuth();
    const [signedOut, setSigendOut] = useState(false);
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
                        onPress={async () => {
                            if (user) {
                                setSigendOut(true);
                                try {
                                    await Auth.signOut();
                                } catch (error) {
                                    console.log(error);
                                }
                                setSigendOut(false);
                            } else {
                                navigation.navigate("Login");
                            }
                        }}
                        loading={signedOut}
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

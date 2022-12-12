import { ScrollView, View, Image } from "react-native";
import React, { ReactElement } from "react";
import { styles } from "./home.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackNavigatorParams } from "@config/navigator";
import { Button, GradientBackground } from "@components";

type HomeProps = {
    navigation: StackNavigationProp<stackNavigatorParams, "Home">;
};

export default function Home({ navigation }: HomeProps): ReactElement {
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require("@assets/logo.png")} style={styles.logo} />
                <View style={styles.buttons}>
                    <Button style={styles.button} title="Single Player" />
                    <Button style={styles.button} title="multiplayer" />
                    <Button style={styles.button} title="Login" />
                    <Button style={styles.button} title="Settings" />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}

import React from "react";
import { StyleSheet, View } from "react-native";
import {
    useFonts,
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import { Text } from "@components";

export default function App() {
    const [fontLoaded] = useFonts({ DeliusUnicase_400Regular, DeliusUnicase_700Bold });
    return (
        fontLoaded && (
            <View style={styles.container}>
                <Text style={styles.text} weight={700}>
                    Hello <Text weight={400}>World!</Text>
                </Text>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 25,
    },
});

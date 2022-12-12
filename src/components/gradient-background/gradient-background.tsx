import { View, StyleSheet } from "react-native";
import React, { ReactElement, ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

type GradientBackgroundProps = {
    children: ReactNode;
};

export default function GradientBackground({ children }: GradientBackgroundProps): ReactElement {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <LinearGradient
                style={{ ...StyleSheet.absoluteFillObject }}
                colors={["#120318", "#221a36"]}
            />
            {children}
        </View>
    );
}

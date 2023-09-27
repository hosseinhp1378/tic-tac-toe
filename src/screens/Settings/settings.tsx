import { ScrollView, Switch, TouchableOpacity, View } from "react-native";
import React, { ReactElement } from "react";
import { GradientBackground, Text } from "@components";
import styles from "./settings.styles";
import { colors } from "@utils";
import { difficulties, useSettings } from "@contexts/settings-context";

export default function Settings(): ReactElement | null {
    const { settings, storeSetting } = useSettings();

    if (!settings) return null;
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.field}>
                    <Text style={styles.label}>Bot Difficulty</Text>
                    <View style={styles.choices}>
                        {Object.keys(difficulties).map((level, index) => {
                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.choice,
                                        {
                                            backgroundColor:
                                                settings.difficulty === level
                                                    ? colors.lightPurple
                                                    : colors.lightGreen,
                                        },
                                    ]}
                                    key={index}
                                    onPress={() =>
                                        storeSetting(
                                            "difficulty",
                                            level as keyof typeof difficulties
                                        )
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.choiceText,
                                            {
                                                color:
                                                    settings.difficulty === level
                                                        ? colors.lightGreen
                                                        : colors.darkPurple,
                                            },
                                        ]}
                                    >
                                        {difficulties[level as keyof typeof difficulties]}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
                <View style={[styles.field, styles.switchField]}>
                    <Text>Sounds</Text>
                    <Switch
                        ios_backgroundColor={colors.purple}
                        trackColor={{ false: colors.purple, true: colors.lightPurple }}
                        thumbColor={colors.lightGreen}
                        value={settings.sounds}
                        onChange={() => storeSetting("sounds", !settings.sounds)}
                    />
                </View>
                <View style={[styles.field, styles.switchField]}>
                    <Text>Haptics/Vibrations</Text>
                    <Switch
                        ios_backgroundColor={colors.purple}
                        trackColor={{ false: colors.purple, true: colors.lightPurple }}
                        thumbColor={colors.lightGreen}
                        value={settings.haptics}
                        onChange={() => storeSetting("haptics", !settings.haptics)}
                    />
                </View>
            </ScrollView>
        </GradientBackground>
    );
}

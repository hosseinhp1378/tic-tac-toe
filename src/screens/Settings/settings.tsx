import { Alert, ScrollView, Switch, TouchableOpacity, View } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import { GradientBackground, Text } from "@components";
import styles from "./settings.styles";
import { colors } from "@utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SettingsType = {
    difficulty: keyof typeof difficulties;
    haptics: boolean;
    sounds: boolean;
};

const difficulties = {
    "1": "Beginner",
    "3": "Intermediate",
    "4": "Hard",
    "-1": "Impossible",
};

export default function Settings(): ReactElement | null {
    const [settings, setSettings] = useState<SettingsType | null>(null);
    const defaultSettings: SettingsType = {
        difficulty: "-1",
        haptics: true,
        sounds: true,
    };

    const storeSetting = async <T extends keyof SettingsType>(
        setting: T,
        value: SettingsType[T]
    ) => {
        try {
            const oldSettings = settings ? settings : defaultSettings;
            const newSettings = {
                ...oldSettings,
                [setting]: value,
            };
            const jsonSetting = JSON.stringify(newSettings);
            await AsyncStorage.setItem("@settings", jsonSetting);
            setSettings(newSettings);
        } catch (error) {
            console.log(error);
            Alert.alert("Error!", "An Error has occred!");
        }
    };

    const loadSettings = async () => {
        try {
            const settings = await AsyncStorage.getItem("@settings");
            settings !== null ? setSettings(JSON.parse(settings)) : setSettings(defaultSettings);
        } catch (error) {
            console.log(setSettings);
            setSettings(defaultSettings);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

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

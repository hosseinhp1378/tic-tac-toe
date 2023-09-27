import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, ReactElement, ReactNode, useState, useEffect } from "react";
import React from "react";
import { Alert } from "react-native";

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

const defaultSettings: SettingsType = {
    difficulty: "-1",
    haptics: true,
    sounds: true,
};

type SettingsContextType = {
    settings: SettingsType | null;
    loadSettings: () => void;
    storeSetting: <T extends keyof SettingsType>(settings: T, value: SettingsType[T]) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function useSettings(): SettingsContextType {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}

function SettingsProvider(props: { children: ReactNode }): ReactElement {
    const [settings, setSettings] = useState<SettingsType | null>(null);

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

    return (
        <SettingsContext.Provider
            {...props}
            value={{
                settings,
                storeSetting,
                loadSettings,
            }}
        ></SettingsContext.Provider>
    );
}

export { useSettings, SettingsProvider, difficulties };

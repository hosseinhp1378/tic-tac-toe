import "react-native-gesture-handler";
import React, { ReactElement } from "react";
import { AppBootstrape } from "@components";
import Navigator from "@config/navigator";
import { SettingsProvider } from "@contexts/settings-context";

export default function App(): ReactElement {
    return (
        <AppBootstrape>
            <SettingsProvider>
                <Navigator />
            </SettingsProvider>
        </AppBootstrape>
    );
}

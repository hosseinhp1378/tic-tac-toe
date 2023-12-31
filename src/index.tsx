import "react-native-gesture-handler";
import React, { ReactElement } from "react";
import { AppBootstrape } from "@components";
import Navigator from "@config/navigator";
import { SettingsProvider } from "@contexts/settings-context";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
import { AuthProvider } from "@contexts/auth-context";

Amplify.configure(config);

export default function App(): ReactElement {
    return (
        <AuthProvider>
            <AppBootstrape>
                <SettingsProvider>
                    <Navigator />
                </SettingsProvider>
            </AppBootstrape>
        </AuthProvider>
    );
}

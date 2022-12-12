import "react-native-gesture-handler";
import React, { ReactElement } from "react";
import { AppBootstrape } from "@components";
import Navigator from "@config/navigator";

export default function App(): ReactElement {
    return (
        <AppBootstrape>
            <Navigator />
        </AppBootstrape>
    );
}

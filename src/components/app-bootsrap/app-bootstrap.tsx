import React, { ReactElement, ReactNode } from "react";
import {
    useFonts,
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";

type AppBootstrapeProps = {
    children?: ReactNode;
};

export default function AppBootstrape({ children }: AppBootstrapeProps): ReactElement {
    const [fontLoaded] = useFonts({ DeliusUnicase_400Regular, DeliusUnicase_700Bold });
    return fontLoaded ? <>{children}</> : <></>;
}

import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import {
    useFonts,
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import { Auth, Hub } from "aws-amplify";
import { useAuth } from "@contexts/auth-context";

type AppBootstrapeProps = {
    children?: ReactNode;
};

export default function AppBootstrape({ children }: AppBootstrapeProps): ReactElement {
    const [fontLoaded] = useFonts({ DeliusUnicase_400Regular, DeliusUnicase_700Bold });
    const [authLoaded, setAuthLoaded] = useState(false);
    const { setUser } = useAuth();
    useEffect(() => {
        async function checkCurrentUser() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
                console.log(user);
            } catch (error) {
                setUser(null);
                console.log(error);
            }
            setAuthLoaded(true);
        }
        checkCurrentUser();
        const hubListener = (hubData: any) => {
            const { data, event } = hubData.payload;
            switch (event) {
                case "signOut":
                    setUser(null);
                    break;
                case "signIn":
                    setUser(data);
                    break;
                default:
                    break;
            }
        };
        const hubListenerCancelToken = Hub.listen("auth", hubListener);
        return hubListenerCancelToken();
    }, []);
    return fontLoaded && authLoaded ? <>{children}</> : <></>;
}

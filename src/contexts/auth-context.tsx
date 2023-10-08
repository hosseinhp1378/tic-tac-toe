import React, {
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

type AuthContextType = {
    user: null | { [key: string]: any };
    setUser: Dispatch<SetStateAction<null | { [key: string]: any }>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider!");
    }
    return context;
}

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
    const [user, setUser] = useState<null | { [key: string]: any }>(null);
    return <AuthContext.Provider {...props} value={{ user, setUser }} />;
};

export { AuthProvider, useAuth };

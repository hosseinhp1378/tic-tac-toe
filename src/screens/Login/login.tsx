import { ScrollView, TextInput as NativeTextInput, Alert, TouchableOpacity } from "react-native";
import React, { ReactElement, useRef, useState } from "react";
import { Button, GradientBackground, Text, TextInput } from "@components";

import styles from "./login.styles";
import { Auth } from "aws-amplify";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackNavigatorParams } from "@config/navigator";

type LoginProp = {
    navigation: StackNavigationProp<stackNavigatorParams, "Login">;
};

export default function Login({ navigation }: LoginProp): ReactElement {
    const passwordRef = useRef<NativeTextInput | null>(null);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const login = async () => {
        setIsLoading(true);
        const { username, password } = form;
        try {
            const res = await Auth.signIn(username, password);
            navigation.navigate("Home");
        } catch (error: any) {
            if (error.code === "UserNotConfirmedException") {
                navigation.navigate("Signup", {
                    username,
                });
            }

            Alert.alert("Error!", error.message || "An error occured!");
        }
        setIsLoading(false);
    };
    return (
        <GradientBackground>
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    value={form.username}
                    placeholder="Username"
                    style={{ marginBottom: 20 }}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        passwordRef.current?.focus;
                    }}
                    onChangeText={value => {
                        setFormInput("username", value);
                    }}
                />
                <TextInput
                    ref={passwordRef}
                    value={form.password}
                    placeholder="Password"
                    secureTextEntry
                    returnKeyType="done"
                    onChangeText={value => {
                        setFormInput("password", value);
                    }}
                />

                <Button
                    loading={isLoading}
                    title="Login"
                    onPress={login}
                    style={{ marginBottom: 30 }}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.registerLink}>Don&apos;t have an account?</Text>
                </TouchableOpacity>
            </ScrollView>
        </GradientBackground>
    );
}

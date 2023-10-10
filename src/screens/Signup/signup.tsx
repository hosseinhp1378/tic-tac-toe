import {
    ScrollView,
    TextInput as NativeTextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Button, GradientBackground, Text, TextInput } from "@components";

import { Auth } from "aws-amplify";
import { StackNavigationProp } from "@react-navigation/stack";
import { stackNavigatorParams } from "@config/navigator";
import styles from "./signup.styles";
import { useHeaderHeight } from "@react-navigation/elements";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { colors } from "@utils";
import { RouteProp } from "@react-navigation/native";

type SignupProps = {
    navigation: StackNavigationProp<stackNavigatorParams, "Signup">;
    route: RouteProp<stackNavigatorParams>;
};

export default function Signup({ navigation, route }: SignupProps): ReactElement {
    const unconfirmedUsername = route.params?.username;
    const passwordRef = useRef<NativeTextInput | null>(null);
    const emailRef = useRef<NativeTextInput | null>(null);
    const nameRef = useRef<NativeTextInput | null>(null);
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "sth@gmail.com",
        name: "Test1",
    });
    const headerHeight = useHeaderHeight();
    const [isLoading, setIsLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [resending, setResending] = useState(false);
    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };
    const [step, setStep] = useState<"SignUp" | "OTP">(unconfirmedUsername ? "OTP" : "SignUp");

    const signup = async () => {
        setIsLoading(true);
        const { username, password, email, name } = form;
        try {
            await Auth.signUp({
                password,
                username,
                attributes: {
                    email,
                    name,
                },
            });
            setStep("OTP");
        } catch (error: any) {
            console.log(error.message || "An error occured!");
            Alert.alert("Error!", error.message || "An error occured!");
        }
        setIsLoading(false);
    };
    const confirmCode = async (code: string) => {
        try {
            setConfirming(true);
            await Auth.confirmSignUp(form.username || unconfirmedUsername || "", code);
            navigation.navigate("Login");
            Alert.alert("Success!", "You can now Login!");
            setConfirming(false);
        } catch (error: any) {
            console.log(error.message || "An error occured!");
            Alert.alert("Error!", error.message || "An error occured!");
        }
    };

    const resendCode = async (username: string) => {
        setResending(true);
        try {
            await Auth.resendSignUp(username);
        } catch (error: any) {
            console.log(error.message || "An error occured!");
            Alert.alert("Error!", error.message || "An error occured!");
        }
        setResending(false);
    };

    useEffect(() => {
        if (unconfirmedUsername) {
            resendCode(unconfirmedUsername);
        }
    }, []);

    return (
        <GradientBackground>
            <KeyboardAvoidingView
                keyboardVerticalOffset={headerHeight}
                style={{ flex: 1 }}
                behavior={Platform.OS === "android" ? "height" : "padding"}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    {step === "OTP" && (
                        <>
                            <Text style={styles.otpText}>
                                Enter the code that you received via email!
                            </Text>
                            {confirming ? (
                                <ActivityIndicator color={colors.lightGreen} />
                            ) : (
                                <>
                                    <OTPInputView
                                        placeholderCharacter="0"
                                        codeInputFieldStyle={styles.otpInputBox}
                                        pinCount={6}
                                        placeholderTextColor="#5d5379"
                                        codeInputHighlightStyle={styles.otpActiveInputBox}
                                        onCodeFilled={confirmCode}
                                    />
                                    {resending ? (
                                        <ActivityIndicator color={colors.lightGreen} />
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (form.username) {
                                                    resendCode(form.username);
                                                }
                                                if (unconfirmedUsername) {
                                                    resendCode(unconfirmedUsername);
                                                }
                                            }}
                                        >
                                            <Text style={styles.resendLink}>Resend Code</Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {step === "SignUp" && (
                        <>
                            <TextInput
                                value={form.username}
                                placeholder="Username"
                                style={{ marginBottom: 20 }}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    nameRef.current?.focus;
                                }}
                                onChangeText={value => {
                                    setFormInput("username", value);
                                }}
                            />
                            <TextInput
                                ref={nameRef}
                                value={form.name}
                                placeholder="Name"
                                style={{ marginBottom: 20 }}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailRef.current?.focus;
                                }}
                                onChangeText={value => {
                                    setFormInput("name", value);
                                }}
                            />
                            <TextInput
                                keyboardType="email-address"
                                ref={emailRef}
                                value={form.email}
                                placeholder="Email"
                                style={{ marginBottom: 20 }}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordRef.current?.focus;
                                }}
                                onChangeText={value => {
                                    setFormInput("email", value);
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
                                title="Sign-Up"
                                onPress={signup}
                                style={{ marginBottom: 30 }}
                            />
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </GradientBackground>
    );
}

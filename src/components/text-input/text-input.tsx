import {
    TextInput as NativeTextInput,
    StyleSheet,
    TextInputProps as NativeTextInputProps,
} from "react-native";
import React, { ReactElement, forwardRef } from "react";
import { colors } from "@utils";

const TextInput = forwardRef<NativeTextInput, NativeTextInputProps>(
    ({ style, ...props }, ref): ReactElement => {
        return (
            <NativeTextInput
                ref={ref}
                {...props}
                style={[styles.input, style]}
                placeholderTextColor="#5d5379"
            />
        );
    }
);

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: "100%",
        borderBottomWidth: 1,
        borderColor: colors.lightGreen,
        backgroundColor: colors.purple,
        padding: 10,
        fontFamily: "DeliusUnicase_400Regular",
    },
});

TextInput.displayName = "TextInput";
export default TextInput;

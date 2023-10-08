import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactElement } from "react";
import Text from "../text/Text";
import styles from "./button.styles";

type ButtonProps = {
    title: string;
    loading?: boolean;
} & TouchableOpacityProps;

export default function Button({
    title,
    style,
    loading = false,
    ...props
}: ButtonProps): ReactElement {
    return (
        <TouchableOpacity disabled={loading} {...props} style={[style, styles.button]}>
            {loading ? (
                <ActivityIndicator color="#000" />
            ) : (
                <Text style={styles.buttonText} weight={400}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

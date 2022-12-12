import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactElement } from "react";
import Text from "../text/Text";
import styles from "./button.styles";

type ButtonProps = {
    title: string;
} & TouchableOpacityProps;

export default function Button({ title, style, ...props }: ButtonProps): ReactElement {
    return (
        <TouchableOpacity {...props} style={[style, styles.button]}>
            <Text style={styles.buttonText} weight={400}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

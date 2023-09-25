import { Text as NativeText, TextProps as NativeTextProps } from "react-native";
import React, { ReactNode } from "react";
import { ReactElement } from "react";

type TextProps = {
    weight: 400 | 700;
    children?: ReactNode;
} & NativeTextProps;

const defaultProps = {
    weight: "700",
};

export default function Text({ children, style, weight = 700, ...props }: TextProps): ReactElement {
    return (
        <NativeText
            {...props}
            style={[
                style,
                {
                    fontFamily:
                        weight === 400 ? "DeliusUnicase_400Regular" : "DeliusUnicase_700Bold",
                },
            ]}
        >
            {children}
        </NativeText>
    );
}

Text.defaultProps = defaultProps;

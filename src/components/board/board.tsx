import { View, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Text from "../text/Text";
import styles from "./board.style";
import { BoardState } from "src/utils/types";

type BoardProps = {
    state: BoardState;
    size: number;
    disabled?: boolean;
    onCellPressed?: (index: number) => void;
};

export default function Board({ state, size, disabled, onCellPressed }: BoardProps): ReactElement {
    return (
        <View style={[styles.board, { width: size, height: size }]}>
            {state.map((cell, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => onCellPressed && onCellPressed(index)}
                        style={styles.cell}
                        key={index}
                        disabled={cell !== null || disabled}
                    >
                        <Text style={{ fontSize: size / 8 }} weight={700}>
                            {cell}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
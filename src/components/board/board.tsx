import { View, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import Text from "../text/Text";
import styles from "./board.style";
import { BoardResult, BoardState } from "src/utils/types";
import BoardLine from "./board-line";

type BoardProps = {
    state: BoardState;
    size: number;
    disabled?: boolean;
    onCellPressed?: (index: number) => void;
    gameResult?: BoardResult | false;
};

export default function Board({
    state,
    size,
    disabled,
    onCellPressed,
    gameResult,
}: BoardProps): ReactElement {
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
            {true && (
                <BoardLine
                    size={size}
                    gameResult={{
                        winner: "o",
                        row: 1,
                        direction: "D",
                        diagonal: "COUNTER",
                    }}
                />
            )}
            {/* {gameResult && <BoardLine size={size} gameResult={gameResult} />} */}
        </View>
    );
}

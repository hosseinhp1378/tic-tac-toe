import { View } from "react-native";
import React, { ReactElement, useState } from "react";
import { styles } from "./single-player-game.styles";
import { GradientBackground, Board } from "@components";
import {
    printFormattedBoard,
    BoardState,
    isEmpty,
    isFull,
    getAvailableMoves,
    isTerminal,
    getBestMove,
} from "@utils";

export default function SinglePlayerGame(): ReactElement {
    const [boardState, setBoardState] = useState<BoardState>([
        null,
        null,
        null,
        "o",
        null,
        "x",
        "o",
        "o",
        "x",
    ]);
    console.log("getBestMove: ", getBestMove(boardState, true));

    const handleOnCellPressed = (cell: number): void => {
        const stateCopy: BoardState = [...boardState];
        if (stateCopy[cell] || isTerminal(stateCopy)) return;
        stateCopy[cell] = "x";
        setBoardState(stateCopy);
    };

    return (
        <GradientBackground>
            <View style={styles.container}>
                <Board
                    disabled={Boolean(isTerminal(boardState))}
                    onCellPressed={cell => handleOnCellPressed(cell)}
                    size={300}
                    state={boardState}
                />
            </View>
        </GradientBackground>
    );
}

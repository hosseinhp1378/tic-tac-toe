import { View } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
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
        null,
        null,
        null,
        null,
        null,
        null,
    ]);
    const [turn, setTurn] = useState<"HUMAN" | "BOT">(Math.random() < 0.5 ? "HUMAN" : "BOT");

    const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
    const gameResult = isTerminal(boardState);

    const insertCell = (cell: number, symbol: "x" | "o"): void => {
        const stateCopy: BoardState = [...boardState];
        if (stateCopy[cell] || isTerminal(stateCopy)) return;
        stateCopy[cell] = symbol;
        setBoardState(stateCopy);
    };

    const handleOnCellPressed = (cell: number): void => {
        if (turn !== "HUMAN") return;
        insertCell(cell, isHumanMaximizing ? "x" : "o");
        setTurn("BOT");
    };

    useEffect(() => {
        if (gameResult) {
            alert("GameOver!");
        } else {
            if (turn === "BOT") {
                if (isEmpty(boardState)) {
                    const centerAndCorners = [0, 2, 6, 8, 4];
                    const firstMove =
                        centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
                    insertCell(firstMove, "x");
                    setIsHumanMaximizing(false);
                    setTurn("HUMAN");
                } else {
                    const best = getBestMove(boardState, !isHumanMaximizing, 0, -1);
                    insertCell(best, isHumanMaximizing ? "o" : "x");
                    setTurn("HUMAN");
                }
            }
        }
    }, [boardState, turn]);
    return (
        <GradientBackground>
            <View style={styles.container}>
                <Board
                    disabled={Boolean(isTerminal(boardState)) || turn !== "HUMAN"}
                    onCellPressed={cell => handleOnCellPressed(cell)}
                    size={300}
                    state={boardState}
                />
            </View>
        </GradientBackground>
    );
}

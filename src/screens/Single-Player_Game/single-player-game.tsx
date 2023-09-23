import { View } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import { styles } from "./single-player-game.styles";
import { GradientBackground, Board } from "@components";
import { BoardState, isEmpty, isTerminal, getBestMove, Cell, useSounds } from "@utils";

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
    const playSound = useSounds();

    const gameResult = isTerminal(boardState);

    const insertCell = (cell: number, symbol: "x" | "o"): void => {
        const stateCopy: BoardState = [...boardState];
        if (stateCopy[cell] || isTerminal(stateCopy)) return;
        stateCopy[cell] = symbol;
        setBoardState(stateCopy);
        try {
            symbol === "x" ? playSound("pop1") : playSound("pop2");
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnCellPressed = (cell: number): void => {
        if (turn !== "HUMAN") return;
        insertCell(cell, isHumanMaximizing ? "x" : "o");
        setTurn("BOT");
    };

    const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
        if (winnerSymbol === "x") {
            return isHumanMaximizing ? "HUMAN" : "BOT";
        } else if (winnerSymbol === "o") {
            return isHumanMaximizing ? "BOT" : "HUMAN";
        } else {
            return "DRAW";
        }
    };

    useEffect(() => {
        if (gameResult) {
            const winner = getWinner(gameResult.winner);
            if (winner === "HUMAN") {
                try {
                    playSound("win");
                    alert("You Won!");
                } catch (error) {
                    console.log(error);
                }
            } else if (winner === "BOT") {
                try {
                    playSound("lose");
                    alert("You Lost!");
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    playSound("draw");
                    alert("DRAW!");
                } catch (error) {
                    console.log(error);
                }
            }
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
                    const best = getBestMove(boardState, !isHumanMaximizing, 0, 1);
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

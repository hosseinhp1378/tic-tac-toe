import { View, Dimensions } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import { styles } from "./single-player-game.styles";
import { GradientBackground, Board, Text, Button } from "@components";
import { BoardState, isEmpty, isTerminal, getBestMove, Cell, useSounds } from "@utils";
import { difficulties, useSettings } from "@contexts/settings-context";

const SCREEN_WIDTH = Dimensions.get("screen").width;

export default function SinglePlayerGame(): ReactElement {
    const { settings } = useSettings();

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
    const [gamesCount, setGamesCount] = useState<{
        win: number;
        loss: number;
        draw: number;
    }>({
        win: 0,
        loss: 0,
        draw: 0,
    });

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

    const newGame = () => {
        setBoardState([null, null, null, null, null, null, null, null, null]);
        setTurn(Math.random() < 0.5 ? "HUMAN" : "BOT");
    };

    useEffect(() => {
        if (gameResult) {
            const winner = getWinner(gameResult.winner);
            if (winner === "HUMAN") {
                try {
                    playSound("win");
                    setGamesCount(prevState => {
                        return { ...prevState, win: prevState.win + 1 };
                    });
                } catch (error) {
                    console.log(error);
                }
            } else if (winner === "BOT") {
                try {
                    playSound("lose");
                    setGamesCount({ ...gamesCount, loss: gamesCount.loss + 1 });
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    playSound("draw");
                    setGamesCount(prevState => {
                        return { ...prevState, draw: prevState.draw + 1 };
                    });
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
                    const best = getBestMove(
                        boardState,
                        !isHumanMaximizing,
                        0,
                        parseInt(settings ? settings.difficulty : "-1")
                    );
                    insertCell(best, isHumanMaximizing ? "o" : "x");
                    setTurn("HUMAN");
                }
            }
        }
    }, [boardState, turn]);
    return (
        <GradientBackground>
            <View style={styles.container}>
                <View>
                    <Text weight={400} style={styles.difficulty}>
                        {" "}
                        Difficulty: {settings ? difficulties[settings.difficulty] : "Impossible"}
                    </Text>
                </View>
                <View style={styles.results}>
                    <View style={styles.resultsBox}>
                        <Text weight={400} style={styles.resultsTitle}>
                            Win
                        </Text>
                        <Text weight={400} style={styles.resultsCount}>
                            {gamesCount.win}
                        </Text>
                    </View>
                    <View style={styles.resultsBox}>
                        <Text weight={400} style={styles.resultsTitle}>
                            Draw
                        </Text>
                        <Text weight={400} style={styles.resultsCount}>
                            {gamesCount.draw}
                        </Text>
                    </View>
                    <View style={styles.resultsBox}>
                        <Text weight={400} style={styles.resultsTitle}>
                            Loss
                        </Text>
                        <Text weight={400} style={styles.resultsCount}>
                            {gamesCount.loss}
                        </Text>
                    </View>
                </View>
                <Board
                    disabled={Boolean(isTerminal(boardState)) || turn !== "HUMAN"}
                    onCellPressed={cell => handleOnCellPressed(cell)}
                    size={SCREEN_WIDTH - 60}
                    state={boardState}
                    gameResult={gameResult}
                />
                {gameResult && (
                    <View style={styles.modal}>
                        <Text weight={400} style={styles.modalText}>
                            {" "}
                            {getWinner(gameResult.winner) === "HUMAN" && "You Won!"}
                            {getWinner(gameResult.winner) === "BOT" && "You Lost!"}
                            {getWinner(gameResult.winner) === "DRAW" && "Draw!"}
                        </Text>
                        <Button title="Play Again" onPress={() => newGame()} />
                    </View>
                )}
            </View>
        </GradientBackground>
    );
}

import { View } from "react-native";
import React, { ReactElement, useEffect, useState, useRef } from "react";
import { styles } from "./single-player-game.styles";
import { GradientBackground, Board } from "@components";
import { BoardState, isEmpty, isTerminal, getBestMove, Cell } from "@utils";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

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
    const popSoundRef = useRef<Audio.Sound | null>(null);
    const pop2SoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);
    const loseSoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);
    const gameResult = isTerminal(boardState);

    const insertCell = (cell: number, symbol: "x" | "o"): void => {
        const stateCopy: BoardState = [...boardState];
        if (stateCopy[cell] || isTerminal(stateCopy)) return;
        stateCopy[cell] = symbol;
        setBoardState(stateCopy);
        try {
            symbol === "x"
                ? popSoundRef.current?.replayAsync()
                : pop2SoundRef.current?.replayAsync();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
        const popSoundObject = new Audio.Sound();
        const pop2SoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();
        const loseSoundObject = new Audio.Sound();
        const drawSoundObject = new Audio.Sound();
        const loadSounds = async () => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await popSoundObject.loadAsync(require("@assets/pop_1.wav"));
            popSoundRef.current = popSoundObject;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await pop2SoundObject.loadAsync(require("@assets/pop_2.wav"));
            pop2SoundRef.current = pop2SoundObject;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await winSoundObject.loadAsync(require("@assets/win.mp3"));
            winSoundRef.current = winSoundObject;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await loseSoundObject.loadAsync(require("@assets/loss.mp3"));
            loseSoundRef.current = loseSoundObject;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            await drawSoundObject.loadAsync(require("@assets/draw.mp3"));
            drawSoundRef.current = drawSoundObject;
        };
        loadSounds();
        return () => {
            popSoundObject && popSoundObject.unloadAsync();
            pop2SoundObject && pop2SoundObject.unloadAsync();
            winSoundObject && winSoundObject.unloadAsync();
            loseSoundObject && loseSoundObject.unloadAsync();
            drawSoundObject && drawSoundObject.unloadAsync();
        };
    }, []);
    useEffect(() => {
        if (gameResult) {
            const winner = getWinner(gameResult.winner);
            if (winner === "HUMAN") {
                try {
                    winSoundRef.current?.replayAsync();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    alert("You Won!");
                } catch (error) {
                    console.log(error);
                }
            } else if (winner === "BOT") {
                try {
                    loseSoundRef.current?.replayAsync();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                    alert("You Lost!");
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    drawSoundRef.current?.replayAsync();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
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

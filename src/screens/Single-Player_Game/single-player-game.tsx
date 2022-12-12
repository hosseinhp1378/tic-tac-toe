import { View } from "react-native";
import React, { ReactElement } from "react";
import { styles } from "./single-player-game.styles";
import { GradientBackground, Board } from "@components";
import { printFormattedBoard, BoardState, isEmpty, isFull, getAvailableMoves, isTerminal } from "@utils";


export default function SinglePlayerGame(): ReactElement {
    const boardState: BoardState = ['x', 'o', null,'x', 'o', null,'x', 'o', null,]
    printFormattedBoard(boardState)
    console.log(isTerminal(boardState))
    // console.log(isEmpty(boardState))
    // console.log(isFull(boardState))
    // console.log(getAvailableMoves(boardState))
    return (
        <GradientBackground>
            <View style={styles.container}>
                <Board onCellPressed={(index) => alert(index) } size={300} state={boardState}/>
            </View>
        </GradientBackground>
    );
}

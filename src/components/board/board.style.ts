import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    board: {
        backgroundColor: "green",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    cell: {
        width: "33.3333%",
        height: "33.3333%",
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles;
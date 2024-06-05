import {StyleSheet, View} from "react-native";

export const Element = (props: any) => {
    return (
        <View style={[styles.dopElement, props.row ? styles.flexRow : {}]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    dopElement: {
        width: '100%',
        borderRadius: 30,
        backgroundColor: '#2f3238',
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: '#9f9f9f',
        elevation: 3
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
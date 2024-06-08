import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";

export const DangerHeader = (props: {onBack: Function}) => {
    return (
        <View style={{paddingHorizontal: 30, paddingVertical: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: "700"}}>Danger</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={() => { props.onBack() }}>
                <LinearGradient
                    colors={['#2F353A', '#1C1F22']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.button}>
                    <Icon name={"keyboard-control"} size={20} color={'#a8a8a8'} />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 50,
        borderRadius: 100,
        shadowColor: '#989898',
        elevation: 10,
        justifyContent: "center",
        alignItems: "center"
    },
});
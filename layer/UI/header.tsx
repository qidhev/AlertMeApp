import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";

export type HeaderProps = {
    pressUpdate: Function
}

export const Header = (props: HeaderProps) => {

    const press = () => {
        props.pressUpdate()
    }

    return (
        <View style={{paddingHorizontal: 30, paddingVertical: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: "700"}}>AlertMe</Text>
                <Text style={{color: '#a8a8a8'}}>Today Dec 29,2023</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={press}>
                <LinearGradient
                    colors={['#2F353A', '#1C1F22']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.button}>
                    <Icon name={"update"} size={24} color={'#a8a8a8'} />
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
import LinearGradient from "react-native-linear-gradient";
import {Text, TouchableOpacity} from "react-native";
import React from "react";

export const Tab = (props: {label: string, isActive: boolean, onPress: Function}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPressIn={() => { props.onPress() }}>
            <LinearGradient
                colors={props.isActive ? ['#8E2DE2', '#6A19D8'] : ['#2F353A', '#1C1F22']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{paddingHorizontal: 20, height: 30, borderRadius: 10, justifyContent: "center", alignItems: "center", shadowColor: '#989898',
                    elevation: 5}}>
                <Text style={{color: (props.isActive ? '#fff' : '#a8a8a8'), fontWeight: "400" }}>{props.label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}
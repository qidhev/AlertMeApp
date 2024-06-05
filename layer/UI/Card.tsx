import Icon from "react-native-vector-icons/MaterialIcons";
import {Text, TouchableOpacity, View} from "react-native";
import {Element} from "./Element.tsx";
import React from "react";

export const Card = (props: {icon: string, title: string, subtitle?: string, infoTitle: string, onPress?: Function}) => {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => { props.onPress ? props.onPress() : null }}>
            <Element row={true}>
                <Icon name={props.icon} size={50} color={'#9f73cb'}/>
                <View style={{maxWidth: 250, justifyContent: 'flex-end', alignItems: "flex-end"}}>
                    <Text style={{color: '#fff', fontSize: 16, fontWeight: "700"}}>{props.title}</Text>
                    <Text style={{color: '#c0c0c0', display: props.subtitle ? "flex" : "none", fontSize: 14}}>{props.subtitle}</Text>
                    <Text style={{color: '#a8a8a8', fontSize: 12}}>{props.infoTitle}</Text>
                </View>
            </Element>
        </TouchableOpacity>
    )
}
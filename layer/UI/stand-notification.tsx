import {Button, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import {Element} from "./Element.tsx";
import {useMainStore} from "../store/main.ts";

export type StandNotificationProps = {
    title: string,
    subtitle: string,
    icon: string,
    onPress: () => void;
}

type StandNotificationData = {
    id: number,
    title: string,
    subtitle: string
}

export const StandNotification = (props: StandNotificationProps) => {
    const currentLocation = useMainStore(state => state.currentLocation);
    const locations = useMainStore(state => state.localities);

    const getData = () => {
        if (currentLocation === null) return [];

        let data = [];

        if (currentLocation?.address) {
            data.push({
                id: 1,
                title: currentLocation.address,
                subtitle: 'Информационное место'
            })
        }

        data.push({
            id: 2,
            title: currentLocation.phone,
            subtitle: 'Номер телефона'
        })

        return data;
    }
    return (
        <Element>
            <TouchableOpacity onPress={props.onPress} style={{gap: 20}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Icon name={props.icon} size={56} color={'#9f73cb'} />
                    <View style={{maxWidth: 200, justifyContent: 'flex-end', alignItems: "flex-end"}}>
                        <Text style={{color: '#fff', fontSize: 20, fontWeight: "700"}}>{props.title}</Text>
                        <Text style={{color: '#a8a8a8'}}>{props.subtitle}</Text>
                    </View>
                </View>
                {
                    getData().length
                        ? (
                            <View style={{flexDirection: "row", alignItems: 'flex-start', justifyContent: (getData().length === 1) ? "center" : "space-between", flexWrap: "wrap", gap: 20}}>
                                {
                                    getData().map((data: StandNotificationData) => (
                                        <View style={{justifyContent: "center", alignItems: 'center', maxWidth: '50%'}} key={data.id}>
                                            <Text style={{color: '#fff', fontSize: 11, fontWeight: "700"}}>{data.title}</Text>
                                            <Text style={{color: '#a8a8a8', fontSize: 12}}>{data.subtitle}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        )
                        : null
                }
                <Button title={"Click"} onPress={() => console.log(locations)} />
            </TouchableOpacity>
        </Element>
    )
}
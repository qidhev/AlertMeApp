import {Card} from "../UI/Card.tsx";
import {View} from "react-native";
import React from "react";

export const CallComponent = () => {
    return (
        <View style={{gap: 20}}>
            <Card icon={'local-hospital'} title={'Позвонить в скорую помощь'} infoTitle={'Нажмите, чтобы перейти в телефон'}/>
            <Card icon={'local-fire-department'} title={'Позвонить в пожарную службу'} infoTitle={'Нажмите, чтобы перейти в телефон'}/>
            <Card icon={'local-police'} title={'Позвонить в полицию'} infoTitle={'Нажмите, чтобы перейти в телефон'}/>
        </View>
    )
}
import {Card} from "../UI/Card.tsx";
import {View} from "react-native";
import React from "react";
import {openTel} from "../uses/open-tel.ts";

export const CallComponent = () => {
    return (
        <View style={{gap: 20}}>
            <Card onPress={() => openTel('103')} icon={'local-hospital'} title={'Позвонить в скорую помощь'} infoTitle={'Нажмите, чтобы перейти в телефон'}/>
            <Card onPress={() => openTel('101')} icon={'local-fire-department'} title={'Позвонить в пожарную службу'} infoTitle={'Нажмите, чтобы перейти в телефон'}/>
            <Card onPress={() => openTel('102')} icon={'local-police'} title={'Позвонить в полицию'} infoTitle={'Нажмите, чтобы перейти в телефон'}/>
        </View>
    )
}
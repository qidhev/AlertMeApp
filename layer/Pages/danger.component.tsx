import React from 'react';
import {View} from "react-native";
import {DangerHeader} from "../UI/DangerHeader.tsx";
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {StackParamList} from "../types/Stack.ts";

type ProfileScreenProps = {
    navigation: NavigationProp<ParamListBase>;
    route: { params: StackParamList['Danger'] };
};


export const DangerComponent: React.FC<ProfileScreenProps> = ({navigation}) => {
    return (
        <View style={{flex: 1, backgroundColor: '#282b31'}}>
            <DangerHeader onBack={() => { navigation.navigate('Main') }}/>
        </View>
    );
}
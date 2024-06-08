import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {DangerHeader} from "../UI/DangerHeader.tsx";
import {useMainStore} from "../store/main.ts";
import {Container} from "../UI/Container.tsx";
import {Element} from "../UI/Element.tsx";
import {openYamap} from "../uses/open-yamap.ts";
import {openTel} from "../uses/open-tel.ts";

// @ts-ignore
export const DangerComponent = ({navigation}) => {
    const notification = useMainStore(state => state.notification);
    const currentLocation = useMainStore(state => state.currentLocation);

    const openYaMap = () => {

    }

    return (
        <View style={{flex: 1, backgroundColor: '#282b31'}}>
            <DangerHeader title={'Уведомление'} onBack={() => { navigation.navigate('Main') }}/>
            <Container gap={30}>
                <View style={{display: "flex"}}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 16, fontWeight: '500'}}>{notification?.type.name}</Text>
                    <Text style={{textAlign: "center", color: "white", fontSize: 22, fontWeight: '700'}}>{notification?.title}</Text>
                    <Text style={{textAlign: "center", color: "#9f73cb", fontSize: 14, fontWeight: '500'}}>{notification?.subtitle}</Text>
                </View>
                <Element>
                    <Text style={{color: "#9f73cb", fontSize: 14, fontWeight: '500'}}>Сообщение</Text>
                    <Text style={{color: "white", fontSize: 18}}>{notification?.main_text}</Text>
                </Element>
                {
                    currentLocation?.phone
                        ? (
                            <TouchableOpacity activeOpacity={0.9} onPress={() => openTel(currentLocation?.phone)}>
                                <Element>
                                    <Text style={{color: "#9f73cb", fontSize: 14, fontWeight: '500'}}>Номер телефона</Text>
                                    <Text style={{color: "white", fontSize: 18}}>{currentLocation?.phone}</Text>
                                    <Text style={{color: '#a8a8a8', fontSize: 12}}>Нажмите, чтобы позвонить</Text>
                                </Element>
                            </TouchableOpacity>
                        )
                        : null
                }
                {
                    currentLocation?.address
                        ? (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() =>
                                    currentLocation?.latitude && currentLocation?.longitude
                                        ? openYamap(currentLocation?.latitude, currentLocation?.longitude)
                                        : null
                                }
                            >
                                <Element>
                                    <Text style={{color: "#9f73cb", fontSize: 14, fontWeight: '500'}}>Адрес пункта '{currentLocation?.type?.name}'</Text>
                                    <Text style={{color: "white", fontSize: 18}}>{currentLocation?.address}</Text>
                                    <Text style={{color: '#a8a8a8', fontSize: 12}}>Нажмите, чтобы построить маршрут</Text>
                                </Element>
                            </TouchableOpacity>
                        )
                        : null
                }
            </Container>
        </View>
    );
}
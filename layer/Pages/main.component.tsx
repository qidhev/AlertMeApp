import {Animated, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Header} from "../UI/header.tsx";
import {StandNotification} from "../UI/stand-notification.tsx";
import {Tab} from "../UI/Tab.tsx";
import {Container} from "../UI/Container.tsx";
import {CallComponent} from "../Components/CallComponent.tsx";
import {useMainStore} from "../store/main.ts";
import moment from "moment";
import {navigationRef} from "../services/navigation.service.ts";
import ScrollView = Animated.ScrollView;


export const MainComponent = () => {
    const [activeTab, setActiveTab] = useState(1);
    const notification = useMainStore(state => state.notification);
    const localities = useMainStore(state => state.localities);
    const getCurrentLocation = useMainStore(state => state.getCurrentLocation);

    useEffect(() => {
        getCurrentLocation();
    }, [notification, localities]);

    return (
        <View style={{flex: 1, backgroundColor: '#282b31'}}>

            <Header pressUpdate={() => { console.log("Update...") }} />
            {
                notification ?
                    (
                        <Container>
                            <StandNotification
                                onPress={() => navigationRef.current?.navigate("Danger")}
                                title={notification.title}
                                subtitle={`Период ${moment(notification.date_start_at).format('DD.MM HH:mm')} - ${moment(notification.date_end_at).format('DD.MM HH:mm')}`}
                                icon={'error'}
                            />
                        </Container>
                    ) :
                    null
            }
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{maxHeight: 40}}
                contentContainerStyle={{flexDirection: "row", gap: 10, paddingHorizontal: 30}}
            >
                <Tab label={'Звонки'} isActive={activeTab == 1} onPress={() => { setActiveTab(1) }} />
                <Tab label={'История собития'} isActive={activeTab == 2} onPress={() => { setActiveTab(2) }}/>
            </ScrollView>

            <Container>
                <View style={{display: activeTab == 1 ? "flex" : "none"}}>
                    <CallComponent/>
                </View>
                <View style={{display: activeTab == 2 ? "flex" : "none"}}>
                    <Text style={{textAlign: "center", color: "white", fontSize: 22, fontWeight: '700'}}>История пустая</Text>
                </View>
            </Container>

        </View>
    )
}
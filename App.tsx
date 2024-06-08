import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createForeground} from "./layer/uses/create-foreground.ts";
import {MainComponent} from "./layer/Pages/main.component.tsx";
import {DangerComponent} from "./layer/Pages/danger.component.tsx";
import {navigationRef} from "./layer/services/navigation.service.ts";
import {useMainStore} from "./layer/store/main.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PushLocalNotifyService} from "./layer/services/push-local-notify.service.ts";

const Stack = createNativeStackNavigator();

const App = () => {
    const init = useMainStore(state => state.init);
    const loadLocations = useMainStore(state => state.loadLocations);

    const openInfoNotify = async () => {
        const isNewNotify = (await AsyncStorage.getItem('is-new-notification')) === 'true';

        if (isNewNotify) {
            await AsyncStorage.setItem('is-new-notification', 'false');
            navigationRef.current?.navigate("Danger")
        }
    }

    useEffect(() => {
        createForeground();
        loadLocations();
    }, []);

    useEffect(() => {
        PushLocalNotifyService.startOnEvent()
        PushLocalNotifyService.addEventInClickNotify(() => {
            init()
            AsyncStorage.setItem('is-new-notification', 'false');
            navigationRef.current?.navigate("Danger")
        })

        init();

        openInfoNotify()

        const intervalCheck = setInterval(() => {
            init();
        }, 1000);

        return () => clearInterval(intervalCheck);
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar/>
                <Stack.Navigator initialRouteName={'Main'}>
                    <Stack.Screen
                        name="Main"
                        component={MainComponent}
                        options={{headerShown: false }}
                    />
                    <Stack.Screen
                        name="Danger"
                        component={DangerComponent}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {MqttService} from "./services/mqtt.service.ts";
import {ForegroundService} from "./services/foreground.service.ts";
import PushNotification, { Importance } from 'react-native-push-notification';

const mqtt = new MqttService(
    'mqtt://test.mosquitto.org:1883',
    'quito-test-client'
);

const taskMqtt = async () => {
    await mqtt.init(
        (topic: string, payload: string) => {
            const data = JSON.parse(payload);

            PushNotification.localNotification({
                channelId: 'channel-id',
                ticker: 'My Notification Ticker', // (optional)
                autoCancel: true, // (optional) default: true
                bigText: data.bigText, // (optional) default: "message" prop
                subText: data.subText, // (optional) default: none
                ongoing: true, // (optional) set whether this is an "ongoing" notification
                invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
                title: data.title, // (optional)
                message: data.message
            });

        },
        (error: any) => {
        }
    );

    await mqtt.connect();
    await mqtt.subscribe('testHostJoinJoin')
}




const App = () => {
    try {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish("");
            },

            requestPermissions: false
        });
    } catch (e) {}

    const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;

    PushNotification.deleteChannel("channel-id")

    PushNotification.createChannel(
        {
            channelId: "channel-id", // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created: boolean) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    // PushNotification.
    /**
     * Toggles the background task
     */
    const toggleBackground = async () => {
        if (!ForegroundService.isRunning()) {
            try {
                await ForegroundService.start(taskMqtt);
                console.log('Successful start!');
            } catch (e) {
                console.log('Error', e);
            }
        } else {
            await mqtt.disconnect();
            await ForegroundService.stop();
            console.log('Stop background service');
        }
    };
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header />
                    {!usingHermes ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.body}>
                        <TouchableOpacity
                            style={{ height: 100, width: 100, backgroundColor: 'red' }}
                            onPress={toggleBackground}></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
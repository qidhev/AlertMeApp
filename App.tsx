/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {MqttService} from "./services/mqtt.service.ts";
import {ForegroundService} from "./services/foreground.service.ts";

// const sleep = (time: any) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));
//
// const config = new MqttOptionsBuilder()
//     .uri('mqtt://test.mosquitto.org:1883')
//     .clientId('quito-test-client')
//     .build();
//
// const client = new MqttClient(config);

const mqtt = new MqttService(
    'mqtt://test.mosquitto.org:1883',
    'quito-test-client'
);

// const taskRandom = async (taskData: any) => {
//     await new Promise( async (resolve) => {
//
//
//         client.on(
//             MqttEvent.MESSAGE_RECEIVED,
//             (topic: string, payload: Uint8Array) => {
//                 try {
//                     // Преобразование Uint8Array в Buffer
//                     // const buffer = Buffer.from(payload);
//                     // const string = buffer.toString();
//
//                     console.log('MESSAGE_RECEIVED', topic, payload.toString())
//                 } catch (e) {
//                     console.log("Что-то не так с: ", topic)
//                 }
//             }
//         );
//         client.on(MqttEvent.CONNECTION_LOST, (error?: any) => {
//             console.log('CONNECTION_LOST', error)
//         });
//         client.on(MqttEvent.EXCEPTION, (error: any) => {
//             console.log('EXCEPTION', error)
//         });
//
//         await client.connectAsync();
//
//         const topic: MqttSubscription = {
//             topic: "presenceFLKdflks",
//             qos: 0
//         }
//
//         await client.subscribeAsync(topic);
//
//         await client.publishAsync(
//             'presenceFLKdflks',
//             Buffer.from("This is test message")
//         );
//
//         for (let i = 0; BackgroundJob.isRunning(); i++) {
//             await sleep(10000);
//         }
//     });
// };

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'exampleScheme://chat/jane',
    parameters: {
        delay: 1000,
    },
};

const taskMqtt = async () => {
    await mqtt.init(
        (topic: string, payload: string) => {
            console.log(payload)
        },
        (error: any) => {
            console.log(error)
        });

    await mqtt.connect();
    await mqtt.subscribe('testHostJoinJoin')
}


const App = () => {
    const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;

    /**
     * Toggles the background task
     */
    const toggleBackground = async () => {
        if (!ForegroundService.isRunning()) {
            try {
                await ForegroundService.start(taskMqtt, options);
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
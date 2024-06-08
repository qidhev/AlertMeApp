import {addNotificationsFromMqtt} from "./add-notifications-from-mqtt.ts";
import {Topics} from "../types/topics.ts";
import {MqttService} from "../services/mqtt.service.ts";
import {ForegroundService} from "../services/foreground.service.ts";
import {DataApiService} from "../services/data-api.service.ts";

const mqtt = new MqttService(
    'mqtt://test.mosquitto.org:1883',
    'quito-test-client'
);

const taskMqtt = async () => {
    const {slug} = await DataApiService.getStartData();

    await mqtt.createEventMessage(
        addNotificationsFromMqtt,
        (error: any) => {
            throw Error(`Не получается подключится к mqtt ${error}`)
        }
    )

    await mqtt.connect();
    await mqtt.subscribe(Topics.notification)
    await mqtt.subscribe(Topics.danger)
    await mqtt.subscribe(`${Topics.notification}/${slug}`);
    await mqtt.subscribe(`${Topics.danger}/${slug}`);
}

export const createForeground = async () => {
    if (!ForegroundService.isRunning()) {
        try {
            await ForegroundService.start(taskMqtt);
            console.log('Successful start!');
        } catch (e) {
            await ForegroundService.stopAndAfterStart(taskMqtt, 1000)
            console.log(e)
        }
    }
    // else {
    //     try {
    //         await ForegroundService.stop();
    //         await mqtt.disconnect();
    //         console.log('Stop background service');
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}
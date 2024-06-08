import {addNotificationsFromMqtt} from "./add-notifications-from-mqtt.ts";
import {Topics} from "../types/topics.ts";
import {MqttService} from "../services/mqtt.service.ts";
import {ForegroundService} from "../services/foreground.service.ts";
import {DataApiService} from "../services/data-api.service.ts";
import BackgroundJob from "react-native-background-actions";
import {PushLocalNotifyService} from "../services/push-local-notify.service.ts";
import {Importance} from "react-native-push-notification";

const mqtt = new MqttService(
    'mqtt://test.mosquitto.org:1883',
    'quito-test-client'
);

const taskMqtt = async () => {
    const connectToTopics = async () => {
        try {
            await mqtt.connect();
            await mqtt.subscribe(Topics.notification)
            await mqtt.subscribe(Topics.danger)

            if (data?.slug) {
                await mqtt.subscribe(`${Topics.notification}/${data.slug}`);
                await mqtt.subscribe(`${Topics.danger}/${data.slug}`);
                await mqtt.subscribe(`${Topics.locality}/${data.slug}`)
            }

            await BackgroundJob.updateNotification({
                taskDesc: 'Подключение активно'
            })
        } catch (e) {
            await BackgroundJob.updateNotification({
                taskDesc: 'Ошибка подключения к mqtt '+ e
            })
        }
    }

    const data = await DataApiService.getStartData();

    await mqtt.createEventMessage(
        addNotificationsFromMqtt,
        (error: any) => {
            BackgroundJob.updateNotification({
                taskDesc: `Не получается подключится к mqtt ${error}`
            })

            connectToTopics()
        }
    )

    connectToTopics()
}

export const createForeground = async () => {
    if (!ForegroundService.isRunning()) {
        try {
            await ForegroundService.start(taskMqtt);
            await BackgroundJob.updateNotification({
                taskDesc: 'Начальный запуск успешный'
            })
        } catch (e) {
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
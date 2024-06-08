import {PushLocalNotifyService} from "../services/push-local-notify.service.ts";
import {Importance} from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TypeNotification} from "../types/typeNotification.enum.ts";
import {DataNotification} from "../types/dataNotification.ts";

const mainPushService = new PushLocalNotifyService({
    channelId: "Нажмите, чтобы открыть приложение",
    channelName: "Канал уведомлений",
    channelDescription: "Нажмите, чтобы открыть приложение",
    playSound: true,
    soundName: "default",
    importance: Importance.HIGH,
    vibrate: true,
});

export const addNotificationsFromMqtt = async (topic: string, payload: string) => {
    const data = JSON.parse(payload) as DataNotification;

    if (data.type === TypeNotification.notification) {
        await AsyncStorage.setItem('notification', JSON.stringify(data.notification));
        await AsyncStorage.setItem('is-new-notification', 'true');

        PushLocalNotifyService.cancelLocalNotify();

        mainPushService.createLocalNotify({
            mainMessage: data.notification.main_text,
            notDelete: true,
            title: data.notification.title,
            subTitle: data.notification.subtitle
        });
    } else if (data.type === TypeNotification.locality) {
        await AsyncStorage.setItem('locations', JSON.stringify(data.notification));
        console.log(data.notification)
    }
}
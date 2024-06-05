import {PushLocalNotifyService} from "../services/push-local-notify.service.ts";
import {Importance} from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';

const mainPushService = new PushLocalNotifyService({
    channelId: "channel-id",
    channelName: "My channel",
    channelDescription: "A channel to categorise your notifications",
    playSound: true,
    soundName: "default",
    importance: Importance.HIGH,
    vibrate: true,
});

export const addNotificationsFromMqtt = async (topic: string, payload: string) => {
    const data = JSON.parse(payload) as DataNotification;
    const {notification} = data;

    await AsyncStorage.setItem('notification', payload);
    await AsyncStorage.setItem('is-new-notification', 'true');

    PushLocalNotifyService.removeAllNotifications();

    mainPushService.createLocalNotify({
        mainMessage: notification.main_text,
        notDelete: true,
        title: notification.title,
        subTitle: notification.subtitle
    });
}
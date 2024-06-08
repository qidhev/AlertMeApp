import PushNotification, {ChannelObject} from "react-native-push-notification";

type Notify = {
    title: string,
    mainMessage: string,
    notDelete?: boolean,
    data?: any,
    subTitle: any
}

export class PushLocalNotifyService {
    private readonly channel: ChannelObject;
    private channels: string[] = [];
    private static callables: Function[] = [];
    constructor(channel: ChannelObject) {
        this.channel = channel;

        this.createChannel();
    }

    public static removeAllNotifications() {
        PushNotification.removeAllDeliveredNotifications();
    }

    public static addEventInClickNotify(callable: Function) {
        this.callables.push(callable);
    }

    public static startOnEvent() {
        PushNotification.configure({
            onNotification: (notification) => {
                this.callables.forEach((func: Function) => {
                    func(notification);
                });

                notification.finish("");
            },

            requestPermissions: false
        });
    }

    public createLocalNotify(notify: Notify) {
        PushNotification.localNotification({
            id: '123',
            channelId: this.channel.channelId,
            ticker: 'My Notification Ticker',
            autoCancel: true,
            bigText: notify.mainMessage,
            ongoing: notify.notDelete ?? false,
            invokeApp: true,
            title: notify.title,
            message: this.channel.channelId,
            userInfo: notify.data,
            subText: notify.subTitle,
            largeIcon: "ic_logo",
            smallIcon: "ic_logo"
        });
    }

    public static cancelLocalNotify() {
        PushNotification.cancelLocalNotification('123')
    }

    private createChannel() {
        this.pullChannel();

        // if (this.channels.includes(this.channel.channelId)) return;
        if (this.channels.includes(this.channel.channelId))
            PushNotification.deleteChannel(this.channel.channelId);

        PushNotification.createChannel(
            this.channel,
            // TODO: Убрать после разработки
            (created: boolean) =>
                console.log(`createChannel '${this.channel.channelId}' returned '${created}'`)
        );
    }

    private pullChannel() {
        PushNotification.getChannels((channel_ids: string[]) => {
            this.channels = channel_ids;
        });
    }
}
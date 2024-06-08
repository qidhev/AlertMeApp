import {MqttClient, MqttEvent, MqttOptionsBuilder, MqttSubscription} from '@arkyutao/react-native-mqtt';
import {Buffer} from "buffer";

export class MqttService {
    private client: MqttClient;
    private subscribeTopics: Array<string> = [];

    constructor(
        uri: string,
        client_id: string
    ) {
        const config = new MqttOptionsBuilder()
            .uri(uri)
            .clientId(client_id)
            .build();

        this.client = new MqttClient(config);

        this.client.init().catch(() => console.error("Что-то пошло не так при инициализации mqtt")); // TODO: Добавить логику переинициализации пока не будет норм
    }

    async createEventMessage(
        callableMessage: Function,
        error: Function
    ) {
        this.addEventMessage(callableMessage);

        this.client.on(MqttEvent.EXCEPTION, (err: any) => {
            error(err)
        });

        this.client.on(MqttEvent.CONNECTION_LOST, (err: any) => {
            error(err)
        });
    }

    async connect() {
        const is = await this.client.isConnected();

        if (is) return;

        await this.client.connectAsync();
    }

    async subscribe(topic: string) {
        this.subscribeTopics.push(topic);

        const createTopics: MqttSubscription[] =  this.subscribeTopics.map((topic: string) => {
            const createTopic: MqttSubscription = {
                topic,
                qos: 0
            }

            return createTopic;
        })

        await this.client.subscribeAsync(...createTopics);

        return this;
    }

    private addEventMessage(callable: Function) {
        try {
            this.client.on(
                MqttEvent.MESSAGE_RECEIVED,
                (topic: string, payload: Uint8Array) => {

                    if (!this.subscribeTopics.includes(topic)) {
                        return;
                    }

                    const buffer = Buffer.from(payload);
                    const string = buffer.toString();

                    callable(topic, string);
                }
            );
        } catch (e) {}
    }

    public async sendMessage(topic: string, message: string) {
        await this.client.publishAsync(topic, Buffer.from(message));
    }

    public async disconnect() {
        await this.client.disconnectAsync();
    }
}
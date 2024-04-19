import {MqttClient, MqttEvent, MqttOptionsBuilder, MqttSubscription, QoS} from '@arkyutao/react-native-mqtt';
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
    }

    async init(
        callableMessage: Function,
        error: Function
    ) {
        await this.client.init();

        this.addEventMessage(callableMessage);

        this.client.on(MqttEvent.EXCEPTION, (err: any) => {
            error(err)
        });
    }

    async connect() {
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
        this.client.on(
            MqttEvent.MESSAGE_RECEIVED,
            (topic: string, payload: Uint8Array) => {

                if (!this.subscribeTopics.includes(topic)) {
                    return;
                }

                try {
                    const buffer = Buffer.from(payload);
                    const string = buffer.toString();

                    callable(topic, string);
                } catch (e) {
                    console.log("Что-то не так с: ", topic)
                }
            }
        );
    }

    public async sendMessage(topic: string, message: string) {
        await this.client.publishAsync(topic, Buffer.from(message));
    }

    public async disconnect() {
        await this.client.disconnectAsync();
    }
}
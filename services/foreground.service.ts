import BackgroundJob from 'react-native-background-actions';

export class ForegroundService {

    private static options: any = {
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

    static async start(callable: Function) {
        if (BackgroundJob.isRunning()) {
            await BackgroundJob.stop();
        }

        const sleep = (time: any) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));
        const task = async (taskData: any) => {
            await new Promise( async (resolve) => {
                await callable();

                // Заглушка для постоянного фонового режима
                for (let i = 0; BackgroundJob.isRunning(); i++) {
                    await sleep(10000);
                }
            });
        }

        await BackgroundJob.start(task, this.options);
    }

    static async stop() {
        if (!BackgroundJob.isRunning()) return;

        await BackgroundJob.stop();
    }

    static isRunning() {
        return BackgroundJob.isRunning();
    }
}
import BackgroundJob from 'react-native-background-actions';

export class ForegroundService {

    private static options: any = {
        taskName: 'Фоновый процесс',
        taskTitle: 'Фоновый процесс',
        taskDesc: 'Фоновый процесс запущен',
        taskIcon: {
            name: 'ic_logo',
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
            await new Promise( async (resolve, reject) => {
                try {
                    await callable();
                } catch (e) {
                    reject(e)
                }

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

    static async stopAndAfterStart(callable: Function, afterTimeMs: number) {
        const sleep = (time: any) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

        await this.stop();

        await sleep(afterTimeMs);

        await this.start(callable);
    }

    static isRunning() {
        return BackgroundJob.isRunning();
    }
}
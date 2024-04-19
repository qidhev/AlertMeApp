import BackgroundJob from 'react-native-background-actions';

export class ForegroundService {

    static async start(callable: Function, options: any) {
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

        await BackgroundJob.start(task, options);
    }

    static async stop() {
        if (!BackgroundJob.isRunning()) return;

        await BackgroundJob.stop();
    }

    static isRunning() {
        return BackgroundJob.isRunning();
    }
}
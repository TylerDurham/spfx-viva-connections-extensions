export const LOG_SOURCE: string = 'SPfX Viva Connections';

export const log = (message: string | object, module?: string): boolean => {
    const prefix = `${LOG_SOURCE}${(module === undefined) ? '' : '=>' + module}: `
    if (typeof message === 'object') {
        console.log(`${prefix.toUpperCase()} ${JSON.stringify(message, null, 3)}`);
    } else {
        console.log(`${prefix.toUpperCase()} ${message}`);
    }

    return true;
}

export class LogTimer {

    private start: number;
    private module: string;

    constructor(module: string) {
        this.start = new Date().getTime();
        this.module = module;
    }

    public log(message: string | undefined) {
        const end = new Date().getTime() - this.start;
        if (message === undefined) {
            message = `Time elapsed: ${end}`
        } else {
            message = message.replace('%0', end.toString())
        }

        log(message, this.module);
    }
}

export const APP_NAME: string = 'SPfX Viva Connections';

/**
 * Formats the string that will be prefixed to every log entry.
 * @param moduleName Optional name of the module writing to the log.
 * @returns A formatted prefix string.
 */
const formatPrefix = (moduleName: string | undefined): string => {
    return `${APP_NAME}${(moduleName === undefined)
        ? ''
        : '=>' + moduleName}: `
        .toUpperCase();
}

/**
 * 
 * @param message 
 * @param moduleName 
 */
export function log(message: string | object, moduleName?: string): void {
    const prefix = formatPrefix(moduleName);
    if (typeof message === 'object') {
        console.log(`${prefix} ${JSON.stringify(message, null, 3)}`);
    } else {
        console.log(`${prefix} ${message}`);
    }
}

/**
 * 
 */
export class Timer {

    /** Timestamp indicating the start of the timer. */
    private _start: number;

    /**
     * Initializes the start of the timer.
     */
    constructor() {
        this._start = new Date().getTime();
    }

    /** Returns the time elapsed since the timer was started, in milliseconds. */
    public timeElapsed(): number {
        return new Date().getTime() - this._start;
    }
}

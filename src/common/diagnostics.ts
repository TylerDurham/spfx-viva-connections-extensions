export const LOG_SOURCE: string = 'SPfX Viva Connections';

export const log = (message: string | object) => {
    if (typeof message === 'object') {
        console.log(`${LOG_SOURCE}: ${JSON.stringify(message, null, 3)}`);
    } else {
        console.log(`${LOG_SOURCE}: ${message}`);
    }
}

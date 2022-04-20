import { Log as spLog } from "@microsoft/sp-core-library";

const CONSTANTS = {
    PORTAL_SEARCH_EL_REF_ID: "ba4784bcb03746ecb107b8414cedd7c9",
    LOG_SOURCE: "SPFXVivaConnectionsExtensions" 
};

Object.freeze(CONSTANTS);

const DEFAULTS = {
    searchPageUrl: `/_layouts/15/search.aspx`
};

const Log = {
    info(source: string, message: string | object) {
        console.log(CONSTANTS.LOG_SOURCE, `${source}: ${message}`);
    },

    warn(source: string, message: string | object) {
        console.warn(CONSTANTS.LOG_SOURCE, `${source}: ${message}`);
    }
};

Object.freeze(Log);

export function printObject(o: object) {
    const stack = [];
    for( const p in o) {
        stack.push(`${p}: ${o[p]}`);
    }

    return `{${stack.join(', ')}}`;
}

export { CONSTANTS, Log };
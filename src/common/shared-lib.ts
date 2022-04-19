import { Log as spLog } from "@microsoft/sp-core-library";

const CONSTANTS = {
    PORTAL_SEARCH_EL_REF_ID: "ba4784bcb03746ecb107b8414cedd7c9",
    LOG_SOURCE: "SPFX Viva Connections Extensions"
};

Object.freeze(CONSTANTS);

const Log = {
    info(source: string, message: string) {
        spLog.info(CONSTANTS.LOG_SOURCE, `${source}: ${message}`);
    },

    warn(source: string, message: string) {
        spLog.warn(CONSTANTS.LOG_SOURCE, `${source}: ${message}`);
    }
};

Object.freeze(Log);

export { CONSTANTS, Log };
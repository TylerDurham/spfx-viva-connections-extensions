export const SOLUTION_NAME = "ACE-QUICK-ACCESS";

const URL = location.href;
const DEBUG_LOGGING = URL.toUpperCase().indexOf('DEBUG=TRUE') > -1 // (QUERY_STRING.get("debug") === "true") ? true : false;

export const logger = {
    debug: (header: string, message: string | object) => {
        if(DEBUG_LOGGING) {
            console.debug(SOLUTION_NAME, `=> ${header.toUpperCase()}: `, message);
        }
    }
}

if (DEBUG_LOGGING === true) {
    logger.debug("debug", { message: "Logging is ON!", url: URL });
}

import { HELLO } from "../../../../common-lib/lib/index"

console.log(HELLO)
import * as URLParse from 'url-parse';
import * as Url from 'url-parse';

export interface IPortalContext {
    isDebugging?: boolean;
    debugParameters?: string;
    req: {
        url: string,
        query: Record<string, string>
    };
}

const getPortalContext = (currentUrl: string):IPortalContext => {
    const url = new Url(location.href, true);
    const query = url.query;

    let isDebugging: boolean = false, debugParameters: string = ``;

    if(query.debugManifestsFile && query.loadSPFX && query.customActions) {
        isDebugging = true;
        debugParameters = `debugManifestsFile=${encodeURIComponent(query.debugManifestsFile)}&loadSPFX=${query.loadSPFX}&customActions=${query.customActions}`;
    }

    return {
        isDebugging: isDebugging,
        debugParameters: debugParameters,
        req: {
            url: currentUrl,
            query: query
        }
    };
};

export default getPortalContext;
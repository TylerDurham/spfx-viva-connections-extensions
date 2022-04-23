import { IApplicationCustomizerProps } from "../extensions/application-customizer.interfaces";

export interface IPortalContextProperties extends IApplicationCustomizerProps {
    queryStringParameter: string;
    searchPageUrl: string;
    homePageUrl: string;
    [key: string]: string | boolean | number;
}
export interface IDebugContext {
    isDebugging: boolean;
    debugParameters: string;
}

export interface IRequestContext {
    url: string;
    query: Record<string, string>;
}

export interface IPortalContext {
    isLoaded: boolean;
    debug: IDebugContext;
    properties: IPortalContextProperties;
    req: IRequestContext;
}

import { IApplicationCustomizerProps } from "../extensions/application-customizer.interfaces";
import { IHomeSite } from './sharepoint-service';
export interface IPortalContextProperties extends IApplicationCustomizerProps {
    queryStringParameter: string;
    searchPageUrl: string;
    homePageUrl: string;
    homeSite: IHomeSite;
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

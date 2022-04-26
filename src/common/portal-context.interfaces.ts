import { IApplicationCustomizerProps } from "../extensions/application-customizer.interfaces";
import SharePointService, { IHomeSite } from './sharepoint-service';
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
    services: IServiceContext;
    req: IRequestContext;
}

export interface IServiceContext {
    spo: SharePointService;
}
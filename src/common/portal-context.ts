import * as React from 'react';
import * as Url from 'url-parse';
import { IApplicationCustomizerProps } from "../extensions/application-customizer.interfaces";
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { IPortalContext } from './portal-context.interfaces';

const DEFAULT_CONTEXT: IPortalContext = {
    isLoaded: false,
    debug: {
        debugParameters: undefined,
        isDebugging: false,
    },
    properties: {
        searchPageUrl: `/_layouts/15/search.aspx`,
        queryStringParameter: `q`,
        placeholderText: `Search in SharePoint...`,
        homePageUrl: `/`
    },
    req: {
        url: undefined,
        query: undefined
    }
};


const initializeContext = (appContext: ApplicationCustomizerContext, appProps: IApplicationCustomizerProps) => {
    const context = JSON.parse(JSON.stringify(DEFAULT_CONTEXT)) as IPortalContext;

    // What page are we on?
    const url = new Url(location.href, true);
    const query = url.query;

    // What is the base URL?
    const baseUrl = appContext.pageContext.web.absoluteUrl;

    // Debug info
    context.debug = getDebugParameters(query);

    // Assign context properties, and validate their input
    context.properties.homePageUrl = baseUrl; // TODO: Get Home Site URL as default
    context.properties.searchPageUrl = checkSearchPageUrl(baseUrl, appProps.searchPageUrl);
    context.properties.queryStringParameter = checkQueryStringParameter(appProps.queryStringParameter);

    // Let clients have confidence 
    context.isLoaded = true;
    return Object.freeze(context);
};

const PortalContext = React.createContext<IPortalContext>(DEFAULT_CONTEXT);
PortalContext.displayName = "PortalContext";

export { PortalContext, initializeContext, IPortalContext };

function getDebugParameters(query: Record<string, string>) {
    let isDebugging: boolean = false, debugParameters: string = ``;

    if (query.debugManifestsFile && query.loadSPFX && query.customActions) {
        isDebugging = true;
        debugParameters = `debugManifestsFile=${encodeURIComponent(query.debugManifestsFile)}&loadSPFX=${query.loadSPFX}&customActions=${query.customActions}`;
    }

    return { isDebugging: isDebugging, debugParameters: debugParameters };
}

function checkSearchPageUrl(baseUrl, url: string) {
    if (isNullOrEmpty(url)) {
        // Defaut value
        url = DEFAULT_CONTEXT.properties.searchPageUrl;
    }

    // A relative URL was specified
    if (url.indexOf("/") == 0) return baseUrl + url;

    // An absolute URL was specified
    if (url.indexOf("https://")) return url;
}

function checkQueryStringParameter(queryStringParameter: string) {
    if (isNullOrEmpty(queryStringParameter)) {
        // Default value.
        queryStringParameter = DEFAULT_CONTEXT.properties.queryStringParameter;
    }
    return queryStringParameter;
}

function isNullOrEmpty<T>(v: T) {
    if (v === undefined || v === null) return true;
    if (typeof v === 'string') {
        return (v.trim().length === 0);
    }

    return false;
}


/*
const getPortalContext = (currentUrl: string, properties?: IPortalContextProperties):IPortalContext => {
    
    const url = new Url(location.href, true);
    const query = url.query;

    let isDebugging: boolean = false, debugParameters: string = ``;

    if(query.debugManifestsFile && query.loadSPFX && query.customActions) {
        isDebugging = true;
        debugParameters = `debugManifestsFile=${encodeURIComponent(query.debugManifestsFile)}&loadSPFX=${query.loadSPFX}&customActions=${query.customActions}`;
    }

    return {
        isLoaded: true,
        isDebugging: isDebugging,
        debugParameters: debugParameters,
        properties: properties,
        req: {
            url: currentUrl,
            query: query
        }
    };
};
*/
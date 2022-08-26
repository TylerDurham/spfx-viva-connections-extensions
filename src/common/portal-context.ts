import * as React from 'react';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { getHomeSite, ISpoHomeSite } from './sharepoint-service';

interface IPortalContext {
    homeSite: ISpoHomeSite | undefined;
    debug: IDebugContext | undefined;
    search: ISearchContext | undefined;
}

interface IDebugContext {
    isDebugging: boolean;
    debugManifestsFile: string;
    customActions: string;
    loadSPFX: boolean;
}

interface ISearchContext {
    placeholderText: string;
    queryStringParameter: string;
    url: string;
}

const PortalContext = React.createContext<IPortalContext>({
    homeSite: undefined,
    debug: undefined,
    search: undefined
});
PortalContext.displayName = "PortalContext";

const getPortalContext = async (context: ApplicationCustomizerContext): Promise<IPortalContext> => {
    const portalContext = {
        debug: getDebugContext(),
        homeSite: await getHomeSite(context),
        search: getSearchContext()
    }

    return Object.freeze(portalContext);
}

const getSearchContext = (): ISearchContext => {
    return {
        placeholderText: "Search in SharePoint...",
        queryStringParameter: "q",
        url: "/_layouts/15/search.aspx",
    }
}

const getDebugContext = (): IDebugContext => {
    const url = new URL(location.href)
    const customActions = url.searchParams.get("customActions");
    const loadSPFX = (url.searchParams.get("loadSPFX") == null) ? false : true;
    const debugManifestsFile = url.searchParams.get("debugManifestsFile");
    const isDebugging = (debugManifestsFile !== null && loadSPFX !== null && customActions !== null);

    return {
        customActions, loadSPFX, debugManifestsFile, isDebugging
    }
}

export { PortalContext, getPortalContext, IPortalContext }
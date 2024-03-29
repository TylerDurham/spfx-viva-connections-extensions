import * as React from 'react';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { getHomeSite, ISpoHomeSite } from './sharepoint-service';


interface IPortalContext {
    homeSite: ISpoHomeSite | undefined;
    debug: IDebugContext | undefined;
    search: ISearchContext | undefined;
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

// this._getShowInSpo = (): boolean => {
//     this._param = '' + (new URL(window.location.href))
//         .searchParams
//         .get("showInSpo");

//     return (param.toUpperCase() === 'TRUE' || param === '1');
// }

interface IDebugContext {
    customActions: string;
    loadSPFX: boolean;
    debugManifestsFile: string;
    isDebugging: boolean;
    showInSpo: boolean;

    toQueryStringParams(): string;
}

class DebugContext implements IDebugContext {

    public customActions: string;
    public loadSPFX: boolean;
    public debugManifestsFile: string;
    public isDebugging: boolean;
    public showInSpo: boolean;

    constructor() {

        // Read QS params from URL
        const url = new URL(location.href);
        this.customActions = url.searchParams.get("customActions");
        this.loadSPFX = (url.searchParams.get("loadSPFX") === null) ? false : true;
        this.debugManifestsFile = url.searchParams.get("debugManifestsFile"); 
        this.showInSpo = (url.searchParams.get("showInSpo") === null) ? false : true;       
        this.isDebugging = (this.customActions !== null) && (this.debugManifestsFile !== null) && this.loadSPFX === true
    }   

    public toQueryStringParams(): string {
        const { debugManifestsFile, customActions, loadSPFX, showInSpo } = this;
        let url = '';
        if (this.isDebugging) {
            // Append SPFX debug state to URL.            
            url = url + `debugManifestsFile=${encodeURIComponent(debugManifestsFile)}&loadSPFX=${loadSPFX}&customActions=${customActions}`;
        } else if (showInSpo) {
            url = url + `showInSpo=${showInSpo}`;
        }

        return url;
    }
}

const getSearchContext = (): ISearchContext => {
    const sc: ISearchContext = {
        placeholderText: "Search in SharePoint...",
        queryStringParameter: "q",
        url: "/_layouts/15/search.aspx",
    }

    return sc;
}

const getPortalContext = async (context: ApplicationCustomizerContext): Promise<IPortalContext> => {
    const portalContext = {
        debug: Object.freeze(new DebugContext()),
        homeSite: Object.freeze (await getHomeSite(context)),
        search: Object.freeze(getSearchContext())
    }

    return Object.freeze(portalContext);
}

export { PortalContext, getPortalContext, IPortalContext }
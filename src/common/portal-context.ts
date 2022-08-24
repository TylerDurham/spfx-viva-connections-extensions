import { getHomeSite, ISpoHomeSite } from "./sharepoint-service";

interface IPortalContext {
    homeSite: ISpoHomeSite | undefined;
    debug: IDebugContext | undefined;
}

interface IDebugContext {
    isDebugging: boolean;
    debugManifestsFile: string;
    customActions: string;
    loadSPFX: boolean;
}

import * as React from "react";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { UrlQueryParameterCollection } from "@microsoft/sp-core-library";

const PortalContext = React.createContext<IPortalContext>({
    homeSite: undefined,
    debug: undefined
});
PortalContext.displayName = "PortalContext";


const getPortalContext = async (context: ApplicationCustomizerContext): Promise<IPortalContext> => {
    const portalContext = {
        homeSite: await getHomeSite(context),
        debug: getDebugContext()
    }

    return Object.freeze(portalContext);
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
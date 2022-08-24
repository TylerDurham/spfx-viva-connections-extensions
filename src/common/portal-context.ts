import { getHomeSite, ISpoHomeSite } from "./sharepoint-service";

interface IPortalContext {
    homeSite: ISpoHomeSite | undefined;
}

import * as React from "react";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

const PortalContext = React.createContext<IPortalContext>({
    homeSite: undefined
});
PortalContext.displayName = "PortalContext";


const getPortalContext = async (context: ApplicationCustomizerContext): Promise<IPortalContext> => {
    const portalContext = {
        homeSite: await getHomeSite(context)
    }

    return Object.freeze(portalContext);
}

export { PortalContext, getPortalContext, IPortalContext }
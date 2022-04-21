import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IPortalContext } from "../../common/portal-context";

export interface IPortalProps {
    homePageUrl: string;
    searchPageUrl: string;
    queryStringParameter: string;
    placeholderText: string;
    portalContext: IPortalContext;
}

export interface IPortalState {

}

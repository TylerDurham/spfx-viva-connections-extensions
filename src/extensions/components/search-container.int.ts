import { IPortalContext } from "../../common/portal-context";

export interface ISearchContainerProps {
    searchPageUrl: string;
    queryStringParameter: string;
    placeholderText: string;
    portalContext: IPortalContext;
}

export interface ISearchContainerState {
    queryText: string;
    debugParams: string;
}
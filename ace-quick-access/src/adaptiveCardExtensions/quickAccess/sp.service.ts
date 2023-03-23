import { AdaptiveCardExtensionContext } from "@microsoft/sp-adaptive-card-extension-base";
import { SPHttpClient } from '@microsoft/sp-http';
import { logger } from "./constants";
import SPOData, { IODataOptions } from "./sp.odata";

interface IResult {
    value: IGenericListItem[] | undefined;
    error?: ISPServiceError;
}
interface IGenericListItem {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
interface ISPServiceError {
    message: string;
    code: string;
}

export interface IListItem {
    id: string;
    title: string;
    actionText: string;
    actionUrl: string;
    description: string;
    sortOrder: number;
    thumbnailURL: string;
}

export interface IList {
    id: string;
    name: string;
    description: string;
    hidden: boolean;
}

export const fetchListTitle = async (spContext: AdaptiveCardExtensionContext, listId: string): Promise<string> => {
    if (!listId) { return Promise.reject("Please specify a listId!"); }

    const response = await (await spContext.spHttpClient.get(
        `${spContext.pageContext.web.absoluteUrl}/_api/web/lists/GetById(id='${listId}')`,
        SPHttpClient.configurations.v1
    )).json();

    logger.debug("fetching list title", response);

    return Promise.resolve(response.title);
}

export const fetchLists = async (context: AdaptiveCardExtensionContext): Promise<IList[]> => {

    const response = await (await context.spHttpClient.get(
        `${context.pageContext.web.absoluteUrl}/_api/web/lists`, //?$select=Id, Title, WebUrl`,
        SPHttpClient.configurations.v1
    )).json();

    logger.debug("fetching lists", response);

    return Promise.resolve(response.value.map((list: any, index: number) => {
        return <IList>{
            id: list.Id,
            name: list.Title,
            hidden: list.Hidden,
            description: list.Description
        }
    }));
}

export const fetchListItems = async (context: AdaptiveCardExtensionContext, listId: string, options?: IODataOptions): Promise<any> => {

    if (undefined === listId) {
        return Promise.reject("Please specify a listId!");
    }

    const response = await context.spHttpClient.get(
        `${context.pageContext.web.absoluteUrl}/_api/web/lists/GetByID('${listId}')/items/?${SPOData.stringify(options)}`,
        SPHttpClient.configurations.v1
    );

    logger.debug(`fetching list items`, response);

    const json: IResult = await response.json();

    logger.debug("finished fetching list items", json);

    if (json.error) {
        return Promise.reject(json.error);
    } else {
        return Promise.resolve(json.value.map((listItem: IGenericListItem) => {
            const { serverRelativeUrl, serverUrl } = JSON.parse(listItem.ThumbnailURL);
            return <IListItem>{
                id: listItem.Id,
                title: listItem.Title,
                actionUrl: listItem.ActionURL.Url,
                actionText: listItem.ActionText,
                sortOrder: listItem.SortOrder,
                description: listItem.Description,
                thumbnailURL: `${serverUrl}${serverRelativeUrl}`
            }
        }));
    }
}



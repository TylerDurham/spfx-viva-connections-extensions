import { AdaptiveCardExtensionContext } from '@microsoft/sp-adaptive-card-extension-base';
//import { SPHttpClient } from '@microsoft/sp-http';

export type SpoActiveContext = AdaptiveCardExtensionContext | WEbPart

export interface ISpoList {
    id: string;
    name: string;
    description: string;
    hidden: boolean;
}

export interface ISpoListItem {
    ID: number;
    Title: string;
    [key: string]: any;
}

export const lists = {

    getbyTitle: async (context: SpoActiveContext, title: string) => {},
    getbyId: async (context: SpoActiveContext, title: string) => { },
    items: async(context: SpoActiveContext) => {}
}

const fetch = async (context: SpoActiveContext, url: string) {

}

export const fetchLists = async (context: SpoActiveContext): Promise<ISpoList[]> => {
    const lists: ISpoList[] = [];

    return lists;
}

export const fetchListByTitle = async (context: SpoActiveContext, title: string): Promise<ISpoList | null> => {
    if (!title) { return Promise.reject("Please specify a title!"); }
    return null;
}

export const fetchListByID = async (context: AdaptiveCardExtensionContext, id: string): Promise<ISpoList | null> => {
    if (!id) { return Promise.reject("Please specify an id!"); }
    return null;
}

export 


import * as diag from './diagnostics';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { SPHttpClient } from '@microsoft/sp-http';
import SearchHistory, { ISearchHistoryItem } from './search-history';

/** Module name for logging. */
const MODULE_NAME = 'sharepoint-service';

export interface ISpoHomeSite {
    /** The unique Id of the site. */                   siteId: string;
    /** The unique Id of the web */                     webId: string;
    /** The absolute url of the site */                 url: string;
    /** The relative url for the logo of the site */    logoUrl: string;
    /** The title of the site */                        title: string;
}

/**
 * Gets information about the configured SharePoint Home Site.
 * @param context The current SharePoint context.
 * @returns Information about the SharePoint Home Site.
 */
export const getHomeSite = async (context: ApplicationCustomizerContext): Promise<ISpoHomeSite> => {
    const timer = new diag.Timer();
    const url = `${context.pageContext.web.absoluteUrl}/_api/SP.SPHSite/Details`;
    return context.spHttpClient.get(url, SPHttpClient.configurations.v1)
        .then((response) => {
            return response.json()
                .then((json) => {
                    diag.log(`Retrieved homesite url in .${timer.timeElapsed()} seconds.`, MODULE_NAME);
                    return {
                        siteId: json.SiteId.trim(),
                        webId: json.WebId.trim(),
                        title: json.Title.trim(),
                        url: json.Url.trim(),
                        logoUrl: json.LogoUrl.trim()
                    };
                });
        });
}

export interface ISpoSearchQuery {
    IsPersonal: boolean;
    Query: string;
}
export interface ISpoSearchSuggestions {
    PeopleNames: string[];
    Queries: ISpoSearchQuery[];
    History: ISearchHistoryItem[];
}

export const getSearchSuggestions = async (context: ApplicationCustomizerContext, queryText: string): Promise<ISpoSearchSuggestions> => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/search/suggest?querytext='${queryText}'&showpeoplenamesuggestions=true&fprequerysuggestions=true`;

    const timer = new diag.Timer();
    return context.spHttpClient.get(url, SPHttpClient.configurations.v1)
        .then((response) => {
            return response.json()
                .then((json) => {
                    diag.log(`Retrieved search suggestions in .${timer.timeElapsed()} seconds.`, MODULE_NAME);
                    json.History = ( new SearchHistory(5)).find(queryText);
                    return json
                });
        });
}


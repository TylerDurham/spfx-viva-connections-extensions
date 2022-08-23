import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { SPHttpClient } from '@microsoft/sp-http';
import { LogTimer } from "./diagnostics";

export interface IHomeSite {
    siteId: string;
    webId: string;
    url: string;
    logoUrl: string;
    title: string;
}
export const getHomeSite = async (context: ApplicationCustomizerContext): Promise<IHomeSite> => {
    const timer = new LogTimer('sharepoint-service');
    const url = `${context.pageContext.web.absoluteUrl}/_api/SP.SPHSite/Details`;
    return context.spHttpClient.get(url, SPHttpClient.configurations.v1)
        .then((response) => {
            return response.json()
                .then((json) => {
                    timer.log('Retrieved homesite url in .%0 seconds.');
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
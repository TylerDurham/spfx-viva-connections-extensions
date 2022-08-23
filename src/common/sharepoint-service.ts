import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { SPHttpClient } from '@microsoft/sp-http';

export interface IHomeSite {
    siteId: string;
    webId: string;
    url: string;
    logoUrl: string;
    title: string;
}
export const getHomeSite = async (context: ApplicationCustomizerContext): Promise<IHomeSite> => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/SP.SPHSite/Details`;
    return context.spHttpClient.get(url, SPHttpClient.configurations.v1)
        .then((response) => {
            return response.json()
                .then((json) => {
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
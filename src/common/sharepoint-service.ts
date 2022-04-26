import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import { Log } from './shared-lib';

interface IHomeSite {
    siteId: string;
    webId: string;
    url: string;
    logoUrl: string;
    title: string;
}

class SharePointService {
    private client: SPHttpClient;
    private context: ApplicationCustomizerContext;

    constructor(context: ApplicationCustomizerContext) {
        this.context = context;
        this.client = context.spHttpClient;
    }

    public async getHomeSite() {
        const url = `${this.context.pageContext.web.absoluteUrl}/_api/SP.SPHSite/Details`;
        return this.client.get(url, SPHttpClient.configurations.v1)
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

    public getSearchSuggestions(queryText: string) {
        const url = `https://3bcdst.sharepoint.com/_api/search/suggest?queryText='${queryText}'`; 
        //const url = `https://substrate.office.com/search/api/v1/suggestions?query=${queryText}&cvid=adb0c348-582c-6b83-be9e-f8b1caec25b3&scenario=HubSiteSearch&entityTypes=Text,Site,File,People&logicalId=5544cf2e-5faf-f98d-9af1-65c653302fe3&msgRequestId=e8ba9e0a-280e-6d53-6395-a315afd6398b`
        Log.info("getSearchSuggestions():", url)       
        return this.client.get(url, SPHttpClient.configurations.v1)
            .then((response) => {
                return response.json()
                    .then((json) => {
                        return json;
                    });
            });
    }
}

export { IHomeSite };
export default SharePointService;
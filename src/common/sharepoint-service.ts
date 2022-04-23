import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';

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
}

export { IHomeSite };
export default SharePointService;
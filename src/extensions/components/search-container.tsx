import * as React from 'react';
import  * as QueryString  from 'query-string';
import styles from './search-container.module.scss';
import { ISearchContainerProps, ISearchContainerState } from './search-container.int';
import { SearchBox } from 'office-ui-fabric-react';
export class SearchContainer extends React.Component<ISearchContainerProps, ISearchContainerState> {

    constructor(props: ISearchContainerProps) {
        super(props);

        let queryString = QueryString.parseUrl(location.href, {}).query;
        let qt = queryString[props.queryStringParameter] as string;
        let debugManifestsFile = queryString.debugManifestsFile as string;
        let loadSPFX = queryString.loadSPFX as string;
        let customActions = queryString.customActions as string;

        

        this.state = {
					queryText: qt ? qt : ``,
					debugParams:
						debugManifestsFile && loadSPFX && customActions
							? `&debugManifestsFile=${encodeURIComponent(debugManifestsFile)}&loadSPFX=${loadSPFX}&customActions=${customActions}`
							: ``,
				};
    }

    public render() {
        return (
            <div className={styles.searchContainer}>
                <SearchBox 
                    placeholder={this.props.placeholderText}
                    value={this.state.queryText} 
                    onChange={(event) => this.setState({ queryText: event && event.currentTarget ? event.currentTarget.value : "" })} 
                    onSearch={() => this.handleOnSearch(this.state.queryText)}/>
            </div>
        );
    }

    private handleOnSearch(queryText: string) {
        const { searchPageUrl, queryStringParameter, portalContext } = this.props;
        const { isDebugging, debugParameters } = portalContext;
        let newUrl = `${searchPageUrl}?${queryStringParameter}=${encodeURIComponent(queryText)}`;
        newUrl += (isDebugging) ? `&${debugParameters}` : ``; 
        window.location.href = newUrl;
    }
}

import * as React from 'react';
import ISearchContainerProps from './interfaces';
import SearchHistory, { ISearchHistoryItem } from '../../common/search-history';
import SearchSuggestions from '../search-suggestions'

import { log } from '../../common/diagnostics';
import { PortalContext } from '../../common/portal-context';
import { FocusZone, SearchBox, SearchBoxBase } from 'office-ui-fabric-react';
import styles from '../global.module.scss';
import SearchHistoryMonitor from './search-history-monitor';


/** Module Name for logging. */
const MODULE_NAME = "components/search-container/index.tsx";

export default function SearchContainer(props: ISearchContainerProps): React.ReactElement {

    log('Component loading.', MODULE_NAME);

    // Grab current context from React
    const { search, debug } = React.useContext(PortalContext);

    const [queryText, setQueryText] = React.useState(getQueryText(search.queryStringParameter));
    const [showSuggestions, setShowSuggestions] = React.useState(false);

    const searchHistory = new SearchHistory(search.maxSearchHistory);
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string): void => {
        setQueryText(newValue)
    }

    const handleOnSearch = (searchText: string): void => {
        const url = `${search.url}?${search.queryStringParameter}=${encodeURIComponent(searchText)}&${debug.toQueryStringParams()}`;
        window.location.href = (url);
    }

    return (
        <div className={styles.search}>
            <FocusZone>
                <SearchBox
                    placeholder='Search in SharePoint'
                    value={queryText}
                    onChange={handleOnChange} 

                    onClear={() => {
                        setTimeout(() => {
                            setQueryText(queryText)
                        }, 100);
                    }}
                    onFocus={() => {
                        setShowSuggestions(true);
                    }}
                    onBlur={() => {
                        setShowSuggestions(false);
                        
                    }}
                    onSearch={handleOnSearch}>

                </SearchBox>
                <SearchHistoryMonitor queryText={queryText} searchHistory={searchHistory} />
                <SearchSuggestions visible={showSuggestions} queryText={queryText} />
                
            </FocusZone>
        </div>
    )
}

function getQueryText(queryStringParameter: string): string {
    const url = new URL(window.location.href);
    const queryText = url.searchParams.get(queryStringParameter);

    return `${queryText ? queryText : ""}` as string;
}


const monitorSearcHistory = (searchHistory: SearchHistory, searchBox: SearchBoxBase) => {

   
}

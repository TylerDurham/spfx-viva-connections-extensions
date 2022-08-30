import * as React from 'react';
import ISearchContainerProps from './interfaces';
import SearchHistory from '../../common/search-history';
import SearchSuggestions from '../search-suggestions'

import { log } from '../../common/diagnostics';
import { PortalContext } from '../../common/portal-context';
import { FocusZone, SearchBox } from 'office-ui-fabric-react';
import styles from '../global.module.scss';

interface ISearchContainerState {
    queryText: string;
    showSuggestions: boolean;
}

/** Module Name for logging. */
const MODULE_NAME = "components/search-container/index.tsx";

export default function SearchContainer(props: ISearchContainerProps): React.ReactElement {

    log('Component loading.', MODULE_NAME);

    // Grab current context from React
    const { search, debug } = React.useContext(PortalContext);

    // Grab queryText from URL
    const [state, setState] = React.useState<ISearchContainerState>({
        queryText: getQueryText(search.queryStringParameter),
        showSuggestions: false
    });

    const searchHistory = new SearchHistory(search.maxSearchHistory);

    const handleOnClick = (event: MouseEvent): void => {

        const classNames = [
            "ms-search-bookmarkTitle",
            "ms-Link"
        ]

        const className = (event.target as HTMLElement).className;
        const tagName = (event.target as HTMLElement).tagName;
        log(`Element "${tagName}" with className of "${className} clicked.`, "search-box-container");

        const isSearchLink = classNames.filter((item) => {
            return className.indexOf(item) > -1;
        }).length > 0;

        if (isSearchLink) {

            searchHistory.add(state.queryText);
        }
    }

    log(`Adding click event handler.`);
    document.addEventListener("click", handleOnClick);
    log(`Added click event handler.`);

    const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {

        if (state.queryText.length < 3) { return; }
        //const foo = await getSearchSuggestions(app, state.queryText)

        //log(foo, "search-box-container");
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string): void => {
        setState({ queryText: newValue, showSuggestions: state.showSuggestions })
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
                    value={state.queryText}
                    onChange={handleOnChange} 

                    onClear={() => {
                        setTimeout(() => {
                            setState({ queryText: "", showSuggestions: state.showSuggestions })
                        }, 100);
                    }}
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        setState({ showSuggestions: true, queryText: state.queryText })
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            setState({ showSuggestions: false, queryText: state.queryText })
                        }, 100);
                        
                    }}
                    onSearch={handleOnSearch}>

                </SearchBox>
                <SearchSuggestions visible={state.showSuggestions} queryText={state.queryText} />
            </FocusZone>
        </div>
    )
}

function getQueryText(queryStringParameter: string): string {
    const url = new URL(window.location.href);
    const queryText = url.searchParams.get(queryStringParameter);

    return `${queryText ? queryText : ""}` as string;
}
import { ComboBox, SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';
import { log } from '../../../common/diagnostics';
import SearchHistory from '../../../common/search-history';
import { PortalContext } from '../../../common/portal-context';
import ISearchBoxContainerProps from './isearch-box-container-props';
import * as styles from './portal-container.module.scss';
import { getSearchSuggestions } from '../../../common/sharepoint-service';
import SearchSuggestions from './search-suggestions';

interface ISearchContainerState {
    queryText: string;
    showSuggestions: boolean;
}

export default function SearchBoxContainer(props: ISearchBoxContainerProps): React.ReactElement {

    // Grab current context from React
    const { app, search, debug } = React.useContext(PortalContext);

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
        log(`Link with className of "${className} clicked.`, "search-box-container");

        const isSearchLink = classNames.filter((item) => {
            return className.indexOf(item) > -1;
        }).length > 0;

        if (isSearchLink) {
            
            searchHistory.add(state.queryText);
        }
    }

    document.addEventListener("click", handleOnClick);

    const handleKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {

        if (state.queryText.length < 3) { return; }
            //const foo = await getSearchSuggestions(app, state.queryText)

            //log(foo, "search-box-container");
    }
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string): void => {
        setState({ queryText: newValue, showSuggestions: state.showSuggestions })
    }
    const handleOnSearch = (searchText: string): void => {
        const url = `${search.url}?${search.queryStringParameter}=${encodeURIComponent(searchText)}&${debug.toQueryStringParams() }`;
        window.location.href = (url);
    }

    return (
        <div className={styles.default.searchBoxContainer}>
            <SearchBox 
                placeholder='Search in SharePoint' 
                value={state.queryText} 
                onChange={handleOnChange}
                onKeyUp={handleKeyUp}
                onFocus={()=> {
                    setState({ showSuggestions: true, queryText: state.queryText })
                }} 
                onBlur={() => {
                    setState({ showSuggestions: false, queryText: state.queryText })
                }}
                onSearch={handleOnSearch}>

            </SearchBox>
           <SearchSuggestions visible={state.showSuggestions}  queryText={state.queryText} />
        </div>
    )
}

function getQueryText(queryStringParameter: string): string {
    const url = new URL(window.location.href);
    const queryText = url.searchParams.get(queryStringParameter);

    return `${queryText ? queryText : ""}` as string;
}
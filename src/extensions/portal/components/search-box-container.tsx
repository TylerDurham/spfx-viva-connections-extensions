import { SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';
import { log } from '../../../common/diagnostics';
import SearchHistory from '../../../common/search-history';
import { PortalContext } from '../../../common/portal-context';
import ISearchBoxContainerProps from './isearch-box-container-props';
import * as styles from './portal-container.module.scss';

interface ISearchContainerState {
    queryText: string;
}

export default function SearchBoxContainer(props: ISearchBoxContainerProps): React.ReactElement {

    // Grab current context from React
    const { search, debug } = React.useContext(PortalContext);

    // Grab queryText from URL
    const [state, setState] = React.useState<ISearchContainerState>({
        queryText: getQueryText(search.queryStringParameter),
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

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        log(searchHistory.find(state.queryText), "search-box-container")
    }
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string): void => {
        setState({ queryText: newValue })
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
                onSearch={handleOnSearch}></SearchBox>
        </div>
    )
}

function getQueryText(queryStringParameter: string): string {
    const url = new URL(window.location.href);
    const queryText = url.searchParams.get(queryStringParameter);

    return `${queryText ? queryText : ""}` as string;
}
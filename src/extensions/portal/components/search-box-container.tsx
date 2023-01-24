import { SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';
import { PortalContext } from '../../../common/portal-context';
import ISearchBoxContainerProps from './isearch-box-container-props';
import * as styles from './portal-container.module.scss';

interface ISearchContainerState {
    queryText: string;
}

const STORAGE_KEY = "SPFX-VIVA-SEARCH-LAST";

export default function SearchBoxContainer(props: ISearchBoxContainerProps): React.ReactElement {

    // Grab current context from React
    const { search, debug } = React.useContext(PortalContext);

    // Grab queryText from URL
    const [state, setState] = React.useState<ISearchContainerState>({
        queryText: getQueryText(search.queryStringParameter),
    });
    
    const handleOnClick = (searchText: string): void => {
        
        // HOTFIX: Store last search term
        window.localStorage.setItem(STORAGE_KEY, searchText);

        // Build search URL and redirect
        const url = `${search.url}?${search.queryStringParameter}=${encodeURIComponent(searchText)}&${debug.toQueryStringParams() }`;
        window.location.href = (url);
    }

    return (
        <div className={styles.default.searchBoxContainer}>
            <SearchBox 
                placeholder='Search in SharePoint' 
                value={state.queryText} 
                onChange={(event) => {
                    const newQueryText =
                        event && event.currentTarget ? event.currentTarget.value : "";
                    setState({
                        queryText: newQueryText,
                    });
                }}
                onSearch={() => handleOnClick(state.queryText)}></SearchBox> 
        </div>
    )
}

function getQueryText(queryStringParameter: string): string {
    const url = new URL(window.location.href);
    let queryText = url.searchParams.get(queryStringParameter);

    // HOTFIX: Read last search term
    if (queryText===null) {
        queryText = window.localStorage.getItem(STORAGE_KEY);
    }

    return `${queryText ? queryText : ""}` as string;
}
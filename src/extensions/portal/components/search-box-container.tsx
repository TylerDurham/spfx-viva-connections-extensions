import { SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';
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
    
    const handleOnClick = (searchText: string) => {
        let url = `${search.url}?${search.queryStringParameter}=${encodeURIComponent(searchText)}`;

        if (debug.isDebugging) {
            // Append SPFX debug state to URL.
            const { debugManifestsFile, customActions, loadSPFX } = debug;
            url = url + `&debugManifestsFile=${encodeURIComponent(debugManifestsFile)}&loadSPFX=${loadSPFX}&customActions=${customActions}`;
        }

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

function getQueryText(queryStringParameter: string) {
    const url = new URL(window.location.href);
    let queryText = url.searchParams.get(queryStringParameter);

    return `${queryText ? queryText : ""}` as string;
}
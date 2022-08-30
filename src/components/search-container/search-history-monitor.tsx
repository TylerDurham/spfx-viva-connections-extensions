import * as React from 'react';
import { log } from '../../common/diagnostics';
import SearchHistory from '../../common/search-history';

const MODULE_NAME = "components/search-container/search-history-monitor.tsx";

export interface ISearchHistoryMonitorProps {
    queryText: string;
    searchHistory: SearchHistory
}

export default function SearchHistoryMonitor(props: ISearchHistoryMonitorProps): React.ReactElement {

    const { queryText, searchHistory} = props;

    const handleOnClick = (event: MouseEvent): void => {

        const classNames = [
            "ms-search-bookmarkTitle",
            "ms-Link"
        ]

        const className = (event.target as HTMLElement).className;
        const tagName = (event.target as HTMLElement).tagName;
        log(`Element "${tagName}" with className of "${className} clicked.`, MODULE_NAME);

        const isSearchLink = classNames.filter((item) => {
            return className.indexOf(item) > -1;
        }).length > 0;

        if (isSearchLink) {
            log(`Adding "${queryText}" to search history.`, MODULE_NAME);
            searchHistory.add(queryText);
        }
    }

    document.addEventListener("click", handleOnClick);
    log(`Registered click event handler.`, MODULE_NAME);

    return (
        <></>
    )
}


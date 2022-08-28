import { Icon } from 'office-ui-fabric-react';
import * as React from 'react';
import { ISearchHistoryItem } from '../../common/search-history';
import styles from './search-suggestions.module.scss';

/**
 * Describes the properties of the HistoryList component.
 */
export interface IHistoryListProps {

    /** The list of items to render as a list. */
    items: ISearchHistoryItem[],

    /** The text label to display. */
    headerText: string
}

export default function HistoryList(props: IHistoryListProps): React.ReactElement<IHistoryListProps> {

    if (props.items.length === 0) return <></>;

    return (
        <div>
            { props.headerText }
            <ul className={styles.searchSuggestionList}>
                { props.items.map((item, index) => {
                    return (
                        <li key={index}>
                            <span className={styles.icon}><Icon iconName='History' /></span>
                            <span className={styles.text}>{item.searchTerm}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
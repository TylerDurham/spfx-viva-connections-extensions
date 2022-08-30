import * as React from 'react';
import styles from './search-suggestions.module.scss';
import { Icon } from 'office-ui-fabric-react';
import { ISearchHistoryItem } from '../../common/search-history';
import { log } from '../../common/diagnostics';

/** Module Name for logging. */
const MODULE_NAME = "components/search-suggestions/index.tsx";

/**
 * Describes the properties of the HistoryList component.
 */
export interface IHistoryListProps {

    /** The list of items to render as a list. */
    items: ISearchHistoryItem[],

    /** The text header to display. */
    headerText: string
}

export default function HistoryList(props: IHistoryListProps): React.ReactElement<IHistoryListProps> {

    log('Component loading.', MODULE_NAME);
    
    if (props.items.length === 0) return <></>;

    return (
        <div>
            <b className={styles.searchSuggestionListHeader}>{props.headerText}</b>
            <ul className={styles.searchSuggestionList}>
                { props.items.map((item, index) => {
                    return (
                        <li key={index} onClick={()=> {
                            //alert()
                        }}>
                            <span className={styles.icon}><Icon iconName='History' /></span>
                            <span className={styles.text}>{item.searchTerm}</span>
                            <span className={styles.button}>
                                <button onClick={() => { 
                                    //alert('TODO')
                                }}>Delete</button>
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
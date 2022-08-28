import { Icon } from 'office-ui-fabric-react';
import * as React from 'react';
import { ISearchHistoryItem } from '../../common/search-history';
import styles from './search-suggestions.module.scss';

export interface IHistoryProps {
    items: ISearchHistoryItem[],
    text: string
}

export default function History(props: IHistoryProps): React.ReactElement<IHistoryProps> {

    if (props.items.length === 0) return <></>;

    return (
        <div>
            { props.text }
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
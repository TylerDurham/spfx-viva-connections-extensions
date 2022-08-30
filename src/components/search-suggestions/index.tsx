import * as React from 'react';
import styles from './search-suggestions.module.scss';
import { getSearchSuggestions, ISpoSearchQuery, ISpoSearchSuggestions } from '../../common/sharepoint-service';
import { Icon } from 'office-ui-fabric-react';
import { ISearchSuggestionsProps } from './interfaces';
import { log } from '../../common/diagnostics';
import { PortalContext } from '../../common/portal-context';
import HistoryList from './history-list';

/** Module Name for logging. */
const MODULE_NAME = "components/search-suggestions/index.tsx";

const renderQueries = (queries: ISpoSearchQuery[]): React.ReactElement => {

    log('Component loading.', MODULE_NAME);
    
    if (queries.length === 0) return <></>;
    return (
        <div>
            Queries
            <ul className={styles.searchSuggestionList}>
                {queries.map((item, index) => {
                    return (
                        <li key={index}>
                            <span className={styles.icon}><Icon iconName='FileASPX' /></span>
                            <span className={styles.text}>{item.Query}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const renderPeople = (people: string[]): React.ReactElement => {
    if (people.length === 0) return <></>;
    return (
        <div>
            People
            <ul className={styles.searchSuggestionList}>
                {people.map((item, index) => {
                    return (
                        <li key={index}>
                            <span className={styles.icon}><Icon iconName='Contact' /></span>
                            <span className={styles.text}>{item}</span>
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}

export default function SearchSuggestions(props: ISearchSuggestionsProps): React.ReactElement<ISearchSuggestionsProps> {

    const { app } = React.useContext(PortalContext);

    //const [queryText, setQueryText] = React.useState<string>(props.queryText);

    const [searchSuggestions, setSearchSuggestions] = React.useState<ISpoSearchSuggestions>({
        History: [],
        PeopleNames: [],
        Queries: []
    })

    const getSuggestions = (queryText: string): React.ReactElement => {

        React.useEffect(() => {

            (() => {
                getSearchSuggestions(app, queryText)
                    .then((suggestions) => {
                        setSearchSuggestions(suggestions);
                    })
                    .catch((err) => {
                        log(err, MODULE_NAME);
                    })
            })()            
            
        }, [queryText]);

        return (

            <div>
                <HistoryList headerText='History' items={searchSuggestions.History}></HistoryList>

                {renderPeople(searchSuggestions.PeopleNames)}

                {renderQueries(searchSuggestions.Queries)}
            </div>

        )
    }
    log('Component loading.', MODULE_NAME);
    return (
        <div className={styles.searchSuggestions} style={{
            textAlign: 'left',
            position: 'absolute',
            zIndex: 1,
            display: (props.visible) ? 'block' : 'none',
            overflow: 'auto',
            color: 'black',
            backgroundColor: 'white'
        }}>{getSuggestions(props.queryText)}</div>
    )

}

/*
<ul>
                { state.suggestions.History.map((item, index) => {
                    <li key={index}>item.searchTerm</li>
                }) }
            </ul>
*/


/*

{ss.History.map((item, index) => {
                        log(item.searchTerm, "hhhh");
                        <li key={index}>{item.searchTerm}</li>
                    })}

*/


/*

(async () => {
                const suggestions = await getSearchSuggestions(app, queryText);
                log(suggestions, 'search-suggestions.tsx');
                setSearchSuggestions(suggestions);
            })();

*/
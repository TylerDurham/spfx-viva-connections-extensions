import { ISearchContainerProps, ISearchContainerState } from './search-container.int';
import { SearchBox, TooltipHost } from 'office-ui-fabric-react';
import * as React from 'react';
import styles from './search-container.module.scss';

export class SearchContainer extends React.Component<ISearchContainerProps, ISearchContainerState> {

    constructor(props: ISearchContainerProps) {
        super(props);

        this.state = {
            queryText: ``
        };
    }

    public render() {
        return (
            <div className={styles.searchContainer}>
                <SearchBox 
                    value={this.state.queryText} 
                    onChange={(event) => this.setState({ queryText: event && event.currentTarget ? event.currentTarget.value : "" })} 
                    onSearch={() => this.handleOnSearch(this.state.queryText)}/>
            </div>
        );
    }

    private handleOnSearch(queryText: string) {
        const url = `${this.props.searchPageUrl}?${this.props.queryStringParameter}=${encodeURIComponent(queryText)}`;
        window.location.href = url;
    }
}

import * as React from 'react';
import styles from './portal-container.module.scss';
import { HomeButton } from './home-button';
import { IPortalProps, IPortalState } from './portal-container.int';
import { Log, printObject } from '../../common/shared-lib';
import { SearchContainer } from './search-container';

const LOG_SOURCE = "Portal";

export class Portal extends React.Component<IPortalProps, IPortalState> {

    constructor(props: IPortalProps) {
        super(props);

        Log.info(LOG_SOURCE, `Initialized with ${printObject(props)}`);
    }

    public render() {
        return (
            <div className={styles.portalContainer}>

                <HomeButton 
                    homePageUrl={this.props.homePageUrl}
                    portalContext={this.props.portalContext} />

                <SearchContainer 
                    queryStringParameter={this.props.queryStringParameter} 
                    searchPageUrl={this.props.searchPageUrl}
                    placeholderText={this.props.placeholderText}
                    portalContext={this.props.portalContext} />

            </div>
        );
    }

}


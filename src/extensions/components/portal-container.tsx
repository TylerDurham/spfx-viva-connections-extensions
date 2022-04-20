import * as React from 'react';
import styles from './portal-container.module.scss';
import { IPortalProps, IPortalState } from './portal-container.int';
import { SearchContainer } from './search-container';
import { Log, printObject } from '../../common/shared-lib';
import { HomeButton } from './home-button';

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
                    homePageUrl={this.props.homePageUrl} />

                <SearchContainer 
                    queryStringParameter={this.props.queryStringParameter} 
                    searchPageUrl={this.props.searchPageUrl} />

            </div>
        );
    }

}


import * as React from 'react';
import IPortalContainerProps from './iportal-container-props';

import * as styles from './portal-container.module.scss';
import { PortalContext } from '../../../common/portal-context';
import HomeButton from '../../../components/home-button';
import SearchContainer from '../../../components/search-container';

export default function TopContainer(props: IPortalContainerProps): React.ReactElement {
    return (
        <PortalContext.Provider value={props.context}>
            <div className={ styles.default.portalContainer }>

                <HomeButton></HomeButton>

                <SearchContainer></SearchContainer>
            </div> 
        </PortalContext.Provider>
    )
}
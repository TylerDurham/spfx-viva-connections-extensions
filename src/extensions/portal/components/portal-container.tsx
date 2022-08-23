import * as React from 'react';
import HomeButtonContainer from './home-button-container';
import IPortalContainerProps from './iportal-container-props';
import SearchBoxContainer from './search-box-container';
import * as styles from './portal-container.module.scss';
import { PortalContext } from '../../../common/portal-context';

export default function PortalContainer(props: IPortalContainerProps): React.ReactElement {
    return (
        <PortalContext.Provider value={props.context}>
            <div className={ styles.default.portalContainer }>

                <HomeButtonContainer></HomeButtonContainer>

                <SearchBoxContainer></SearchBoxContainer>
            </div>
        </PortalContext.Provider>
    )
}
import * as React from 'react';
import HomeButtonContainer from './home-button-container';
import IPortalContainerProps from './iportal-container-props';
import SearchBoxContainer from './search-box-container';
import * as styles from './portal-container.module.scss';

export default function PortalContainer(props: IPortalContainerProps) {
    return (
        <div className={ styles.default.portalContainer }>

            <HomeButtonContainer></HomeButtonContainer>

            <SearchBoxContainer></SearchBoxContainer>
        </div>
    )
}
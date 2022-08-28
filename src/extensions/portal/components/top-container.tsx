import * as React from 'react';
import IPortalContainerProps from './iportal-container-props';
import SearchBoxContainer from './search-box-container';
import * as styles from './portal-container.module.scss';
import { PortalContext } from '../../../common/portal-context';
import HomeButton from '../../../components/home-button';

export default function TopContainer(props: IPortalContainerProps): React.ReactElement {
    return (
        <PortalContext.Provider value={props.context}>
            <div className={ styles.default.portalContainer }>

                <HomeButton></HomeButton>

                <SearchBoxContainer></SearchBoxContainer>
            </div>
        </PortalContext.Provider>
    )
}
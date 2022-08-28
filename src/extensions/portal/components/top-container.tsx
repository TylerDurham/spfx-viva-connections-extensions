import * as React from 'react';
import HomeButton from '../../../components/home-button';
import IPortalContainerProps from './iportal-container-props';
import SearchContainer from '../../../components/search-container';
import styles from '../../../components/global.module.scss';
import { PortalContext } from '../../../common/portal-context';

export default function TopContainer(props: IPortalContainerProps): React.ReactElement {
    return (
        <PortalContext.Provider value={props.context}>
            <div className={ styles.top }>

                <HomeButton></HomeButton>

                <SearchContainer></SearchContainer>
            </div> 
        </PortalContext.Provider>
    )
}
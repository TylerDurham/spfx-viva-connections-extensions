import * as React from 'react';
import IPortalContainerProps from './iportal-container-props';


import { PortalContext } from '../../../common/portal-context';
import HomeButton from '../../../components/home-button';
import SearchContainer from '../../../components/search-container';
import styles from '../../../components/global.module.scss';

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
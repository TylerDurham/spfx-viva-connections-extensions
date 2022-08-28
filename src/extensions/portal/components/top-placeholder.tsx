import * as React from 'react';
import HomeButton from '../../../components/home-button';
import SearchContainer from '../../../components/search-container';
import styles from '../../../components/global.module.scss';
import { IPortalContext, PortalContext } from '../../../common/portal-context';

const MODULE_NAME = "top-placeholder.tsx";

export interface IPortalContainerProps {
    context: IPortalContext;
}

export default function TopPlaceholder(props: IPortalContainerProps): React.ReactElement {
    return (
        <PortalContext.Provider value={props.context}>
            <div className={ styles.top }>

                <HomeButton></HomeButton>

                <SearchContainer></SearchContainer>
                
            </div> 
        </PortalContext.Provider>
    )
}
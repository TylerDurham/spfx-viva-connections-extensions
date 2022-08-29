import * as React from 'react';
import HomeButton from '../../../components/home-button';
import SearchContainer from '../../../components/search-container';
import styles from '../../../components/global.module.scss';
import { IPortalContext, PortalContext } from '../../../common/portal-context';
import { log } from '../../../common/diagnostics';

/** Module Name for logging. */
const MODULE_NAME = "extensions/portal/components/top-placeholder.tsx";

export interface IPortalContainerProps {
    context: IPortalContext;
}

export default function TopPlaceholder(props: IPortalContainerProps): React.ReactElement {
    
    log('Component loading.', MODULE_NAME);

    return (
        <PortalContext.Provider value={props.context}>
            <div className={ styles.top }>

                <HomeButton></HomeButton>

                <SearchContainer></SearchContainer>

            </div> 
        </PortalContext.Provider>
    )
}
import * as React from 'react';
import * as styles from './portal-container.module.scss';
import IHomeButtonProps from './ihome-button-container-props';
import { IconButton, IIconProps } from '@fluentui/react';
import { PortalContext } from '../../../common/portal-context';

export default function HomeButtonContainer(props: IHomeButtonProps) {
    
    const { homeSite } = React.useContext(PortalContext);
    
    const icon: IIconProps = {
        iconName: "Home",
        title: `Return to ${homeSite.title}`
    };

    return (
        <div className={styles.default.homeButtonContainer}>
            <IconButton 
                iconProps={icon} 
                onClick={() => handleOnClick(homeSite.url)}>
                
            </IconButton>
        </div>
    )
}

const handleOnClick = (url: string): void => {
    //Log.info(`HomeButton.handleOnClick`, `Navigating to "${url}"`);
    location.href = url;
};
import * as React from 'react';
import * as styles from './portal-container.module.scss';
import IHomeButtonProps from './ihome-button-container-props';
import { IconButton, IIconProps } from '@fluentui/react';
import { PortalContext } from '../../../common/portal-context';

/**
 * A React component that renders the "Home" button.
 * @param props Configuration properties for the component.
 * @returns The React component.
 */
export default function HomeButtonContainer(props: IHomeButtonProps) {
    
    const { homeSite } = React.useContext(PortalContext);
    
    const iconProps: IIconProps = {
        iconName: "Home",
        title: `Return to ${homeSite.title}`
    };

    return (
        <div className={styles.default.homeButtonContainer}>
            <IconButton 
                iconProps={iconProps} 
                onClick={() => handleOnClick(homeSite.url)}>
                
            </IconButton>
        </div>
    )
}

/**
 * Handles the click() event of the IconButton. Redirects the browser to
 * the URL specified in the arguments.
 * @param url The URL to launch.
 */
const handleOnClick = (url: string): void => {
    location.href = url;
};
import * as React from 'react';
import IHomeButtonProps from './interfaces';
import styles from '../global.module.scss';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
import { log } from '../../common/diagnostics';
import { PortalContext } from '../../common/portal-context';

/** Module Name for logging. */
const MODULE_NAME = "components/home-button/index.tsx";

/**
 * A React component that renders the "Home" button.
 * @param props Configuration properties for the component.
 * @returns The React component.
 */
export default function HomeButton(props: IHomeButtonProps): React.ReactElement {

    log('Component loading.', MODULE_NAME);

    // Grab current context from React
    const { homeSite, debug } = React.useContext(PortalContext);

    // Configure Icon Button
    const iconProps: IIconProps = {
        iconName: "Home",
        title: `Return to ${homeSite.title}`
    };

    // Handle Icon Button onClick
    const handleOnClick = (): void => {
        const url = `${homeSite.url}?${debug.toQueryStringParams()}`;

        location.href = url;
    }

    return (
        <div className={styles.homeButton}>
            <IconButton
                iconProps={iconProps}
                onClick={() => handleOnClick()}>
            </IconButton>
        </div>
    )
}


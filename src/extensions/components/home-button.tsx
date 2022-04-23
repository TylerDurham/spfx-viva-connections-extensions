import * as React from 'react';
import styles from './home-button.module.scss';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
import { IHomeButtonProps } from './home-button.interfaces';
import { IPortalContext } from '../../common/portal-context.interfaces';
import { Log } from '../../common/shared-lib';
import { PortalContext } from '../../common/portal-context';

const icon: IIconProps = {iconName: "Home"};

export const HomeButton = (props: IHomeButtonProps) => {

const context = React.useContext(PortalContext);

	return (
		<IconButton
			className={styles.homeButton}
			iconProps={icon}
			onClick={() => {
				handleOnClick(context);
			}}
		/>
	);
};

const handleOnClick = (context: IPortalContext): void => {
	const url = `${context.properties.homePageUrl}?${context.debug.debugParameters}`;
	Log.info(`HomeButton.handleOnClick`, `Navigating to "${url}"`);
	location.href = url;
};

import * as React from 'react';
import styles from './home-button.module.scss';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
import { IHomeButtonProps } from './home-button.interfaces';
import { Log } from '../../common/shared-lib';
import { PortalContext } from '../../common/portal-context';

const icon: IIconProps = {iconName: "Home"};

export const HomeButton = (props: IHomeButtonProps) => {
	
	const { properties, debug } = React.useContext(PortalContext);
	const { debugParameters } = debug;
	let title: string, url: string;
	if (properties.homeSite) {
		title = `Back to home site ${properties.homeSite.title}`;
		url = `${properties.homeSite.url}?${debugParameters}`;
	} else {
		const { homePageUrl } = properties;
		title = `Back to ${homePageUrl}`;
		url = `${homePageUrl}?${debugParameters}`;
	}

	return (
		<IconButton
			className={styles.homeButton}
			title={title}
			iconProps={icon}
			onClick={() => {
				handleOnClick(url);
			}}
		/>
	);
};

const handleOnClick = (url: string): void => {
	Log.info(`HomeButton.handleOnClick`, `Navigating to "${url}"`);
	location.href = url;
};

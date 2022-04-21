import * as React from "react";
import styles from "./home-button.module.scss";
import {IconButton, IIconProps} from "office-ui-fabric-react";
import {IHomeButtonProps} from "./home-button.int";
import {Log} from "../../common/shared-lib";

const icon: IIconProps = {iconName: "Home"};

export const HomeButton = (props: IHomeButtonProps) => {
	return (
		<IconButton
			className={styles.homeButton}
			iconProps={icon}
			onClick={() => {
				handleOnClick(props);
			}}
		/>
	);
};

const handleOnClick = (props: IHomeButtonProps): void => {
	const url = `${props.homePageUrl}?${props.portalContext.debugParameters}`;
	Log.info(`HomeButton.handleOnClick`, `Navigating to "${url}"`);
	window.location.href = url;
};

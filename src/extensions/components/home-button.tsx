import { IconButton, IIconProps } from "office-ui-fabric-react";
import * as React from "react";
import { Log } from "../../common/shared-lib";
import { IHomeButtonProps } from "./home-button.int";
import styles from './home-button.module.scss';

const icon: IIconProps = { iconName: 'Home' };

export const HomeButton = (props: IHomeButtonProps) => {
    return (
        <IconButton className={styles.homeButton} iconProps={icon} onClick={ () => { handleOnClick(props); } }/>
    );
};

const handleOnClick = (props: IHomeButtonProps): void => {
    Log.info(`HomeButton.handleOnClick`, `Navigating to ${props.homePageUrl}`);
    window.location.href = props.homePageUrl;
};
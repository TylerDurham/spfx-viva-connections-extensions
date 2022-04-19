import { IconButton, IIconProps } from "office-ui-fabric-react";
import * as React from "react";
import { IHomeButtonProps } from "./home-button.int";
import styles from './home-button.module.scss';

const icon: IIconProps = { iconName: 'Home' };

export const HomeButton = function(props: IHomeButtonProps) {
    return (
        <IconButton className={styles.homeButton} iconProps={icon} onClick={ () => { window.location.href = (this.state.homePageUrl) } }/>
    )
}
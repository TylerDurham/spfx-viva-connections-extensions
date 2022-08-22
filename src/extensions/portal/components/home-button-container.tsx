import { IconButton, IIconProps } from '@fluentui/react';
import * as React from 'react';
import IHomeButtonProps from './ihome-button-container-props';
import * as styles from './portal-container.module.scss';

const ICON_PROPS: IIconProps = {
    iconName: "Home",
    title: "Return to Homepage"
};

export default function HomeButtonContainer(props: IHomeButtonProps) {
    return (
        <div className={styles.default.homeButtonContainer}>
            <IconButton iconProps={ICON_PROPS}></IconButton>
        </div>
    )
}
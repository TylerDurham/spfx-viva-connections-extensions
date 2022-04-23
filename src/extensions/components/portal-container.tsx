import * as React from "react";
import styles from "./portal-container.module.scss";
import { HomeButton } from "./home-button";
import { IPortalProps } from "./portal-container.int";
import { Log, printObject } from "../../common/shared-lib";
import SearchContainer from "./search-container";
import { PortalContext } from "../../common/portal-context";

const LOG_SOURCE = "Portal";

const Portal = (props: IPortalProps) => {

    Log.info(LOG_SOURCE, `Initialized with ${printObject(props)}`);

	return (
		<PortalContext.Provider value={props.portalContext}>
			<div className={styles.portalContainer}>
				<HomeButton />

				<SearchContainer />
			</div>
		</PortalContext.Provider>
	);
};

export default Portal;
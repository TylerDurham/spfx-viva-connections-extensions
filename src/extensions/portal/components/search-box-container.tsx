import { SearchBox } from 'office-ui-fabric-react';
import * as React from 'react';
import ISearchBoxContainerProps from './isearch-box-container-props';
import * as styles from './portal-container.module.scss';

export default function SearchBoxContainer(props: ISearchBoxContainerProps): React.ReactElement {
    return (
        <div className={styles.default.searchBoxContainer}>
            <SearchBox placeholder='Search in SharePoint'></SearchBox>
        </div>
    )
}
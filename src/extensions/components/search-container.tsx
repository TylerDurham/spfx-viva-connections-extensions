import * as QueryString from 'query-string';
import * as React from 'react';
import styles from './search-container.module.scss';
import { ISearchContainerProps, ISearchContainerState } from './search-container.interfaces';
import { Log } from '../../common/shared-lib';
import { PortalContext } from '../../common/portal-context';
import { SearchBox } from 'office-ui-fabric-react';

export default function SearchContainer(props: ISearchContainerProps) {
	const context = React.useContext(PortalContext);
	const initQueryText = getQueryText(context.properties.queryStringParameter);
	const [state, setState] = React.useState<ISearchContainerState>({
		queryText: initQueryText,
	});

	return (
		<div className={styles.searchContainer}>
			<SearchBox
				value={state.queryText}
				placeholder={context.properties.placeholderText}
				onChange={(event) => {
					const newQueryText =
						event && event.currentTarget ? event.currentTarget.value : "";
					setState({
						queryText: newQueryText,
					});
				}}
				onSearch={() => {
					handleOnSearch(context, state.queryText);
				}}
			/>
		</div>
	);

	function handleOnSearch(ctx, queryText: string) {
		if (queryText !== undefined || queryText !== null) {
			queryText = queryText.trim();
			if (queryText.length > 0) {
				const { searchPageUrl, queryStringParameter } = ctx.properties;
				const { isDebugging, debugParameters } = ctx.debug;
				let newUrl = `${searchPageUrl}?${queryStringParameter}=${encodeURIComponent(
					queryText
				)}`;
				newUrl += isDebugging ? `&${debugParameters}` : ``;
				Log.info(`SearchContainer.handleOnSearch`, `Navigating to "${newUrl}"`);
				window.location.href = newUrl;
			}
		}
	}
}

function getQueryText(queryStringParameter: string) {
	let queryString = QueryString.parseUrl(location.href, {}).query;
	let queryText = queryString[queryStringParameter];

	return `${queryText ? queryText : ""}` as string;
}

import * as React from 'react';
import styles from './SearchConfiguration.module.scss';
import { ISearchConfigurationProps } from './ISearchConfigurationProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SearchConfiguration extends React.Component<ISearchConfigurationProps, {}> {
  public render(): React.ReactElement<ISearchConfigurationProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div>{environmentMessage}</div>
    );
  }
}

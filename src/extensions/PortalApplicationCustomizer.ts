import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import styles from './PortalApplicationCustomizer.module.scss';
import * as strings from 'PortalApplicationCustomizerStrings';
import { CONSTANTS, Log, printObject } from '../common/shared-lib';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Portal } from './components/portal-container';

const LOG_SOURCE = "PortalApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPortalApplicationCustomizerProperties {
  // This is an example; replace with your own property
  searchPageUrl: string;
  queryStringParameter: string;
}


/** A Custom Action which can be run during execution of a Client Side Application */
export default class PortalApplicationCustomizer
  extends BaseApplicationCustomizer<IPortalApplicationCustomizerProperties> {

  private topPlaceholder: PlaceholderContent | undefined;
  
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized.`);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);

    return Promise.resolve();
  }

  private renderPlaceHolders() {
    // Handling the top placeholder
    if (!this.topPlaceholder) {
      this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: () => { } }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this.topPlaceholder) {
        Log.warn(LOG_SOURCE, "The expected placeholder (Top) was not found!");
        return;
      }

      if (this.topPlaceholder.domElement) {

        Log.info(LOG_SOURCE, `Attempting to render app portal in TOP placeholder with the properties ${printObject(this.properties)}`);
        
        const portal = React.createElement(Portal, {
          homePageUrl: this.context.pageContext.site.absoluteUrl,
          searchPageUrl: `${this.context.pageContext.web.absoluteUrl}${this.properties.searchPageUrl}`,
          queryStringParameter: this.properties.queryStringParameter
        });
        ReactDOM.render(portal, this.topPlaceholder.domElement);

        Log.info(LOG_SOURCE, `Successfully rendered app portal in TOP placeholder!`);
      }
    }
  }
}

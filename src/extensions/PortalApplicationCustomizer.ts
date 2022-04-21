import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'PortalApplicationCustomizerStrings';
import styles from './PortalApplicationCustomizer.module.scss';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { CONSTANTS, Log, printObject } from '../common/shared-lib';
import { Portal } from './components/portal-container';
import getPortalContext from '../common/portal-context';

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
  placeholderText: string;
}

const portalContext = getPortalContext(location.href);

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PortalApplicationCustomizer
  extends BaseApplicationCustomizer<IPortalApplicationCustomizerProperties> {

  private topPlaceholder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    
    Log.info(LOG_SOURCE, `Initialized with portal context: ${printObject(portalContext)}`);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);

    return Promise.resolve();
  }

  private isInIFrame() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
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

        const isInIFrame = this.isInIFrame();
        const isDebugging = location.href.indexOf('debugManifestsFile=') > -1;
        Log.info(LOG_SOURCE, `IsInIFrame: ${isInIFrame}, IsDebugging: ${isDebugging}`);
        if (isInIFrame == true || isDebugging == true) {

          Log.info(LOG_SOURCE, `Attempting to render app portal in TOP placeholder with the properties ${printObject(this.properties)}`);

          const portal = React.createElement(Portal, {
            homePageUrl: this.context.pageContext.site.absoluteUrl,
            searchPageUrl: `${this.context.pageContext.web.absoluteUrl}${this.properties.searchPageUrl}`,
            queryStringParameter: this.properties.queryStringParameter,
            placeholderText: this.properties.placeholderText,
            portalContext: portalContext
          });
          ReactDOM.render(portal, this.topPlaceholder.domElement);

          Log.info(LOG_SOURCE, `Successfully rendered app portal in TOP placeholder!`);
        } else {
          Log.info(LOG_SOURCE, `Not hosted in IFRAME, so not rendered.`);
        }
      }
    }
  }
}

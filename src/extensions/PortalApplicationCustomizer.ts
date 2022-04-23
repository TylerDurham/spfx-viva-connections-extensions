import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'PortalApplicationCustomizerStrings';
import styles from './PortalApplicationCustomizer.module.scss';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { CONSTANTS, Log, printObject } from '../common/shared-lib';
import Portal from './components/portal-container';
import { initializeContext } from '../common/portal-context';
import * as Url from 'url-parse';
import { IPortalApplicationCustomizerProps } from './IPortalApplicationCustomizerProps';

const LOG_SOURCE = "PortalApplicationCustomizer";

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PortalApplicationCustomizer
  extends BaseApplicationCustomizer<IPortalApplicationCustomizerProps> {

  private topPlaceholder: PlaceholderContent | undefined;
  private portalContext;

  public onInit(): Promise<void> {

    this.portalContext = initializeContext(this.context, this.properties);

    Log.info(LOG_SOURCE, `Initialized with portal context:`);
    Log.info(LOG_SOURCE, this.portalContext);

    // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);

    return Promise.resolve();
  }

  
  private checkSearchPageUrl(url: string) {
    if(url === undefined || url === null || url.trim().length == 0) {
      // Defaut value
      url = "/_layouts/15/search.aspx/";
    }

    // Realative URL
    if (url.indexOf("/") == 0) return this.context.pageContext.web.absoluteUrl + url;
  }

  private checkQueryStringParameter(queryStringParameter: string) {
    if (this.isNullOrEmpty(queryStringParameter)) {
      // Default value.
      queryStringParameter = "q";
    }
    return queryStringParameter;
  }

  private isNullOrEmpty<T>(v: T) {
    if (v === undefined || v === null ) return true;
    if(typeof v === 'string') {
      return (v.trim().length === 0);
    }

    return false;
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
            portalContext: this.portalContext
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


/*

private initPortalContext() {
    
    const props = this.properties;

    // TODO: Get Home Site URL?
    const webUrl = this.context.pageContext.web.absoluteUrl;
    const searchPageUrl = this.checkSearchPageUrl(this.properties.searchPageUrl);
    const queryStringParameter = this.checkQueryStringParameter(this.properties.queryStringParameter);
  
    return {
      isDebugging: isDebugging,
      debugParameters: debugParameters,
      properties: {
        homePageUrl: webUrl,
        searchPageUrl: searchPageUrl,
        queryStringParameter: queryStringParameter,
        placeholderText: props.placeholderText
      },
      req: {
        url: location.href,
        query: query
      }
    };
  }


*/
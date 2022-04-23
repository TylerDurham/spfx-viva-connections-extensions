import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Portal from './components/portal-container';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { IApplicationCustomizerProps } from './application-customizer.interfaces';
import { initializeContext } from '../common/portal-context';
import { Log, printObject } from '../common/shared-lib';  
import VersionInfo from '../common/version-info';

const LOG_SOURCE = "ApplicationCustomizer";

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PortalApplicationCustomizer
  extends BaseApplicationCustomizer<IApplicationCustomizerProps> {

  private topPlaceholder: PlaceholderContent | undefined;
  private portalContext;

  public async onInit() {

    try {
      this.portalContext = await initializeContext(this.context, this.properties);

      Log.info(LOG_SOURCE, `Package (v. "${VersionInfo.package}") in solution (v. "${VersionInfo.solution}" Initialized with portal context:`);
    } catch (err){
      Log.warn(LOG_SOURCE, `Could not initialize context: ${err}`);
      return;
    }
    // Log.info(LOG_SOURCE, this.portalContext);

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
        const isDebugging = this.portalContext.debug.isDebugging;
        Log.info(LOG_SOURCE, `IsInIFrame: ${isInIFrame}, IsDebugging: ${isDebugging}`);
        if (isInIFrame == true || isDebugging == true) {

          Log.info(LOG_SOURCE, `Attempting to render app portal in TOP placeholder with the properties ${printObject(this.properties)}`);

          const portal = React.createElement(Portal, {
            portalContext: this.portalContext
          });
          ReactDOM.render(portal, this.topPlaceholder.domElement);

          Log.info(LOG_SOURCE, `Successfully rendered app portal in TOP placeholder!`);
        } else {
          Log.info(LOG_SOURCE, `Not hosted in IFRAME & not debugging, so not rendered.`);
        }
      }
    }
  }
}
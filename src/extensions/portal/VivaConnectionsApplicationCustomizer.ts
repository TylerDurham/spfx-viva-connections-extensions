import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { getPortalContext } from '../../common/portal-context';
import { initializeIcons } from 'office-ui-fabric-react'
import * as diag from '../../common/diagnostics';
import TopPlaceholder from './components/top-placeholder';

// Also available from @uifabric/icons (7 and earlier) and @fluentui/font-icons-mdl2 (8+)
initializeIcons(/* optional base url */);

const MODULE_NAME = "extensions/portal/VivaConnectionsApplicationCustomizer.ts";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IVivaConnectionsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class VivaConnectionsApplicationCustomizer
  extends BaseApplicationCustomizer<IVivaConnectionsApplicationCustomizerProperties> {

  private topPlaceholder: PlaceholderContent | undefined;

  private isInIFrame(): boolean{
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  public onDispose(): void {
    diag.log("Disposing!", MODULE_NAME)
  }

  public async onInit(): Promise<void> {

    diag.log(`Initializing.`, MODULE_NAME);
    
    const portalContext = await getPortalContext(this.context);
    //diag.log(portalContext, MODULE_NAME);

    if (this.isInIFrame() === true || portalContext.debug.isDebugging === true || portalContext.debug.showInSpo === true) {

      if (!this.topPlaceholder) {
        this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: () => { diag.log(`Disposing.`, MODULE_NAME) } }
        );

        const component = React.createElement(TopPlaceholder, {
          context: portalContext
        });

        try {
          ReactDOM.render(component, this.topPlaceholder.domElement);
        } catch (e) {
          diag.error(`Could not render React element! ${e}`, MODULE_NAME);
        }

      }
    }

    return Promise.resolve();
  }
}

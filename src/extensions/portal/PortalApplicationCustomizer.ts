import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'PortalApplicationCustomizerStrings';
import TopContainer from './components/top-container';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { getPortalContext } from '../../common/portal-context';
import { initializeIcons } from 'office-ui-fabric-react'
import * as diag from '../../common/diagnostics';

// Also available from @uifabric/icons (7 and earlier) and @fluentui/font-icons-mdl2 (8+)
initializeIcons(/* optional base url */);

const MODULE_NAME = "PortalApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPortalApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class PortalApplicationCustomizer
  extends BaseApplicationCustomizer<IPortalApplicationCustomizerProperties> {

  private topPlaceholder: PlaceholderContent | undefined;
  
  public async onInit(): Promise<void> {
    
    diag.log(`Initializing...`, MODULE_NAME);
    const portalContext = await getPortalContext(this.context);
    diag.log(portalContext, MODULE_NAME);      

    if (!this.topPlaceholder) {
      this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: () => { diag.log(`Disposing.`, MODULE_NAME) } }
      ); 

      const element = React.createElement(TopContainer, {
        context: portalContext
      });  

      try {
        ReactDOM.render(element, this.topPlaceholder.domElement);
      } catch (e) {
        diag.error(`Could not render React element! ${e}`, MODULE_NAME);
      }

    }

    return Promise.resolve();
  }
}

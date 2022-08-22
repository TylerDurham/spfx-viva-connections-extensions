import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'PortalApplicationCustomizerStrings';
import PortalContainer from './components/portal-container';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Log } from '@microsoft/sp-core-library';

const LOG_SOURCE: string = 'PortalApplicationCustomizer';

// Also available from @uifabric/icons (7 and earlier) and @fluentui/font-icons-mdl2 (8+)

initializeIcons(/* optional base url */);

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
  
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    if (!this.topPlaceholder) {
      this.topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: () => { } }
      );

      const sb = React.createElement(PortalContainer);

      ReactDOM.render(sb, this.topPlaceholder.domElement);

    }

    return Promise.resolve();
  }
}
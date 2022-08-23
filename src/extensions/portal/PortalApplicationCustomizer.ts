import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'PortalApplicationCustomizerStrings';
import VersionInfo from '../../common/version-info';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Foo } from './components/tmp';





const LOG_SOURCE: string = 'PortalApplicationCustomizer';

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
    }

    let v = VersionInfo.solution;
    let message = `Version: ` + v;

    Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`).catch(() => {
      /* handle error */
    });

    const el = React.createElement(Foo);

    ReactDOM.render(el, this.topPlaceholder.domElement)

    return Promise.resolve();
  }
}

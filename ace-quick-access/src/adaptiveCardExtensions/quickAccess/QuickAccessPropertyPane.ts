import { IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'QuickAccessAdaptiveCardExtensionStrings';
import { IList } from './sp.service';
export class QuickAccessPropertyPane {

  constructor(lists: IList[]) {
    this._lists = lists;
  }
  
  private _lists : IList[] = [];
  
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: { description: strings.PropertyPane.DescriptionLabel },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.PropertyPane.TitleFieldLabel,
                  description: strings.PropertyPane.TitleFieldDescription
                }),
                PropertyPaneDropdown('listId', { 
                  label: strings.PropertyPane.ListNameFieldLabel,                  
                  options: this._lists.map(list => ({
                    key: list.id,
                    text: list.name
                  }))
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

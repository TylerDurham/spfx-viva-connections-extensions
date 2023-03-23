import {
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton,
  BaseImageCardView,
  IImageCardParameters
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'QuickAccessAdaptiveCardExtensionStrings';
import { IQuickAccessAdaptiveCardExtensionProps, IQuickAccessAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../QuickAccessAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IQuickAccessAdaptiveCardExtensionProps, IQuickAccessAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickView.ButtonText,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IImageCardParameters {
    return {
      primaryText: strings.PrimaryText,
      title: this.properties.title,
      
      imageUrl: "https://cdn.hubblecontent.osi.office.net/m365content/publish/dfce80bd-6716-4577-8550-c0d192776eb9/thumbnails/large.jpg?file=1226452601.jpg"
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}

import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'QuickAccessAdaptiveCardExtensionStrings';
import { logger } from '../constants';
import { IQuickAccessAdaptiveCardExtensionProps, IQuickAccessAdaptiveCardExtensionState } from '../QuickAccessAdaptiveCardExtension';
import { IListItem } from '../sp.service';

export interface IQuickViewData {
  title: string;
  listItems: IListItem[];
}

export class QuickView extends BaseAdaptiveCardView<
  IQuickAccessAdaptiveCardExtensionProps,
  IQuickAccessAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    const data =  {
      title: (this.state.listItems.length > 0) ? strings.QuickView.Title : strings.QuickView.ErrNoConfiguredList,
      listItems: this.state.listItems
    };
    logger.debug("getting quickview data", data)
    return data;
  }

  public get template(): ISPFxAdaptiveCard {
    //console.log(JSON.stringify(this.state.listItems))
    return require('./template/QuickViewTemplate.json');
  }
}
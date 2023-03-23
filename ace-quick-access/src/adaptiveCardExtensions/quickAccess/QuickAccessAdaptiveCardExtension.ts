import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { QuickAccessPropertyPane } from './QuickAccessPropertyPane';
import { fetchListItems, fetchLists, IListItem } from './sp.service';
import { IODataOptions } from './sp.odata';

export interface IQuickAccessAdaptiveCardExtensionProps {
  title: string;
  listId: string;
}

export interface IQuickAccessAdaptiveCardExtensionState {
  listItems: IListItem[];
}

const ODATA_OPTIONS: IODataOptions = {
  orderBy: {
    fieldName: "SortOrder",
    direction: "desc"
  }
}



const CARD_VIEW_REGISTRY_ID: string = 'QuickAccess_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'QuickAccess_QUICK_VIEW';

export default class QuickAccessAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IQuickAccessAdaptiveCardExtensionProps,
  IQuickAccessAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: QuickAccessPropertyPane | undefined;

  public async onInit(): Promise<void> {

    let listItems = [];

    
    
    if (undefined !== this.properties.listId) {
      listItems = await fetchListItems(this.context, this.properties.listId, ODATA_OPTIONS);
    }

    this.state = { listItems };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected async loadPropertyPaneResources(): Promise<void> {

    const lists = (await fetchLists(this.context)).filter((list) => {
      return list.hidden === false;
    });

    return import(
      /* webpackChunkName: 'QuickAccess-property-pane'*/
      './QuickAccessPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.QuickAccessPropertyPane(lists);
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue)

    if(propertyPath === "listId" && newValue) {
      fetchListItems(this.context, this.properties.listId, ODATA_OPTIONS )
        .then((listItems) => {
          this.setState({listItems});
        })
    }    
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}

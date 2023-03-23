declare interface IQuickAccessAdaptiveCardExtensionStrings {
  PropertyPaneDescription: string;
  
  Title: string;
  SubTitle: string;
  PrimaryText: string;
  Description: string;
  QuickView: IQuickAccessAdaptiveCardExtensionQuickViewStrings;
  PropertyPane: IQuickAccessAdaptiveCardExtensionPropertyPaneStrings;
}

declare interface IQuickAccessAdaptiveCardExtensionPropertyPaneStrings {
  TitleFieldLabel: string;
  TitleFieldDescription: string;
  ListNameFieldLabel: string;
  ListNameFieldDescription: string;
  DescriptionLabel: string;
}

declare interface IQuickAccessAdaptiveCardExtensionQuickViewStrings {
  Title: string;
  ButtonText: string;
  ErrNoConfiguredList: string;
}

declare module 'QuickAccessAdaptiveCardExtensionStrings' {
  const strings: IQuickAccessAdaptiveCardExtensionStrings;
  export = strings;
}

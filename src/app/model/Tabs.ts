/* eslint-disable eol-last */
interface TabsCustomEvent extends CustomEvent {
    detail: { tab: string };
    target: HTMLIonTabsElement;
  }
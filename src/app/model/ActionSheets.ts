/* eslint-disable eol-last */
interface ActionSheetButton<T = any> {
    text?: string;
    role?: 'cancel' | 'destructive' | 'selected' | string;
    icon?: string;
    cssClass?: string | string[];
    handler?: () => boolean | void | Promise<boolean | void>;
    data?: T;
  }

  interface ActionSheetOptions {
    header?: string;
    subHeader?: string;
    cssClass?: string | string[];
    buttons: (ActionSheetButton | string)[];
    backdropDismiss?: boolean;
    translucent?: boolean;
    animated?: boolean;
    keyboardClose?: boolean;
    id?: string;
    htmlAttributes?: { [key: string]: any };

  }
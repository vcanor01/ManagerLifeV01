/* eslint-disable eol-last */
interface ToastButton {
    text?: string;
    icon?: string;
    side?: 'start' | 'end';
    role?: 'cancel' | string;
    cssClass?: string | string[];
    handler?: () => boolean | void | Promise<boolean | void>;
  }

  interface ToastOptions {
    header?: string;
    cssClass?: string | string[];
    duration?: number;
    buttons?: (ToastButton | string)[];
    position?: 'top' | 'bottom' | 'middle';
    translucent?: boolean;
    animated?: boolean;
    icon?: string;
    htmlAttributes?: { [key: string]: any };

    keyboardClose?: boolean;
    id?: string;

  }
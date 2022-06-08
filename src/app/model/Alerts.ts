/* eslint-disable @typescript-eslint/quotes */
import { IonicSafeString, AnimationBuilder } from "@ionic/angular";

/* eslint-disable eol-last */
interface AlertButton {
    text: string;
    role?: 'cancel' | 'destructive' | string;
    cssClass?: string | string[];
    handler?: (value: any) => boolean | void | {[key: string]: any};
  }

  interface AlertInput {
    // type?: TextFieldTypes | 'checkbox' | 'radio' | 'textarea';
    name?: string;
    placeholder?: string;
    value?: any;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    handler?: (input: AlertInput) => void;
    min?: string | number;
    max?: string | number;
    cssClass?: string | string[];
    attributes?: { [key: string]: any };
    tabindex?: number;
  }

  interface AlertOptions {
    header?: string;
    subHeader?: string;
    message?: string | IonicSafeString;
    cssClass?: string | string[];
    inputs?: AlertInput[];
    buttons?: (AlertButton | string)[];
    backdropDismiss?: boolean;
    translucent?: boolean;
    animated?: boolean;
    htmlAttributes?: { [key: string]: any };


    keyboardClose?: boolean;
    id?: string;

    enterAnimation?: AnimationBuilder;
    leaveAnimation?: AnimationBuilder;
  }
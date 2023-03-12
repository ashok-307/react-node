import { PropsWithChildren } from 'react';

export interface ControllerRulesProps {
    required?: boolean;
    min?: string | number;
    max?: string | number;
    minLength?: string | number;
    maxLength?: string | number;
    pattern?: string | RegExp;
    validate?: boolean;
}


export type FormsCustomValidation = {
    [key: string]: (e: any) => boolean;
}

export interface SingleRadioProps {
    value: string;
    label?: string;
    labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
}

export interface FormControlsAllProps {
    onControlChange?: (value: any) => any;
    onControlBlur?: (value: any) => any;
    validation?: FormsCustomValidation;
    isError?: any;
    rules?: any;
    disabled?: boolean;
    radioData?: {
        name: string;
        row?: boolean;
        data: SingleRadioProps[];
    };
    selectOptions?: any[];
    optionIdKey?: string;
    optionNameKey?: string;
    elementType?: 'input' | 'select' | 'multi-select' | 'textarea' | 'toggle' | 'radio' | 'checkbox' | 'file' | 'button';
    inputType?: 'text' | 'number' | 'email' | 'password' | 'datetime-local' | 'date';
    control: any;
    name: string;
    elementId?: string;
    label?: string;
    customLabel?: string;
    defaultValue?: any;
}

export type FormsProps = PropsWithChildren & FormControlsAllProps;

export interface FormErrorMessageProps {
    type: string;
    controlName?: string;
    message?: string;
    ref?: any;
}

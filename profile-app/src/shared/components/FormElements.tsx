import { TextField } from '@mui/material';
import React, { Fragment, Ref } from 'react';

export interface FormElementsProps {
    value: any;
    name: string;
    id: string;
    elementType?: 'input' | 'select' | 'textarea' | 'toggle' | 'autoselect' | 'multi-select';
    inputType?: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'radio' | 'date' | 'file';
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: string | number | Date;
    max?: string | number | Date;
    cols?: number;
    rows?: number;
    multiple?: boolean;
    helpText?: string;
    placeHolder?: string;
    disabled?: boolean;
    inputRef?: Ref<any>;
    radioValue?: string;
    label?: string;
    options?: any[];
    optionNameKey?: string;
    optionValueKey?: string;
    onChange?: (value: any) => any;
}

function FormElements(props: FormElementsProps) {
    let defaults = { 
        elementType: 'input', 
        inputType: 'text', 
        value: '', 
        cols: 10, 
        rows: 5, 
        radioValue: '', 
        label: '', 
        multiple: false, 
        disabled: false, 
        name: '', 
        id: '', 
        placeHolder: '', 
        required: false, 
        minLength: '', 
        maxLength: '', 
        min: '', 
        max: '', 
        options: [], 
        optionNameKey: '', 
        optionValueKey: '', 
        helpText: '', 
        inputRef: React.createRef(), 
        onChange: (e: any) => e
    };

    let {
        elementType,
        inputType,
        value,
        name,
        id,
        required,
        // minLength,
        // maxLength,
        min,
        max,
        // helpText,
        placeHolder,
        disabled,
        inputRef,
        multiple,
        radioValue,
        options,
        optionNameKey,
        optionValueKey,
        cols,
        rows,
        label,
        onChange
    } = Object.assign({}, defaults, props);

    return (
        <Fragment>
            {elementType === 'input' && (
                <Fragment>
                    {inputType === 'text' && (
                        <Fragment>
                            <TextField
                                name={name}
                                defaultValue={value}
                                fullWidth={true}
                                label={label}
                                type="text"
                                disabled={disabled}
                                id={id}
                                inputRef={inputRef}
                                variant="outlined"
                                required={required}
                                onChange={(e) => onChange(e)}
                            />
                        </Fragment>
                    )}
                    {inputType === 'number' && (
                        <Fragment>
                            <TextField
                                name={name}
                                defaultValue={value}
                                fullWidth={true}
                                label={label}
                                disabled={disabled}
                                type="number"
                                id={id}
                                variant="outlined"
                                inputRef={inputRef}
                                required={required}
                                onChange={(e) => onChange(e)}
                            />
                        </Fragment>
                    )}
                    {inputType === 'email' && (
                        <Fragment>
                            <TextField
                                name={name}
                                defaultValue={value}
                                fullWidth={true}
                                label={label}
                                disabled={disabled}
                                type="email"
                                id={id}
                                variant="outlined"
                                inputRef={inputRef}
                                required={required}
                                onChange={(e) => onChange(e)}
                            />
                        </Fragment>
                    )}
                    {inputType === 'password' && (
                        <Fragment>
                            <TextField
                                name={name}
                                defaultValue={value}
                                fullWidth={true}
                                label={label}
                                disabled={disabled}
                                type="password"
                                id={id}
                                variant="outlined"
                                inputRef={inputRef}
                                required={required}
                                onChange={(e) => onChange(e)}
                            />
                        </Fragment>
                    )}
                    {inputType === 'checkbox' && (
                        <Fragment>
                            <label htmlFor={id} className="form-label">{label} {required && (<span>*</span>)}</label>
                            <input type="checkbox" id={id} placeholder={placeHolder} name={name} disabled={disabled} checked={value} required={required} onChange={(e) => onChange(e)}  />
                        </Fragment>
                    )}
                    {inputType === 'radio' && (
                        <Fragment>
                            <label htmlFor={id} className="form-label">{label} {required && (<span>*</span>)}</label>
                            <input type="radio" id={id} name={name} value={value} checked={value === radioValue} disabled={disabled} required={required} onChange={(e) => onChange(e)}  />
                        </Fragment>
                    )}
                    {inputType === 'date' && (
                        <Fragment>
                            <label htmlFor={id} className="form-label">{label} {required && (<span>*</span>)}</label>
                            <input type="datetime-local" id={id} name={name} value={value} disabled={disabled} min={min} max={max} required={required} onChange={(e) => onChange(e)}  />
                        </Fragment>
                    )}
                    {inputType === 'file' && (
                        <Fragment>
                            <label htmlFor={id} className="form-label">{label} {required && (<span>*</span>)}</label>
                            <input type="file" id={id} name={name} value={value} disabled={disabled} multiple={multiple} required={required} onChange={(e) => onChange(e)}  />
                        </Fragment>
                    )}
                </Fragment>
            )}

            {elementType === 'textarea' && (
                <Fragment>
                    <label htmlFor={id} className="form-label">{label} {required && (<span>*</span>)}</label>
                    <textarea name={name} id={id} cols={cols} rows={rows} placeholder={placeHolder} value={value} onChange={(e) => onChange(e)}></textarea>
                </Fragment>
            )}

            {elementType === 'select' && (
                <Fragment>
                    <label htmlFor={id} className="form-label">{label} {required && (<span>*</span>)}</label>
                    <select name={name} value={value} id={id} onChange={(e) => onChange(e)}>
                        <option value="">---Select---</option>
                        {
                            options.map((option: any) => (
                                <option key={option[optionValueKey]} value={option[optionValueKey]}>{option[optionNameKey]}</option>
                            ))
                        }
                    </select>
                </Fragment>                
            )}

            {elementType === 'multi-select' && (
                <Fragment>
                    <label htmlFor={id} className="form-label">{label} {required && (<span>*</span>)}</label>
                    <select name={name} value={value} id={id} multiple={true} onChange={(e) => onChange(e)}>
                        <option value="">---Select---</option>
                        {
                            options.map((option: any) => (
                                <option key={option[optionValueKey]} value={option[optionValueKey]}>{option[optionNameKey]}</option>
                            ))
                        }
                    </select>
                </Fragment>
            )}
        </Fragment>
    )
}

export default FormElements;

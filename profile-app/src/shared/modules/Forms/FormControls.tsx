import React, { ChangeEvent, FocusEvent, Fragment, ReactElement, useEffect, useState } from 'react';
import { Checkbox, Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { FormsProps } from './FormsProps';
import FormErrorMessage from './FormErrorMessage';
import { Box } from '@mui/system';
import { insertValueWithoutDuplication, removeDuplicateFromAnArray } from './FormController';
import { Theme, useTheme } from '@mui/material/styles';

function FormControls(props: FormsProps) {
    let {  onControlChange, isError, onControlBlur, rules, radioData, disabled, selectOptions, optionIdKey, optionNameKey, elementId, elementType, control, name, inputType, label, customLabel } = props;
    const [isControlError, setControlError] = useState(false);
    const [chips, setChips] = React.useState<any[]>(control._defaultValues[name]);
    const theme = useTheme();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        }
    };

    useEffect(() => {
        setControlError(!!isError);
    }, [isError]);

    function getStyles(option: any, personName: readonly any[], theme: Theme) {
        let tested = personName.find((ele) => ele[optionIdKey || ''] === option[optionIdKey || '']);
        let st = theme.typography.fontWeightRegular;
        let bg = 'transparent';

        if (tested) {
            st = 500;
            bg = '#eeeeee';
        }
        return {
          fontWeight: st,
          background: bg
        };
    }

    const handleChange = (event: SelectChangeEvent<any>) => {
        const { target: { value } } = event;
        let finalValue = insertValueWithoutDuplication(chips, value[value.length-1], optionIdKey || '');
        setChips(finalValue);

        if (onControlChange) {
            return onControlChange(finalValue);
        }
        return finalValue;
    };

    const onInputChange = (e: any) => {
        if (onControlChange) {
            return onControlChange(e);
        }
        return e.target.value;
    }

    const onInputChecked = (e: ChangeEvent<any>) => {
        if (onControlChange) {
            return onControlChange(e);
        }
        return e.target.checked;
    }

    const onInputBlur = (e: FocusEvent<any>, field: any) => {
        field.onBlur();
        if (onControlBlur) {
            return onControlBlur(e.target.value);
        }
    }

    const formControl = (field: ControllerRenderProps, isControlErrorValue: boolean ): ReactElement => {
        if (!elementType || elementType === 'input') {
            return (
                <Fragment>
                    {
                        customLabel && (<FormLabel id="demo-customized-radios">{customLabel} {rules && rules.required && (<span className="text-danger">*</span>)}</FormLabel>)
                    }
                    <TextField
                        value={field.value}
                        name={field.name}
                        label={label}
                        placeholder={label}
                        disabled={disabled || false}
                        fullWidth={true}
                        id={elementId || 'ele'}
                        type={inputType || 'text'}
                        inputRef={field.ref}
                        autoFocus={false}
                        autoComplete={'off'}
                        variant={'outlined'}
                        onChange={(e) => {
                            field.onChange(onInputChange(e))
                        }}
                        onBlur={(et) => {
                            onInputBlur(et, field)
                        }}
                        error={isControlError}
                    />
                    {
                        isControlError && isError && (
                            <div className="form-error">
                                <FormErrorMessage type={isError['type']} message={isError['message'] || ''} controlName={customLabel || label || 'Custom Label'}  />
                            </div>
                        )
                    }
                    
                </Fragment>
            )
        } else if (elementType === 'radio' && radioData) {
            return (
                <Fragment>
                    {
                        customLabel && (<FormLabel id="demo-customized-radios">{customLabel} {rules && rules.required && (<span className="text-danger">*</span>)}</FormLabel>)
                    }
                    <RadioGroup
                        row={radioData.row || false}
                        aria-labelledby="material-ui-radio-group"
                        value={field.value}
                        name={field.name}
                        onChange={(e) => {
                            field.onChange(onInputChange(e) || '')
                        }}
                        >
                        {
                            radioData.data.map((radio, ind) => (
                                <FormControlLabel
                                    key={(radioData?.name || '') + (ind + 1)}
                                    value={radio.value}
                                    control={<Radio />}
                                    label={radio.label || 'Default'}
                                    labelPlacement={radio.labelPlacement || 'end'}
                                />
                            ))
                        }
                    </RadioGroup>
                    {
                        isControlError && isError && (
                            <div className="form-error">
                                <FormErrorMessage type={isError['type']} message={isError['message'] || ''} controlName={customLabel || label || 'Custom Label'}  />
                            </div>
                        )
                    }
                </Fragment>
            )
        } else if (elementType === 'checkbox') {
            return (
                <Fragment>
                    {
                        customLabel && (<FormLabel id="demo-customized-radios">{customLabel} {rules && rules.required && (<span className="text-danger">*</span>)}</FormLabel>)
                    }
                    <Checkbox
                        value={field.value}
                        checked={field.value}
                        disabled={disabled || false}
                        id={elementId}
                        onChange={(e) => {
                            field.onChange(onInputChecked(e) || false)
                        }}
                    />
                    {
                        isControlError && isError && (
                            <div className="form-error">
                                <FormErrorMessage type={isError['type']} message={isError['message'] || ''} controlName={customLabel || label || 'Custom Label'}  />
                            </div>
                        )
                    }
                </Fragment>
            );
        } else if (elementType === 'select') {
            return (
                <Fragment>
                    {
                        customLabel && (<FormLabel id="demo-customized-radios">{customLabel} {rules && rules.required && (<span className="text-danger">*</span>)}</FormLabel>)
                    }
                    <FormControl fullWidth>
                        <InputLabel id={elementId} error={isControlError}>{label || customLabel}</InputLabel>
                        <Select
                            name={field.name}
                            id={elementId}
                            fullWidth={true}
                            label={label || customLabel}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(onInputChange(e))
                            }}
                            error={isControlError}
                            >
                            {selectOptions && selectOptions.map((option, ind) => (
                                <MenuItem
                                    key={option[optionIdKey || ind] + ind}
                                    value={option[optionIdKey || '']}
                                    >
                                    {option[optionNameKey || '']}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        isControlError && isError && (
                            <div className="form-error">
                                <FormErrorMessage type={isError['type']} message={isError['message'] || ''} controlName={customLabel || label || 'Custom Label'}  />
                            </div>
                        )
                    }
                </Fragment>
            );
        } else if (elementType === 'multi-select') {
            return (
                <Fragment>
                    {
                        customLabel && (<FormLabel id="demo-customized-radios">{customLabel} {rules && rules.required && (<span className="text-danger">*</span>)}</FormLabel>)
                    }
                    <FormControl fullWidth>
                        <InputLabel id={elementId} error={isControlError}>{label || customLabel}</InputLabel>
                        <Select
                            name={field.name}
                            id={elementId}
                            multiple={true}
                            fullWidth={true}
                            label={label || customLabel}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(handleChange(e))
                            }}
                            error={isControlError}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {removeDuplicateFromAnArray(selected, optionIdKey|| '').map((value: any) => {
                                        return (
                                            <Chip key={value[optionIdKey || '']} label={value[optionNameKey || '']} />
                                        )
                                    })}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {selectOptions && selectOptions.map((option, ind) => (
                                <MenuItem
                                    key={option[optionIdKey || ind] + ind}
                                    value={option}
                                    style={getStyles(option, chips, theme)}
                                    >
                                    {option[optionNameKey || '']}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        isControlError && isError && (
                            <div className="form-error">
                                <FormErrorMessage type={isError['type']} message={isError['message'] || ''} controlName={customLabel || label || 'Custom Label'}  />
                            </div>
                        )
                    }
                </Fragment>
            )
        } else if (elementType === 'textarea') {
            return (
                <Fragment>
                    {
                        customLabel && (<FormLabel id="demo-customized-radios">{customLabel} {rules && rules.required && (<span className="text-danger">*</span>)}</FormLabel>)
                    }
                    <TextField
                        value={field.value}
                        name={field.name}
                        label={label}
                        placeholder={label}
                        multiline={true}
                        rows={4}
                        disabled={disabled || false}
                        fullWidth={true}
                        id={elementId || 'ele'}
                        variant={'outlined'}
                        onChange={(e) => {
                            field.onChange(onInputChange(e))
                        }}
                        onBlur={(et) => {
                            onInputBlur(et, field)
                        }}
                        error={isControlError}
                    />
                    {
                        isControlError && isError && (
                            <div className="form-error">
                                <FormErrorMessage type={isError['type']} message={isError['message'] || ''} controlName={customLabel || label || 'Custom Label'}  />
                            </div>
                        )
                    }
                    
                </Fragment>
            )
        }
        return (
            <></>
        );
    }

    return (
        <Fragment>
            <Controller
                name={name}
                control={control}
                rules={rules || {}}
                render={ ({ field }) => ( formControl(field, isControlError) ) }
            />
            {/* <p className="small">{rules && rules.required ? 'true' : 'false'}</p> */}
            {/* <p className="small">{isControlError ? 'true' : 'false'} {name}</p> */}
        </Fragment>
    )
}

export default FormControls;

import React, { Fragment } from 'react';
import { FormErrorMessageProps } from './FormsProps';

function FormErrorMessage(props: FormErrorMessageProps) {
    let { type, controlName, message } = props;
    return (
        <Fragment>
            {
                type === 'required' && (
                    <p className="text-danger">
                        {
                            message ? message : controlName + ' is required.'
                        }
                    </p>
                )
            }
            {
                type === 'minLength' && (
                    <p className="text-danger">
                        {
                            message ? message : controlName + ' need to have minimum length characters.'
                        }
                    </p>
                )
            }
            {
                type === 'maxLength' && (
                    <p className="text-danger">
                        {
                            message ? message : controlName + ' need to have maximum length characters.'
                        }
                    </p>
                )
            }
            {
                type === 'pattern' && (
                    <p className="text-danger">
                        {
                            message ? message : controlName + ' does not meet the required format.'
                        }
                    </p>
                )
            }
            {
                type === 'confirmPassword' && (
                    <p className="text-danger">
                        {
                            message ? message : controlName + ' does not match the new password.'
                        }
                    </p>
                )
            }
        </Fragment>
    )
}

export default FormErrorMessage;

import React from 'react'
import { Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

function Service() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = (data: any) => console.log(data);
  const onError = (e: any) => {
    console.log('E :', e)
  };
  return (
    <form>
      <div className="my-1">
        <Controller
          control={control}
          rules={{
          required: true,
          }}
          render={ ({ field: { onChange, onBlur, value } }) => (
            <TextField
              onBlur={ onBlur }
              onChange={ onChange }
              value={ value }
              label="First Name"
              fullWidth
              error={errors.firstName ? true : false}
            />
          ) }
          name="firstName"
        />
        {errors.firstName && <Typography>This is required.</Typography>}
      </div>

      <div className="my-1">
        <Controller
          control={control}
          rules={{
          maxLength: 100,
          minLength: 5
          }}
          render={ ({ field: { onChange, onBlur, value } }) => (
            <TextField
              onBlur={ onBlur }
              label="Last Name"
              onChange={ onChange }
              value={ value }
              fullWidth
              error={errors.lastName ? true : false}
            />
          ) }
          name="lastName"
        />
        {errors.lastName && <Typography>Length does not meet the requirements.</Typography>}
      </div>

      <Button type='submit' title="Submit" name='Button' onClick={handleSubmit(onSubmit, onError)}>Submit</Button>
    </form>
  )
}

export default Service;

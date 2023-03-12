import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
import { RegExpression } from '../../shared/modules/Forms/Form.constants';
import { matchPasswords } from '../../shared/modules/Forms/FormController';
import FormControls from '../../shared/modules/Forms/FormControls';
import { LoaderService } from '../../shared/services/Loader.service';
import { useRegisterUserMutation } from '../../store/api/auth.api';
import { setAlertAPI } from '../../store/slices/shared/alert';

const Register = () => {
  const dispatchEvent = useDispatch<any>();
  const navigate = useNavigate();
  const [onRegisterUserAPI] = useRegisterUserMutation();
  let abortRegisterUser: any = null;

  let { handleSubmit, control, formState: {errors}, watch, getValues} = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  });

  watch('password');
  watch('password2');

  let customErrorMessage: any = {
    'name': {
      'required': 'Name is required.',
      'minLength': 'Name should have minimum 3 characters.',
      'maxLength': 'Name should have maximum 250 characters'
    },
    'email': {
      'required': 'Email is required',
      'pattern': 'Email is invalid.'
    },
    'password': {
      'required': 'Password is required.',
      'minLength': 'Password should have minimum 5 characters.',
      'maxLength': 'Password should have maximum 12 characters.',
    }
  };

  const onRegisterUser = (e: any) => {
    if (e.password !== e.password2) {
      dispatchEvent(setAlertAPI({ message: 'Password does not match.'}));
      return null;
    }
    let newUser = {
      name: e.name,
      email: e.email,
      password: e.password
    };

    LoaderService.openModel('signup', {appendTo: 'inline', appendToElement: '.load-signup'});
    abortRegisterUser = onRegisterUserAPI(newUser);
    abortRegisterUser.unwrap().then((res: any) => {
      LoaderService.closeModel('signup');
      navigate(RouteAPI.Login);
    }).catch((err: any) => {
      LoaderService.closeModel('signup');
      dispatchEvent(setAlertAPI({message: err.errors[0].msg}));
    });
    // dispatchEvent(registerUserAPI(newUser)).then((res: any) => {
    //   if (!res.error) {
    //     navigate(RouteAPI.Login);
    //   }
    // });
  }

  const onErrorSubmit = (e: any) => {
    console.log('Error :', e);
  }

  useEffect(() => {
    return () => {
      abortRegisterUser && abortRegisterUser.abort();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section className="container">
      <Alert />
      <Fragment>
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
          <form className="form" onSubmit={handleSubmit(onRegisterUser, onErrorSubmit)}>
            <div className="form-group">
              <FormControls 
                name="name" 
                elementId="name"
                elementType="input" 
                control={control} 
                label="Name" 
                rules={{required: true, minLength: 3, maxLength: 250}} 
                isError={errors.name ? {
                  type: errors.name.type, 
                  message: customErrorMessage['name'] && customErrorMessage['name'][errors.name.type] ? customErrorMessage['name'][errors.name.type] : errors.name.message
                } : undefined}
              />
            </div>
            <div className="form-group">
              <FormControls
                name="email" 
                elementId="email"
                elementType="input" 
                control={control} 
                label="Email" 
                rules={{required: true, pattern: RegExpression.Email}} 
                isError={errors.email ? {
                  type: errors.email.type, 
                  message: customErrorMessage['email'] && customErrorMessage['email'][errors.email.type] ? customErrorMessage['email'][errors.email.type] : errors.email.message
                } : undefined}
              />
            </div>
            <div className="form-group">
              <FormControls 
                name="password" 
                inputType="password" 
                elementId="password"
                control={control} 
                label="Password" 
                rules={{required: true, minLength: 5, maxLength: 12}} 
                isError={errors.password ? {
                  type: errors.password.type, 
                  message: customErrorMessage['password'] && customErrorMessage['password'][errors.password.type] ? customErrorMessage['password'][errors.password.type] : errors.password.message
                } : undefined}
              />
            </div>
            <div className="form-group">
              <FormControls 
                name="password2" 
                inputType="password" 
                elementId="password2"
                control={control} 
                label="Confirm Password" 
                rules={{validate: {
                  confirmPassword2:  matchPasswords(getValues().password, 'Confirm Password', 'Password')
                }}} 
                isError={getValues().password !== getValues().password2 ? {
                  type: 'confirmPassword', 
                  message: errors.password2?.message
                } : undefined}
              />
            </div>
            {/* <input type="submit" className="btn btn-primary" value="Sign Up" /> */}
            <button className="btn btn-primary my-1">Sign Up <span className="load load-signup"></span></button>
          </form>
          <p className="my-1">
            Already have an account? <NavLink to={RouteAPI.Login}>Sign In</NavLink>
          </p>
      </Fragment>
    </section>
  )
}

export default Register;

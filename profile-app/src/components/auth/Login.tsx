import React, {useEffect } from 'react';
// import { loginAPI } from '../../store/slices/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
import { LoaderService } from '../../shared/services/Loader.service';
import { useForm } from 'react-hook-form';
import FormControls from '../../shared/modules/Forms/FormControls';
import { RegExpression } from '../../shared/modules/Forms/Form.constants';
import { useLoginMutation } from '../../store/api/auth.api';
import { setAlertAPI } from '../../store/slices/shared/alert';

const Login = () => {
  const {isAuthenticated} = useSelector((state:any) => state.authReducer);
  const [onLoginAPI] = useLoginMutation();
  const dispatchEvent = useDispatch<any>();
  let abortLogin: any = null;

  const navigate = useNavigate();

  let { handleSubmit, control, formState: {errors}} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  let customErrorMessage: any = {
    'email': {
      'required': 'Email is required',
      'pattern': 'Email is invalid.'
    },
    'password': {
      'required': 'Password is required.',
      'minLength': 'Password should have minimum 5 characters.',
      'maxLength': 'Password should have maximum 12 characters.'
    }
  }

  const onLogin = (event: any) => {
    LoaderService.openModel('login1', {appendTo: 'inline', appendToElement: 'button .load'});
    abortLogin = onLoginAPI(event);
    abortLogin.unwrap().then((res: any) => {
      LoaderService.closeModel('login1');
      navigate(RouteAPI.Dashboard);
    }).catch((err: any) => {
      LoaderService.closeModel('login1');
      dispatchEvent(setAlertAPI({message: err.errors[0].msg}));
    });

    // dispatchEvent(loginAPI(event)).then((res: any) => {
    //   LoaderService.closeModel('login1');
    //   if (!res.error) {
    //     navigate(RouteAPI.Dashboard);
    //   }
    // });
  }

  useEffect(() => {
    return () => {
      abortLogin && abortLogin.abort();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(isAuthenticated);

  return (
    <section className="container">
      <Alert />
      <div className="row">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fa fa-user"></i> Sign into Your Account</p>
        <form className="form" aria-label="Form" onSubmit={handleSubmit(onLogin)}>
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
          <button type="submit" className="btn btn-primary">Sign In <span className="load"></span></button>
        </form>
        <p className="my-1">
          Don't have an account? <NavLink to={RouteAPI.Register}>Sign up</NavLink>
        </p>
      </div>
    </section>
  )
}

export default Login;

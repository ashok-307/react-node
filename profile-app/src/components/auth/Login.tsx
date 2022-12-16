import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { loginAPI } from '../../store/slices/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
import { LoaderService } from '../../shared/services/Loader.service';
// import CommonService from '../../shared/services/common.service';

const Login = () => {
  // const location = useLocation();
  const {isAuthenticated} = useSelector((state:any) => state.authReducer);
  const dispatchEvent = useDispatch<any>();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const {email, password} = loginForm;

  const navigate = useNavigate();


  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let element = event.target;
    let value = element.value;
    let name = element.name;
  
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }
  const onLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    LoaderService.openModel('login1', {appendTo: 'inline', appendToElement: 'button .load'});
    dispatchEvent(loginAPI(loginForm)).then((res: any) => {
      LoaderService.closeModel('login1');
      if (!res.error) {
        navigate(RouteAPI.Dashboard);
      }
    });
  }

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <section className="container">
      <Alert />
      <div className="row">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fa fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={(e) => onLogin(e)}>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              name="email"
              value={email}
              onChange={(e) => onFormChange(e)}
              required />
            <small className="form-text">This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onFormChange(e)}
              minLength={6}
              required
            />
          </div>
          {/* <input type="submit" className="btn btn-primary" value="Sign In" /> */}
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

import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
import { registerUserAPI } from '../../store/slices/auth/auth';
import { setAlertAPI } from '../../store/slices/shared/alert';

const Register = () => {
  const {token} = useSelector((state:any) => state.authReducer);
  const dispatchEvent = useDispatch<any>();

  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const navigate = useNavigate();

  const { name, email, password, password2 } = registerFormData;

  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    let element = e.target;
    let value = element.value;
    let name = element.name;

    setRegisterFormData({
      ...registerFormData,
      [name]: value
    });
  }

  const onRegisterUser = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    if (password !== password2) {
      dispatchEvent(setAlertAPI({ message: 'Password does not match.'}));
      return null;
    }
    let newUser = {
      name,
      email,
      password
    };

    dispatchEvent(registerUserAPI(newUser));
  }

  useEffect(() => {
    if (token) {
      navigate(RouteAPI.Login);
    }
  }, [token,navigate]);
  return (
    <section className="container">
      <Alert />
      <Fragment>
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
          <form className="form" onSubmit={(e) => onRegisterUser(e)}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Name" 
                name="name" 
                value={name}
                onChange={(e) => onFieldChange(e)}
                required />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                name="email"
                value={email}
                onChange={(e) => onFieldChange(e)}
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
                onChange={(e) => onFieldChange(e)}
                minLength={6}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={(e) => onFieldChange(e)}
                minLength={6}
                required
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Sign Up" />
          </form>
          <p className="my-1">
            Already have an account? <NavLink to={RouteAPI.Login}>Sign In</NavLink>
          </p>
      </Fragment>
    </section>
  )
}

export default Register;

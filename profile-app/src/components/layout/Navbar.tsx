import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import { logoutUserAPI } from '../../store/slices/auth/auth';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: any) => state.authReducer);
  const dispatchEvent = useDispatch<any>();
  const navigate = useNavigate();

  let onLogout = (e: any) => {
    e.preventDefault();
    dispatchEvent(logoutUserAPI());
    navigate(RouteAPI.Login);
  }

  let authenticateLinks = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <NavLink to="/posts">Posts</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard"><i className="fa fa-user"></i><span className='hide-sm'>{' '}Dashboard</span></NavLink>
        </li>
      <li><a onClick={(e) => onLogout(e)} href="#!">Logout</a></li>
    </ul>
  );

  let navLinks = (
    <ul>
      <li><NavLink to="/profiles">Developers</NavLink></li>
      <li><NavLink to="/register">Register</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
    </ul>
  )


  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/"><i className="fa fa-code"></i> DevConnector</NavLink>
      </h1>
      {isAuthenticated ? authenticateLinks : navLinks}
    </nav>
  )
}

export default Navbar;

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import useLogout from '../../shared/hooks/useLogout';
// import { logoutUserAPI } from '../../store/slices/auth/auth';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: any) => state.authReducer);
  const onLogOut = useLogout();

  let onLogout = (e: any) => {
    e.preventDefault();
    onLogOut();
  }

  let authenticateLinks = (
    <ul>
      <li>
        <NavLink to={RouteAPI.Pages}>Pages</NavLink>
      </li>
      <li>
        <NavLink to={RouteAPI.Profiles}>Developers</NavLink>
      </li>
      <li>
        <NavLink to={RouteAPI.Posts}>Posts</NavLink>
      </li>
      <li>
        <NavLink to={RouteAPI.Dashboard}><i className="fa fa-user"></i><span className='hide-sm'>{' '}Dashboard</span></NavLink>
        </li>
      <li><a onClick={(e) => onLogout(e)} href="#!">Logout</a></li>
    </ul>
  );

  let navLinks = (
    <ul>
      <li><NavLink to={RouteAPI.Profiles}>Developers</NavLink></li>
      <li><NavLink to={RouteAPI.Register}>Register</NavLink></li>
      <li><NavLink to={RouteAPI.Login}>Login</NavLink></li>
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

import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';

function DashboardActions() {
  return (
    <Fragment>
        <div className="dash-buttons">
        <NavLink to="/edit-profile" className="btn btn-light"
          ><i className="fa fa-user-circle text-primary"></i> Edit Profile</NavLink>
        <NavLink to="/add-experience" className="btn btn-light"
          ><i className="fa fa-black-tie text-primary"></i> Add Experience</NavLink>
        <NavLink to="/add-education" className="btn btn-light"
          ><i className="fa fa-graduation-cap text-primary"></i> Add Education</NavLink>
      </div>
    </Fragment>
  )
}

export default DashboardActions;

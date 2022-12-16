import React from 'react'
import { NavLink } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';

interface ProfileItemProps {
  profile: any;
}
function ProfileItem(props: ProfileItemProps) {
  let { user: {_id, name, avatar}, status, company, location, skills } = props.profile;
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="avatar" />
      <div>
        <h2>{name}</h2>
        <p>{status} {company && <span> at {company}</span>}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <NavLink to={`${RouteAPI.Profile}${_id}`} className="btn btn-primary">View Profile</NavLink>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill: any, index: number) => (
          <li key={index} className="text-primary">
            <i className="fa fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileItem;

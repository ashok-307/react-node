import React from 'react';
import Moment from 'react-moment';

interface ProfileExperienceProps {
    experience: any;
}

function ProfileExperience(props: ProfileExperienceProps) {
    let { title, company, from, to, description } = props.experience;
  return (
    <div>
        <h3 className="text-dark">{company}</h3>
        <p>{<Moment format="YYYY/MM/DD">{from}</Moment>} - {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}</p>
        <p><strong>Position: </strong>{title}</p>
        <p>
            <strong>Description: </strong>{description || 'NA'}
        </p>
    </div>
  )
}

export default ProfileExperience;

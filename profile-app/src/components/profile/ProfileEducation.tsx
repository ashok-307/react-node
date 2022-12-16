import React from 'react'
import Moment from 'react-moment';

interface ProfileEducationProps {
    education: any;
}

function ProfileEducation(props: ProfileEducationProps) {
    let { school, degree, from, to, fieldofstudy, description } = props.education;
  return (
    <div>
        <h3>{school}</h3>
        <p>{<Moment format="YYYY/MM/DD">{from}</Moment>} - {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}</p>
        <p><strong>Degree: </strong>{degree}</p>
        <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
        <p>
            <strong>Description: </strong>{description || 'NA'}
        </p>
    </div>
  )
}

export default ProfileEducation;

import React, { Fragment } from 'react';
import Moment from 'react-moment';

interface ExperienceProps {
    education: any[];
    onDelete: (data: any) => void;
}
function Education(props: ExperienceProps) {
    let experiences = null;
    if (props.education.length) {
        experiences = props.education.map((edu: any) => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> {' - '} { edu.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                </td>
                <td>
                    <button className="btn btn-danger" onClick={(e) => {
                        e.preventDefault();
                        props.onDelete(edu);
                    }}>Delete</button>
                </td>
            </tr>
        ));
    } else {
        experiences = (<tr>
            <td>No Data found</td>
        </tr>);
    }
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

export default Education;

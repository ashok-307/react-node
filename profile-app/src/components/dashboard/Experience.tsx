import React, { Fragment } from 'react'
import Moment from 'react-moment';
interface ExperienceProps {
    experience: any[],
    onDelete: (data: any) => void
}
function Experience(props: ExperienceProps) {
    let experiences = null;
    if (props.experience.length) {
        experiences = props.experience.map((exp: any) => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> {' - '} { exp.to === null ? 'Now' : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                </td>
                <td>
                    <button className="btn btn-danger" onClick={(e) => {
                        e.preventDefault();
                        props.onDelete(exp);
                    }}>Delete</button>
                </td>
            </tr>
        ));
    } else {
        experiences = ( <tr>
            <td>No Data</td>
        </tr>);
    }
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

export default Experience;

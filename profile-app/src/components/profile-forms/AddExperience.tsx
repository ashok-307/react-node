import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import { addExperienceAPI } from '../../store/slices/profile/profile';

function AddExperience() {
    let [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    let [toDateDisable, setToDateDisable] = useState(false);
    let {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = formData;

    let dispatchEvent = useDispatch<any>();
    let navigate = useNavigate();

    let onFormChange = (e: ChangeEvent<any>) => setFormData({...formData, [e.target.name]: e.target.value});
    let onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatchEvent(addExperienceAPI({data: formData})).then((res: any) => {
            if (!res.error) {
                navigate(RouteAPI.Dashboard);
            }
        })
    }
    return (
        <section className="container">
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead"><i className="fa fa-code-fork"></i> Add any developer/programming positions that you have had in the past</p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onFormSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => onFormChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onFormChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" value={location} onChange={e => onFormChange(e)} name="location" />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onFormChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} onChange={e => {
                        setFormData({...formData, current: !current});
                        setToDateDisable(!toDateDisable);
                    }} /> {' '} Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onFormChange(e)} disabled={toDateDisable} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols={30}
                        rows={5}
                        value={description}
                        onChange={e => onFormChange(e)}
                        placeholder="Job Description"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <NavLink className="btn btn-light my-1" to={RouteAPI.Dashboard}>Go Back</NavLink>
            </form>
        </section>
    )
}

export default AddExperience;

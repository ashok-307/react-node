import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import { addEducationAPI } from '../../store/slices/profile/profile';

function AddEducation() {
    let [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    let [toDateDisable, setToDateDisable] = useState(false);
    let {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;
    let dispatchEvent = useDispatch<any>();
    let navigate = useNavigate();
    useEffect(() => {
        // addEducationAPI
    }, []);

    let onFormChange = (e: ChangeEvent<any>) => setFormData({...formData, [e.target.name]: e.target.value});
    let onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatchEvent(addEducationAPI({data: formData})).then((res: any) => {
            if (!res.error) {
                navigate(RouteAPI.Dashboard);
            }
        })
    }
    return (
        <section className="container">
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fa fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onFormSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={(e) => onFormChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={(e) => onFormChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Field Of Study" 
                        name="fieldofstudy" 
                        value={fieldofstudy}
                        onChange={(e) => onFormChange(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input 
                        type="date" 
                        name="from" 
                        value={from}
                        onChange={(e) => onFormChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input 
                            type="checkbox" 
                            name="current" 
                            checked={current}
                            onChange={(e) => {
                                setFormData({...formData, current: !current});
                                setToDateDisable(!toDateDisable);
                            }} 
                        /> Current School or Bootcamp
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input 
                        type="date" 
                        name="to"
                        value={to}
                        onChange={(e) => onFormChange(e)} 
                        disabled={toDateDisable}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols={30}
                        rows={5}
                        placeholder="Program Description"
                        value={description}
                        onChange={(e) => onFormChange(e)} 
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <NavLink className="btn btn-light my-1" to={RouteAPI.Dashboard}>Go Back</NavLink>
            </form>
        </section>
    )
}

export default AddEducation;

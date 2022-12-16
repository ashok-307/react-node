import React, { ChangeEvent, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
import { LoaderService } from '../../shared/services/Loader.service';
import { createProfileAPI } from '../../store/slices/profile/profile';

function CreateProfile() {
    let [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    let [displaySocialInputs, toggleSocialInputs] = useState(false);

    let {
        bio,
        company,
        facebook, 
        githubusername,
        instagram,
        linkedin,
        location,
        skills,
        status,
        twitter,
        website,
        youtube
    } = formData;

    // let { isLoading: profileLoading } = useSelector((state: any) => state.profileReducer);
    let dispatchEvent = useDispatch<any>();
    let navigate = useNavigate();

    let onFormChange = (e: ChangeEvent<any>) => setFormData({...formData, [e.target.name]: e.target.value});

    let onSubmit = (e: any) => {
        e.preventDefault();
        LoaderService.openModel('createProfile1');
        dispatchEvent(createProfileAPI({data: formData, edit: false, history: []})).then((res: any) => {
            LoaderService.closeModel('createProfile1');
            if (!res.error) {
                navigate(RouteAPI.Dashboard);
            }
        });
    }

    return (
        <section className="container">
            <Alert />
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fa fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={(e) => onFormChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => onFormChange(e)} />
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={(e) => onFormChange(e)} />
                    <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onFormChange(e)} />
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e) => onFormChange(e)} />
                    <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={(e) => onFormChange(e)}
                    />
                    <small className="form-text">If you want your latest repos and a Github link, include yourusername</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" value={bio} onChange={(e) => onFormChange(e)} name="bio"></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">Add Social Network Links</button>
                    <span>Optional</span>
                </div>

                {
                    displaySocialInputs ? <Fragment>
                        <div className="form-group social-input">
                            <i className="fa fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e) => onFormChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fa fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => onFormChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fa fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => onFormChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fa fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => onFormChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fa fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => onFormChange(e)} />
                        </div>
                    </Fragment> : ''
                }

                
                <input type="submit" className="btn btn-primary my-1" />
                <NavLink className="btn btn-light my-1" to={RouteAPI.Dashboard}>Go Back</NavLink>
            </form>
        </section>
    )
}

export default CreateProfile;

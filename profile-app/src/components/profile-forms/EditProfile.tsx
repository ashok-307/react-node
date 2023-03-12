import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
import FormControls from '../../shared/modules/Forms/FormControls';
import { LoaderService } from '../../shared/services/Loader.service';
import { useCreateProfileAPIMutation, useGetProfileAPIMutation, } from '../../store/api/profile.api';

function EditProfile() {
    let [displaySocialInputs, toggleSocialInputs] = useState(false);
    let [onGetProfile] = useGetProfileAPIMutation();
    let [onCreateProfile] = useCreateProfileAPIMutation();

    let abortGetProfile: any = null;
    let abortCreateProfile: any = null;

    let { handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
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
        }
    });
    
    let customErrorMessage: any = {
        'skills': {
            'required': 'Skills are required.'
        }
    };


    let statuses: any[] = [
        {
            name: "* Select Professional Status",
            value: "0"
        },
        {
            name: "Developer",
            value: "Developer"
        },
        {
            name: "Junior Developer",
            value: "Junior Developer"
        },
        {
            name: "Senior Developer",
            value: "Senior Developer"
        },
        {
            name: "Manager",
            value: "Manager"
        },
        {
            name: "Student or Learning",
            value: "Student or Learning"
        },
        {
            name: "Instructor",
            value: "Instructor0"
        },
        {
            name: "Intern",
            value: "Intern"
        },
        {
            name: "Other",
            value: "Other"
        },
    ];

    // let dispatchEvent = useDispatch<any>();
    let navigate = useNavigate();

    let getProfile = () => {
        LoaderService.openModel('editProfile2');
        abortGetProfile = onGetProfile();
        abortGetProfile.unwrap().then((res: any) => {
            LoaderService.closeModel('editProfile2');
            setValue('company', res && !res.company ? '' : res.company);
            setValue('website', res && !res.website ? '' : res.website);
            setValue('location', res && !res.location ? '' : res.location);
            setValue('status', res && !res.status ? '' : res.status);
            setValue('skills', res && !res.skills ? '' : res.skills.join(','));
            setValue('githubusername', res && !res.githubusername ? '' : res.githubusername);
            setValue('bio', res && !res.bio ? '' : res.bio);
            setValue('twitter', res && !res.social ? '' : res.social.twitter);
            setValue('facebook', res && !res.social ? '' : res.social.facebook);
            setValue('linkedin', res && !res.social ? '' : res.social.linkedin);
            setValue('youtube', res && !res.social ? '' : res.social.youtube);
            setValue('instagram', res && !res.social ? '' : res.social.instagram);
        }).catch(() => {
            LoaderService.closeModel('editProfile2');
        });
    }

    useEffect(() => {
        // dispatchEvent(getProfileAPI()).then((res: any) => {
        getProfile();
        return () => {
            abortGetProfile && abortGetProfile.abort()
            abortCreateProfile && abortCreateProfile.abort();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let onSubmit = (e: any) => {
        LoaderService.openModel('submitProfile1', {appendTo: 'inline', appendToElement: '.load-edit-profile'});
        abortCreateProfile = onCreateProfile({data: e, isEdit: true});
        abortCreateProfile.unwrap().then(() => {
            LoaderService.closeModel('submitProfile1');
            navigate(RouteAPI.Dashboard);
        }).catch(() => {
            LoaderService.closeModel('submitProfile1');
        });
        // dispatchEvent(createProfileAPI({data: e, edit: true, history: []})).then((res: any) => {
        //     if (!res.error) {
        //         navigate(RouteAPI.Dashboard);
        //     }
        // });
    };

    return (
        <section className="container">
            <Alert />
            <h1 className="large text-primary">
                Edit Profile
            </h1>
            <p className="lead">
                <i className="fa fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <FormControls
                        name="status" 
                        elementId="status"
                        control={control} 
                        elementType="select" 
                        label="Status" 
                        selectOptions={statuses}
                        optionIdKey="value"
                        optionNameKey="name"
                        rules={{required: true}}
                        isError={errors.status ? {
                            type: errors.status.type,
                            message: (customErrorMessage['status'] && customErrorMessage['status'][errors.status.type]) ? customErrorMessage['status'][errors.status.type] : errors.status.message
                        } : undefined}
                    />
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <FormControls 
                        name="company" 
                        elementId="company"
                        control={control} 
                        label="Company" 
                        isError={errors.company ? {
                            type: errors.company.type, 
                            message: customErrorMessage['company'] && customErrorMessage['company'][errors.company.type] ? customErrorMessage['company'][errors.company.type] : errors.company.message
                        } : undefined}
                    />
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <FormControls 
                        name="website" 
                        elementId="website"
                        control={control} 
                        label="Website" 
                        isError={errors.website ? {
                            type: errors.website.type, 
                            message: customErrorMessage['website'] && customErrorMessage['website'][errors.website.type] ? customErrorMessage['website'][errors.website.type] : errors.website.message
                        } : undefined}
                    />
                    <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <FormControls 
                        name="location" 
                        elementId="location"
                        control={control} 
                        label="Location" 
                        isError={errors.location ? {
                            type: errors.location.type, 
                            message: customErrorMessage['location'] && customErrorMessage['location'][errors.location.type] ? customErrorMessage['location'][errors.location.type] : errors.location.message
                        } : undefined}
                    />
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <FormControls 
                        name="skills" 
                        elementId="skills"
                        control={control} 
                        label="Skills" 
                        rules={{required: true}}
                        isError={errors.skills ? {
                            type: errors.skills.type, 
                            message: customErrorMessage['skills'] && customErrorMessage['skills'][errors.skills.type] ? customErrorMessage['skills'][errors.skills.type] : errors.skills.message
                        } : undefined}
                    />
                    <small className="form-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <FormControls
                        name="githubusername"
                        elementId="githubusername"
                        control={control} 
                        label="Github Username" 
                        isError={errors.githubusername ? {
                            type: errors.githubusername.type, 
                            message: customErrorMessage['githubusername'] && customErrorMessage['githubusername'][errors.githubusername.type] ? customErrorMessage['githubusername'][errors.githubusername.type] : errors.githubusername.message
                        } : undefined}
                    />
                    <small className="form-text">If you want your latest repos and a Github link, include yourusername</small>
                </div>
                <div className="form-group">
                    <FormControls 
                        name="bio" 
                        elementId="bio"
                        control={control} 
                        elementType="textarea" 
                        label="A short bio of yourself"
                        isError={errors.bio ? {
                            type: errors.bio.type, 
                            message: customErrorMessage['bio'] && customErrorMessage['bio'][errors.bio.type] ? customErrorMessage['bio'][errors.bio.type] : errors.bio.message
                        } : undefined}
                    />
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
                            <FormControls
                                name="twitter" 
                                elementId="twitter"
                                elementType="input" 
                                control={control} 
                                label="Twitter URL" 
                                isError={errors.twitter ? {
                                    type: errors.twitter.type, 
                                    message: customErrorMessage['twitter'] && customErrorMessage['twitter'][errors.twitter.type] ? customErrorMessage['twitter'][errors.twitter.type] : errors.twitter.message
                                } : undefined}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fa fa-facebook fa-2x"></i>
                            <FormControls
                                name="facebook" 
                                elementId="facebook"
                                elementType="input" 
                                control={control} 
                                label="Facebook URL" 
                                isError={errors.facebook ? {
                                    type: errors.facebook.type, 
                                    message: customErrorMessage['facebook'] && customErrorMessage['facebook'][errors.facebook.type] ? customErrorMessage['facebook'][errors.facebook.type] : errors.facebook.message
                                } : undefined}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fa fa-youtube fa-2x"></i>
                            <FormControls
                                name="youtube" 
                                elementId="youtube"
                                elementType="input" 
                                control={control} 
                                label="YouTube URL" 
                                isError={errors.youtube ? {
                                    type: errors.youtube.type, 
                                    message: customErrorMessage['youtube'] && customErrorMessage['youtube'][errors.youtube.type] ? customErrorMessage['youtube'][errors.youtube.type] : errors.youtube.message
                                } : undefined}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fa fa-linkedin fa-2x"></i>
                            <FormControls
                                name="linkedin" 
                                elementId="linkedin"
                                elementType="input" 
                                control={control} 
                                label="Linkedin URL" 
                                isError={errors.linkedin ? {
                                    type: errors.linkedin.type, 
                                    message: customErrorMessage['linkedin'] && customErrorMessage['linkedin'][errors.linkedin.type] ? customErrorMessage['linkedin'][errors.linkedin.type] : errors.linkedin.message
                                } : undefined}
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fa fa-instagram fa-2x"></i>
                            <FormControls
                                name="instagram" 
                                elementId="instagram"
                                elementType="input" 
                                control={control} 
                                label="Instagram URL" 
                                isError={errors.instagram ? {
                                    type: errors.instagram.type, 
                                    message: customErrorMessage['instagram'] && customErrorMessage['instagram'][errors.instagram.type] ? customErrorMessage['instagram'][errors.instagram.type] : errors.instagram.message
                                } : undefined}
                            />
                        </div>
                    </Fragment> : ''
                }

                
                {/* <input type="submit" className="btn btn-primary my-1" /> */}
                <button className="btn btn-primary my-1">Submit <span className="load load-edit-profile"></span></button>
                <NavLink className="btn btn-light my-1" to={RouteAPI.Dashboard}>Go Back</NavLink>
            </form>
        </section>
    )
}

export default EditProfile;

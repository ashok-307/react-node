import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import { LoaderService } from '../../shared/services/Loader.service';
import { useGetProfileByUserIdMutation } from '../../store/api/profile.api';
// import { getProfileByUserIdAPI } from '../../store/slices/profile/profile';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
// import ProfileGitHub from './ProfileGitHub';
import ProfileTop from './ProfileTop';

function Profile() {
    let { profile } = useSelector((state: any) => state.profileReducer);
    let { isAuthenticated, user } = useSelector((state: any) => state.authReducer);
    let params = useParams();

    let [onGetProfileByUserId] = useGetProfileByUserIdMutation();
    let abortGetProfileByUserID: any = null;

    useEffect(() => {
        LoaderService.openModel('profile1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        abortGetProfileByUserID = onGetProfileByUserId(params.id || '');
        abortGetProfileByUserID.unwrap().then(() => {
            LoaderService.closeModel('profile1');
        }).catch(() => {
            LoaderService.closeModel('profile1');
        });

        return () => {
            abortGetProfileByUserID && abortGetProfileByUserID.abort();
        }
        // dispatchEvent(getProfileByUserIdAPI(`${params.id}`)).then(() => {
        //     LoaderService.closeModel('profile1');
        // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <div className="container">
            {!profile ? (<p>No Profile Found</p>) : (
                <Fragment>
                    <NavLink to={RouteAPI.Profiles} className="btn btn-light">Back to Profiles</NavLink>
                    {isAuthenticated && profile && user.id === profile.user._id && (
                        <NavLink to={RouteAPI.EditProfile} className="btn btn-dark">Edit Profile</NavLink>
                    )}
                    <div className="profile-grid my-1">
                        {profile && (
                            <Fragment>
                                <ProfileTop profile={profile} />
                                <ProfileAbout profile={profile} />
                                <div className="profile-exp bg-white p-2">
                                    <h2 className="text-primary">Experience</h2>
                                    {profile.experience.length > 0 ? (
                                        <Fragment>
                                            {profile.experience.map((exp: any) => (
                                                <ProfileExperience key={exp._id} experience={exp} />
                                            ))}
                                        </Fragment>
                                    ) : (
                                        <h4>No Experience Credentials</h4>
                                    )}
                                </div>
                                <div className="profile-edu bg-white p-2">
                                    <h2 className="text-primary">Education</h2>
                                    {
                                        profile.education.length > 0 ? (
                                            <Fragment>
                                                {profile.education.map((edu: any) => (
                                                    <ProfileEducation key={edu._id} education={edu} />
                                                ))}
                                            </Fragment>
                                        ) : (
                                            <h4>No Education Credentials</h4>
                                        )
                                    }
                                </div>
                                {profile && profile.githubusername && (
                                    // <ProfileGitHub username={profile.githubusername} />
                                    <></>
                                )}
                            </Fragment>
                        )}
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default Profile;

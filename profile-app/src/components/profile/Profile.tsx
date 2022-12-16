import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import { LoaderService } from '../../shared/services/Loader.service';
import { getProfileByUserIdAPI } from '../../store/slices/profile/profile';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
// import ProfileGitHub from './ProfileGitHub';
import ProfileTop from './ProfileTop';

function Profile() {
    let { profile, isLoading: profileLoading } = useSelector((state: any) => state.profileReducer);
    let { isAuthenticated, user } = useSelector((state: any) => state.authReducer);
    let dispatchEvent = useDispatch<any>();
    let params = useParams();

    useEffect(() => {
        LoaderService.openModel('profile1');
        dispatchEvent(getProfileByUserIdAPI(`${params.id}`)).then(() => {
            LoaderService.closeModel('profile1');
        });
    }, [dispatchEvent, params]);
  return (
    <div className="container">
      {profileLoading ? 'Loading...' : (
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

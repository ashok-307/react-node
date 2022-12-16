import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderService } from '../../shared/services/Loader.service';
import { getProfilesAPI } from '../../store/slices/profile/profile';
import ProfileItem from './ProfileItem';

function Profiles() {
  let { profiles } = useSelector((state: any) => state.profileReducer);
  let dispatchEvent = useDispatch<any>();

  useEffect(() => {
    LoaderService.openModel('profiles1');
    dispatchEvent(getProfilesAPI()).then(() => {
      LoaderService.closeModel('profiles1');
    });
  }, [dispatchEvent]);
  return (
    <div className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fa fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
        profiles.map((profile:any) => (
          <ProfileItem key={profile._id} profile={profile} />
        ))) : (
          <h4>No Profiles Found...</h4>
        )}
      </div>
    </div>
  )
}

export default Profiles;

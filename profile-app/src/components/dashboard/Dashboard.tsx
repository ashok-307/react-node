import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
import ConfirmDialog from '../../shared/models/ConfirmDialog';
import { LoaderService } from '../../shared/services/Loader.service';
import { logoutUserAPI } from '../../store/slices/auth/auth';
import { deleteAccountAPI, deleteEducationAPI, deleteExperienceAPI, getProfileAPI } from '../../store/slices/profile/profile';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

function Dashboard() {
  let { isLoading, profile } = useSelector((state: any) => state.profileReducer);
  let { user } = useSelector((state: any) => state.authReducer);
  let dispatchEvent = useDispatch<any>();
  let navigate = useNavigate();
  // Experience States
  let [openDialog, setDialogState] = useState(false);
  let [experienceId, setExperienceId] = useState('');
  // Education States
  let [openDialog2, setDialogState2] = useState(false);
  let [educationId, setEducationId] = useState('');
  // Account States
  let [openDialog3, setDialogState3] = useState(false);

  useEffect(() => {
    LoaderService.openModel('load2');
    dispatchEvent(getProfileAPI()).then(() => {
      LoaderService.closeModel('load2');
    });
  },[dispatchEvent]);

  let onDeleteExperience = (data: any) => {
    setDialogState(true);
    setExperienceId(data._id);
  }

  let onDialogClose = (value: any) => {
    setDialogState(false);
    if (value) {
      LoaderService.openModel('load4');
      dispatchEvent(deleteExperienceAPI(experienceId)).then((res: any) => {
        if (!res.error) {
          dispatchEvent(getProfileAPI()).then(() => {
            LoaderService.closeModel('load4');
          });
        }
      });
    }
  }

  let onDeleteEducation = (data: any) => {
    setDialogState2(true);
    setEducationId(data._id);
  }
  
  let onDialogClose2 = (value: any) => {
    setDialogState2(false);
    if (value) {
      LoaderService.openModel('load5');
      dispatchEvent(deleteEducationAPI(educationId)).then((res: any) => {
        if (!res.error) {
          dispatchEvent(getProfileAPI()).then(() => {
            LoaderService.closeModel('load5');
          });
        }
      });
    }
  }
  let onDeleteAccount = (e: any) => {
    e.preventDefault();
    setDialogState3(true);
  }

  let onDialogClose3 = (value: any) => {
    setDialogState3(false);
    if (value) {
      LoaderService.openModel('load3');
      dispatchEvent(deleteAccountAPI()).then((res: any) => {
        LoaderService.closeModel('load3');
        if (!res.error) {
          dispatchEvent(logoutUserAPI()).then(() => {
            navigate(RouteAPI.Login);
          });
        }
      });
    }
  }

  let openSpinner = (e: any) => {
    e.preventDefault();
    LoaderService.openModel('load1', {appendTo: 'inline', appendToElement: '.loader .load'});
    // LoaderService.openModel('load1');
    setTimeout(() => {
      LoaderService.closeModel('load1');
    }, 2000);
  }

  return (
    <Fragment>
      <section className="container">
        <Alert />
        {isLoading && profile == null ? null : <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fa fa-user"></i> Welcome { user && user.name }
          </p>
          { profile != null ? 
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} onDelete={onDeleteExperience}></Experience>
            <Education education={profile.education} onDelete={onDeleteEducation}></Education>
            <div className="my-2">
              <button className="btn btn-danger" onClick={(e) => onDeleteAccount(e)}><i className="fa fa-user-plus"></i>{' '}Delete My Account</button>
            </div>
            <ConfirmDialog open={openDialog} onClose={onDialogClose} title="Are you sure, you want to delete the experience ?. Click Yes to delete."></ConfirmDialog>
            <ConfirmDialog open={openDialog2} onClose={onDialogClose2} title="Are you sure, you want to delete the education ?. Click Yes to delete."></ConfirmDialog>
            <ConfirmDialog open={openDialog3} onClose={onDialogClose3} title="Are you sure, you want to delete the account ?. Click Yes to delete."></ConfirmDialog>
          </Fragment> : 
          <Fragment>
            <p>You have not yet setup a profile, please add some info.</p>
            <NavLink to={RouteAPI.CreateProfile} className="btn btn-primary my-1">Create Profile</NavLink>
          </Fragment> }
        </Fragment>}
        <button className="btn btn-primary loader" onClick={(e) => openSpinner(e)}>Open Spinner <span className="load"></span></button>
      </section>
    </Fragment>
  )
}

export default Dashboard;

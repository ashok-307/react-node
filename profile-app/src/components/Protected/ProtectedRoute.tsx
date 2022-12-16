import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { StorageAPI } from '../../core/constants/common.api';
import CommonService from '../../shared/services/common.service';
import { StorageService } from '../../shared/services/storage.service';

function ProtectedRoute(props: any) {
  let token = StorageService.getLocal(StorageAPI.Login_User_Token);
  const location = useLocation();

  if(token) {
    if(location.pathname.indexOf('/login') > -1) {
      return <Navigate to={CommonService.currentPrevUrl.prev || '/dashboard'} />
    }
    return <props.component/>
  } else {
    if(location.pathname.indexOf('/login') > -1) {
      return <props.component/>
    }
    return <Navigate to={'/login'} />
  }
}

export default ProtectedRoute;

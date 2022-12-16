import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootStoreModel } from '../../store/store.model';

export interface AuthGuardProps {
    children: JSX.Element
}

function AuthGuard(props: AuthGuardProps) {
    let element = props.children;
    // let {isAuthenticated} = useSelector<RootStoreModel>((state: RootStoreModel) => state.authReducer);
    // if (isAuthenticated) {
    //     element
    // }
    return (element);
}

export default AuthGuard;

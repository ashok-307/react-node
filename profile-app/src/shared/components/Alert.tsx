import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootStoreModel } from '../../store/store.model';

function Alert() {
    const alertArray = useSelector<any>((state: RootStoreModel) => state.alertReducer);

    return (
        <Fragment>
            {(alertArray !== null) && Array.isArray(alertArray) && alertArray.length > 0 ? alertArray.map((alert: any) => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.message}</div>
            )) : null}
        </Fragment>
    );
}

export default Alert;

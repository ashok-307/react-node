import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
import FormControls from '../../shared/modules/Forms/FormControls';
import { LoaderService } from '../../shared/services/Loader.service';
import { useAddExperienceAPIMutation } from '../../store/api/profile.api';
// import { addExperienceAPI } from '../../store/slices/profile/profile';

function AddExperience() {
    let [toDateDisable, setToDateDisable] = useState(false);
    let [onAddExperience] = useAddExperienceAPIMutation();
    let abortAddExperience: any = null;

    let { handleSubmit, control, formState: {errors}, setValue, getValues} = useForm({
        defaultValues: {
            title: '',
            company: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: ''
        }
    });
    
    let customErrorMessage: any = {};

    // let dispatchEvent = useDispatch<any>();
    let navigate = useNavigate();

    let onFormSubmit = (e: any) => {
        LoaderService.openModel('addExperience1', {appendTo: 'inline', appendToElement: '.load-experience'});
        abortAddExperience = onAddExperience(e);
        abortAddExperience.unwrap().then(() => {
            LoaderService.closeModel('addExperience1');
            navigate(RouteAPI.Dashboard);
        }).catch(() => {
            LoaderService.closeModel('addExperience1');
        });
        // dispatchEvent(addExperienceAPI({data: e})).then((res: any) => {
        //     if (!res.error) {
        //         navigate(RouteAPI.Dashboard);
        //     }
        // })
    };

    useEffect(() => () => {
        abortAddExperience && abortAddExperience.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container">
            <Alert />
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead"><i className="fa fa-code-fork"></i> Add any developer/programming positions that you have had in the past</p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="form-group">
                    <FormControls
                        name="title" 
                        elementId="title"
                        control={control} 
                        label="Job Title *" 
                        rules={{ required: true }}
                        isError={errors.title ? {
                            type: errors.title.type, 
                            message: customErrorMessage['title'] && customErrorMessage['title'][errors.title.type] ? customErrorMessage['title'][errors.title.type] : errors.title.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls
                        name="company" 
                        elementId="company"
                        control={control} 
                        label="Company *" 
                        rules={{ required: true }}
                        isError={errors.company ? {
                            type: errors.company.type, 
                            message: customErrorMessage['company'] && customErrorMessage['company'][errors.company.type] ? customErrorMessage['company'][errors.company.type] : errors.company.message
                        } : undefined}
                    />
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
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <FormControls
                        name="from" 
                        elementId="from"
                        control={control} 
                        inputType="datetime-local"
                        label="From" 
                        isError={errors.from ? {
                            type: errors.from.type, 
                            message: customErrorMessage['from'] && customErrorMessage['from'][errors.from.type] ? customErrorMessage['from'][errors.from.type] : errors.from.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="current" 
                        elementId="current"
                        control={control} 
                        elementType="checkbox" 
                        customLabel="Current Job"
                        onControlChange={(v) => {
                            setValue('current', !getValues().current);
                            setToDateDisable(!toDateDisable);
                            return v.target.checked;
                        }}
                        isError={errors.current ? {
                            type: errors.current.type, 
                            message: customErrorMessage['current'] && customErrorMessage['current'][errors.current.type] ? customErrorMessage['current'][errors.current.type] : errors.current.message
                        } : undefined}  
                    />
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <FormControls
                        name="to" 
                        elementId="to"
                        control={control} 
                        inputType="datetime-local"
                        label="To" 
                        disabled={toDateDisable}
                        isError={errors.to ? {
                            type: errors.to.type, 
                            message: customErrorMessage['to'] && customErrorMessage['to'][errors.to.type] ? customErrorMessage['to'][errors.to.type] : errors.to.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="description" 
                        elementId="description"
                        control={control} 
                        elementType="textarea" 
                        label="Job Description"
                        isError={errors.description ? {
                            type: errors.description.type, 
                            message: customErrorMessage['description'] && customErrorMessage['description'][errors.description.type] ? customErrorMessage['description'][errors.description.type] : errors.description.message
                        } : undefined}
                    />
                </div>
                {/* <input type="submit" className="btn btn-primary my-1" /> */}
                <button className="btn btn-primary my-1">Submit <span className="load load-experience"></span></button>
                <NavLink className="btn btn-light my-1" to={RouteAPI.Dashboard}>Go Back</NavLink>
            </form>
        </section>
    )
}

export default AddExperience;

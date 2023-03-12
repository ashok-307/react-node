import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import FormControls from '../../shared/modules/Forms/FormControls';
import { LoaderService } from '../../shared/services/Loader.service';
import { useAddEducationAPIMutation } from '../../store/api/profile.api';
// import { addEducationAPI } from '../../store/slices/profile/profile';

function AddEducation() {

    let [toDateDisable, setToDateDisable] = useState(false);
    let [onAddEducation] = useAddEducationAPIMutation();
    let abortAddEducation: any = null;

    let { handleSubmit, control, formState: {errors}, setValue, getValues} = useForm({
        defaultValues: {
            school: '',
            degree: '',
            fieldofstudy: '',
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
        LoaderService.openModel('addEducation1', {appendTo: 'inline', appendToElement: '.load-education'});
        abortAddEducation = onAddEducation(e);
        abortAddEducation.unwrap().then(() => {
            LoaderService.closeModel('addEducation1');
            navigate(RouteAPI.Dashboard);
        }).catch(() => {
            LoaderService.closeModel('addEducation1');
        })
        // dispatchEvent(addEducationAPI({data: e})).then((res: any) => {
        //     if (!res.error) {
        //         navigate(RouteAPI.Dashboard);
        //     }
        // })
    };

    useEffect(() => () => {
        abortAddEducation && abortAddEducation.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="container">
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fa fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="form-group">
                    <FormControls
                        name="school" 
                        elementId="school"
                        control={control} 
                        label="School or Bootcamp *" 
                        rules={{ required: true }}
                        isError={errors.school ? {
                            type: errors.school.type, 
                            message: customErrorMessage['school'] && customErrorMessage['school'][errors.school.type] ? customErrorMessage['school'][errors.school.type] : errors.school.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls
                        name="degree" 
                        elementId="degree"
                        control={control} 
                        label="Degree or Certificate *" 
                        rules={{ required: true }}
                        isError={errors.degree ? {
                            type: errors.degree.type, 
                            message: customErrorMessage['degree'] && customErrorMessage['degree'][errors.degree.type] ? customErrorMessage['degree'][errors.degree.type] : errors.degree.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls
                        name="fieldofstudy" 
                        elementId="fieldofstudy"
                        control={control} 
                        label="Field Of Study" 
                        isError={errors.fieldofstudy ? {
                            type: errors.fieldofstudy.type, 
                            message: customErrorMessage['fieldofstudy'] && customErrorMessage['fieldofstudy'][errors.fieldofstudy.type] ? customErrorMessage['fieldofstudy'][errors.fieldofstudy.type] : errors.fieldofstudy.message
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
                        rules={{ required: true }}
                        isError={errors.from ? {
                            type: errors.from.type, 
                            message: customErrorMessage['from'] && customErrorMessage['from'][errors.from.type] ? customErrorMessage['from'][errors.from.type] : errors.from.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <FormControls 
                            name="current" 
                            elementId="current"
                            control={control} 
                            elementType="checkbox" 
                            customLabel="Current School or Bootcamp"
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
                    </p>
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
                        label="Program Description"
                        isError={errors.description ? {
                            type: errors.description.type, 
                            message: customErrorMessage['description'] && customErrorMessage['description'][errors.description.type] ? customErrorMessage['description'][errors.description.type] : errors.description.message
                        } : undefined}
                    />
                </div>
                {/* <input type="submit" className="btn btn-primary my-1" /> */}
                <button className="btn btn-primary my-1">Submit <span className="load load-education"></span></button>
                <NavLink className="btn btn-light my-1" to={RouteAPI.Dashboard}>Go Back</NavLink>
            </form>
        </section>
    )
}

export default AddEducation;

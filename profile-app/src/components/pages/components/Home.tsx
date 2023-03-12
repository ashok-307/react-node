import React from 'react';
import { useForm } from 'react-hook-form';
import { RegExpression } from '../../../shared/modules/Forms/Form.constants';
import FormControls from '../../../shared/modules/Forms/FormControls';

function Home() {
    let gendersData = [
        {
            value: 'male',
            label: 'Male'
        },
        {
            value: 'female',
            label: 'Female'
        }
    ];

    let { handleSubmit, control, watch, formState: {errors} } = useForm({
        // mode: 'onSubmit',
        defaultValues: {
            name: '', // text - Done
            age: '', // number - Done
            email: '', // email - Done
            password: '', // password - Done
            gender: '', // radio - Done
            isAdmin: false, // checkbox - Done
            role: '', // select dropdown - Done
            skills: [], // multi-select dropdown - Done
            date: '', // date-time picker
            description: '', // textarea - Done
            attachment: '', // file upload
        },
    });

    let customErrorMessage: any = {
        'name': {
            'required': 'Name is required.',
            'minLength': 'Name should have minimum 3 characters.',
            'maxLength': 'Name should have maximum 8 characters.'
        },
        'gender': {
            'required': 'Gender is required.'
        },
        'age': {
            'required': 'Age is required.',
            'minLength': 'Age should have minimum 1 digit.',
            'maxLength': 'Age should have maximum 3 digit.'
        },
        'email': {
            'required': 'Email is required.',
            'pattern': 'Email is invalid.',
        },
        'password': {
            'required': 'Password is required.',
            'minLength': 'Password must contain minimum 5 characters',
            'pattern': 'Password must contain minimum 5 characters'
        },
        'skills': {
            'required': 'Skills are required.'
        }
    }

    // let todayDate  = new Date().toISOString();
    // let minDate = todayDate.slice(0,todayDate.lastIndexOf(":"));
    let roles = [
        {
            name: 'Senior Developer',
            id: '123'
        },
        {
            name: 'Junior Developer',
            id: '345'
        },
        {
            name: 'Developer',
            id: '456'
        },
        {
            name: 'Senior',
            id: '678'
        }
    ];

    watch('name');

    let onSubmit = (e: any) => {
        console.log('Form :', e);
    }

    let onErrorSubmit = (e: any) => {
        console.log(e)
    }

    return (
        <div className="Home">
            <form className="form" onSubmit={handleSubmit(onSubmit, onErrorSubmit)} >
                <div className="form-group">
                    <FormControls
                        name="name" 
                        elementId="name"
                        elementType="input" 
                        control={control} 
                        label="Name" 
                        rules={{required: true, minLength: 3, maxLength: 250}} 
                        isError={errors.name ? {
                            type: errors.name.type, 
                            message: customErrorMessage['name'] && customErrorMessage['name'][errors.name.type] ? customErrorMessage['name'][errors.name.type] : errors.name.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="age" 
                        elementId="age"
                        inputType="number" 
                        control={control} 
                        label="Age" 
                        rules={{required: true, minLength: 1, maxLength: 3}} 
                        isError={errors.age ? {
                            type: errors.age.type, 
                            message: customErrorMessage['age'] && customErrorMessage['age'][errors.age.type] ? customErrorMessage['age'][errors.age.type] : errors.age.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="email" 
                        elementId="email"
                        inputType="email" 
                        control={control} 
                        label="Email" 
                        rules={{required: true, pattern: RegExpression.Email}} 
                        isError={errors.email ? {
                            type: errors.email.type, 
                            message: customErrorMessage['email'] && customErrorMessage['email'][errors.email.type] ? customErrorMessage['email'][errors.email.type] : errors.email.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="password" 
                        inputType="password" 
                        elementId="password"
                        control={control} 
                        label="Password" 
                        rules={{required: true, minLength: 5}} 
                        isError={errors.password ? {
                            type: errors.password.type, 
                            message: customErrorMessage['password'] && customErrorMessage['password'][errors.password.type] ? customErrorMessage['password'][errors.password.type] : errors.password.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="gender" 
                        elementId="gender"
                        control={control} 
                        elementType="radio" 
                        label="Gender" 
                        customLabel="Gender"
                        radioData={{ name: 'gender', row: true, data: gendersData }}
                        rules={{required: true}}
                        isError={errors.gender ? {
                            type: errors.gender.type,
                            message: customErrorMessage['gender'] && customErrorMessage['gender'][errors.gender.type] ? customErrorMessage['gender'][errors.gender.type] : errors.gender.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="role" 
                        elementId="role"
                        control={control} 
                        elementType="select" 
                        label="Role" 
                        selectOptions={roles}
                        optionIdKey="id"
                        optionNameKey="name"
                        rules={{required: true}}
                        isError={errors.role ? {
                            type: errors.role.type,
                            message: (customErrorMessage['role'] && customErrorMessage['role'][errors.role.type]) ? customErrorMessage['role'][errors.role.type] : errors.role.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="skills" 
                        elementId="skills"
                        control={control}
                        elementType="multi-select" 
                        label="Skills" 
                        selectOptions={roles}
                        optionIdKey="id"
                        optionNameKey="name"
                        rules={{required: true}}
                        isError={errors.skills ? {
                            type: errors.skills.type,
                            message: customErrorMessage['skills'] && customErrorMessage['skills'][(errors.skills && errors.skills.type) ? errors.skills.type : 'required'] ? customErrorMessage['skills'][(errors.skills && errors.skills.type) ? errors.skills.type : 'required'] : errors.skills.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="isAdmin" 
                        elementId="isAdmin"
                        control={control} 
                        elementType="checkbox" 
                        customLabel="Admin"
                        isError={errors.isAdmin ? {
                            type: errors.isAdmin.type, 
                            message: customErrorMessage['isAdmin'] && customErrorMessage['isAdmin'][errors.isAdmin.type] ? customErrorMessage['isAdmin'][errors.isAdmin.type] : errors.isAdmin.message
                        } : undefined}  
                    />
                </div>
                <div className="form-group">
                    <FormControls 
                        name="description" 
                        elementId="description"
                        control={control} 
                        elementType="textarea" 
                        label="Description"
                        rules={{ required: true }}
                        isError={errors.description ? {
                            type: errors.description.type, 
                            message: customErrorMessage['description'] && customErrorMessage['description'][errors.description.type] ? customErrorMessage['description'][errors.description.type] : errors.description.message
                        } : undefined}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Submit <span className="load"></span></button>
                </div>
            </form>
        </div>
    )
}

export default Home;

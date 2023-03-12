import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
import FormControls from '../../shared/modules/Forms/FormControls';
import { LoaderService } from '../../shared/services/Loader.service';
import { useAddPostAPIMutation } from '../../store/api/post.api';
// import { addPostAPI } from '../../store/slices/post/post';

function PostForm() {
    // let dispatchEvent = useDispatch<any>();
    let [onAddPost] = useAddPostAPIMutation();
    let abortAddPost: any = null;

    let { handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            text: '',
        }
    });

    let addPost = (e: any) => {
        LoaderService.openModel('addPost1', {appendTo: 'inline', appendToElement: '.load2'});
        abortAddPost = onAddPost(e);
        abortAddPost.unwrap().then(() => {
            LoaderService.closeModel('addPost1');
            setValue('text', '');
        }).catch(() => {
            LoaderService.closeModel('addPost1');
        });
        // dispatchEvent(addPostAPI(e)).then(() => {
        //     LoaderService.closeModel('addPost1');
        //     setValue('text', '');
        // });
    }

    useEffect(() => {
        return () => {
            abortAddPost && abortAddPost.abort();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit(addPost)}>
                <FormControls
                    name="text" 
                    elementId="text"
                    control={control} 
                    elementType="textarea" 
                    label="Post"
                    rules={{ required: true }}
                    isError={errors.text ? {
                        type: errors.text.type, 
                        message: errors.text.message
                    } : undefined}
                />
                <button type="submit" className="btn btn-dark my-1">Submit <span className="load load2"></span></button>
            </form>
        </div>
    )
}

export default PostForm;

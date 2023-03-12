import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
import FormControls from '../../shared/modules/Forms/FormControls';
import { LoaderService } from '../../shared/services/Loader.service';
import { useAddCommentAPIMutation } from '../../store/api/post.api';
// import { addCommentAPI } from '../../store/slices/post/post';

interface CommentFormProps {
    postId: string;
}

function CommentForm(props: CommentFormProps) {
    // let dispatchEvent = useDispatch<any>();
    let [onAddCommentAPI] = useAddCommentAPIMutation();
    let abortAddComment: any = null;
    
    let { handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            text: '',
        }
    });

    let onAddComment = (e: any) => {
        LoaderService.openModel('addComment1', {appendTo: 'inline', appendToElement: '.load3'});
        abortAddComment = onAddCommentAPI({ data: e, postId: props.postId});
        abortAddComment.unwrap().then(() => {
            setValue('text', '');
            LoaderService.closeModel('addComment1');
        }).catch(() => {
            LoaderService.closeModel('addComment1');
        })
        // dispatchEvent(addCommentAPI({ data: e, postId: props.postId})).then(() => {
        //     LoaderService.closeModel('addComment1');
        //     setValue('text', '');
        // });
    };

    useEffect(() => () => {
        abortAddComment && abortAddComment.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave a Comment</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit(onAddComment)}>
                <FormControls
                    name="text" 
                    elementId="text"
                    control={control} 
                    elementType="textarea" 
                    label="Comment"
                    rules={{ required: true }}
                    isError={errors.text ? {
                        type: errors.text.type, 
                        message: errors.text.message
                    } : undefined}
                />
                <button type="submit" className="btn btn-dark my-1">Submit <span className="load load3"></span></button>
            </form>
        </div>
    )
}

export default CommentForm;

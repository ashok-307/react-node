import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoaderService } from '../../shared/services/Loader.service';
import { addCommentAPI } from '../../store/slices/post/post';

interface CommentFormProps {
    postId: string;
}

function CommentForm(props: CommentFormProps) {
    let [text, setText] = useState('');
    let dispatchEvent = useDispatch<any>();
    
    let onAddComment = (e: any) => {
        e.preventDefault();
        LoaderService.openModel('addComment1', {appendTo: 'inline', appendToElement: '.load3'});
        dispatchEvent(addCommentAPI({ data: {text}, postId: props.postId})).then(() => {
            LoaderService.closeModel('addComment1');
            setText('');
        })
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Leave a Comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => onAddComment(e)}>
                <textarea
                    name="text"
                    cols={30}
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Create a post"
                    required
                ></textarea>
                <button type="submit" className="btn btn-dark my-1">Submit <span className="load load3"></span></button>
            </form>
        </div>
    )
}

export default CommentForm;

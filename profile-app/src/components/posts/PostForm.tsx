import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { LoaderService } from '../../shared/services/Loader.service';
import { addPostAPI } from '../../store/slices/post/post';

function PostForm() {
    let dispatchEvent = useDispatch<any>();
    let [text, setText] = useState('');

    let addPost = (e: any) => {
        e.preventDefault();
        LoaderService.openModel('addPost1', {appendTo: 'inline', appendToElement: '.load2'});
        dispatchEvent(addPostAPI({ text })).then((res: any) => {
            LoaderService.closeModel('addPost1');
            setText('');
        });
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => addPost(e)}>
                <textarea
                    name="text"
                    cols={30}
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Create a post"
                    required
                ></textarea>
                <button type="submit" className="btn btn-dark my-1">Submit <span className="load load2"></span></button>
            </form>
        </div>
    )
}

export default PostForm;

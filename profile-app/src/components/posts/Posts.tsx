import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../shared/components/Alert';
import { LoaderService } from '../../shared/services/Loader.service';
import { getPostsAPI } from '../../store/slices/post/post';
import PostForm from './PostForm';
import PostItem from './PostItem';

function Posts() {
    let dispatchEvent = useDispatch<any>();
    let { posts } = useSelector((state: any) => state.postReducer);

    let getPosts = () => {
        LoaderService.openModel('posts1');
        dispatchEvent(getPostsAPI()).then(() => {
            LoaderService.closeModel('posts1');
        });
    }
    useEffect(() => {
        getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <section className="container">
            <Alert />
            <h1 className="large text-primary">Posts</h1>
            <p className="lead"><i className="fa fa-user"></i> Welcome to the community!</p>
            {/* Post Form */}
            <PostForm />
            <div className="posts">
                {
                    posts.length > 0 ? (
                        <Fragment>
                            {posts.map((post: any) => (
                                <PostItem key={post._id} post={post} isAction={true} />
                            ))}
                        </Fragment>
                    ) : (
                        <h4>No Posts Found</h4>
                    )
                }
            </div>
        </section>
    )
}

export default Posts;

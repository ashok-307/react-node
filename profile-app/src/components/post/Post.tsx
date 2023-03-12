import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import Alert from '../../shared/components/Alert';
// import { LoaderService } from '../../shared/services/Loader.service';
import { useGetPostAPIMutation } from '../../store/api/post.api';
// import { getPostAPI } from '../../store/slices/post/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

function Post() {
    // let dispatchEvent = useDispatch<any>();
    let { post } = useSelector((state: any) => state.postReducer);
    let params: any = useParams();
    let [onGetPost] = useGetPostAPIMutation();
    let abortGetPost: any = null;

    let getPost = () => {
        // LoaderService.openModel('getPost1');
        abortGetPost = onGetPost(params.postId);
        abortGetPost.unwrap().then(() => {
            // LoaderService.closeModel('getPost1');
        }).catch(() => {
            // LoaderService.closeModel('getPost1');
        });
        // dispatchEvent(getPostAPI(params.postId)).then(() => {
        //     LoaderService.closeModel('getPost1');
        // });
    }
    
    useEffect(() => {
        getPost();
        return () => {
            abortGetPost && abortGetPost.abort();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="container">
            <Alert />
            <NavLink to={RouteAPI.Posts} className="btn btn-light my-1">Back to Posts</NavLink>
            {post && (
                <Fragment>
                    <PostItem post={post} isAction={false} />
                    <CommentForm postId={post._id} />
                    <div className="comments">
                        {
                            post.comments.map((comment: any) => (
                                <CommentItem key={comment._id} comment={comment} postId={post._id} />
                            ))
                        }
                    </div>
                </Fragment>
            )}
            
        </section>
    )
}

export default Post;

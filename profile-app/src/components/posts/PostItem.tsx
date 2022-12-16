import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RouteAPI } from '../../core/constants/Route.api';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import { removeLikeAPI, removePostAPI, updateLikeAPI } from '../../store/slices/post/post';
import { LoaderService } from '../../shared/services/Loader.service';
import ConfirmDialog from '../../shared/models/ConfirmDialog';

interface PostItemProps {
    post: any;
    isAction: boolean;
}
function PostItem(props: PostItemProps) {
    let { isAuthenticated, user: User } = useSelector((state: any) => state.authReducer);
    let { user, text, name, avatar, _id, like, comments, date } = props.post;
    let dispatchEvent = useDispatch<any>();
    let [openDialog, setDialogState] = useState(false);
    let [deletePostId, setDeletePostId] = useState('');

    let addLike = (e: any, postId: string) => {
        e.preventDefault();
        dispatchEvent(updateLikeAPI(postId));
    }
    let removeLike = (e: any, postId: string) => {
        e.preventDefault();
        dispatchEvent(removeLikeAPI(postId));
    }

    let deletePost = (e: any, postId: string) => {
        e.preventDefault();
        setDialogState(true);
        setDeletePostId(postId);
    }

    let onDialogClose = (value: any) => {
        setDialogState(false);
        if (value) {
            LoaderService.openModel('deletePost', {appendTo: 'inline', appendToElement: 'button .load'});
            dispatchEvent(removePostAPI(deletePostId)).then(() => {
                LoaderService.closeModel('deletePost');
            });
        }
      }
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <NavLink to={RouteAPI.Profile + user}>
                <img
                    className="round-img"
                    src={avatar}
                    alt="profile"
                />
                <h4>{name}</h4>
                </NavLink>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">Posted on <Moment format="YYYY/MM/DD">{date}</Moment></p>
                {
                    props.isAction && (
                        <Fragment>
                            <button onClick={(e) => addLike(e, _id)} type="button" className="btn btn-light">
                                <i className="fa fa-thumbs-up"></i> {' '}
                                {like && like.length > 0 && (<span>{like.length}</span>)}
                            </button>
                            <button onClick={e => removeLike(e, _id)} type="button" className="btn btn-light">
                                <i className="fa fa-thumbs-down"></i>
                            </button>
                            <NavLink to={RouteAPI.Posts +'/' + _id} className="btn btn-primary">
                                Discussion {comments && comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
                            </NavLink>
                            {isAuthenticated && User.id === user && (
                                <button onClick={e => deletePost(e, _id)} type="button" className="btn btn-danger" >
                                    <i className="fa fa-times"></i> <span className="load"></span>
                                </button>
                            )}
                        </Fragment>
                    )
                }
                
            </div>
          <ConfirmDialog open={openDialog} onClose={onDialogClose} title="Are you sure, you want to delete the experience ?. Click Yes to delete."></ConfirmDialog>
        </div>
    )
}

export default PostItem;

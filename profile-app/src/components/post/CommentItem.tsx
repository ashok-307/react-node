import React from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';
import { removeCommentAPI } from '../../store/slices/post/post';

interface CommentItemProps {
    comment: any;
    postId: string;
}

function CommentItem(props: CommentItemProps) {
    let { comment: { _id, text, name, avatar, user, date }, postId } = props;
    let { isAuthenticated, user: User } = useSelector((state: any) => state.authReducer);
    let dispatchEvent = useDispatch<any>();

    let onDeleteComment = (e: any, postId: string, commentId: string) => {
        e.preventDefault();
        dispatchEvent(removeCommentAPI({postId, commentId}))
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
                    isAuthenticated && User.id === user && (
                        <button type="button" onClick={e => onDeleteComment(e, postId, _id)} className="btn btn-danger my-1">
                            <i className="fa fa-times"></i>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default CommentItem;

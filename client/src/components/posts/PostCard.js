import React from 'react';
import PropTypes from "prop-types";
import moment from "moment";
import {Link} from "react-router-dom";
import {Button, Icon} from "antd";
import _ from "lodash";
import "./PostCard.scss";

const PostCard = ({posts, user, like, unlike, deletepost, single}) => {

    const checkIfLiked = (postId, posts) => {
        return posts && _.find(posts.likes, (like) => (like.user === user._id)) ?
            <>
                <Button type="primary" onClick={() => unlike(postId)} data-id={postId}>
                    <Icon type="like"/>
                    <span>{posts.likes.length}</span>
                </Button>
            </>
            :
            <>
                <Button type="primary" className="like-button" onClick={() => like(postId)}>
                    <Icon type="like"/>
                    <span>{posts.likes.length}</span>
                </Button>
            </>
    };

    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post-wrapper__user">
                    <img src={posts.avatar} alt="Avatar"/>
                    <h5>{posts.name}</h5>
                </div>

                <div className="post-wrapper__comment">
                    <p>
                        {posts.text}
                    </p>
                    <span><b>Posted on:</b> {moment(posts.data).format("MMM-DDD-YYYY")}</span>
                    <div className="comments-buttons">
                        {checkIfLiked(posts._id, posts)}
                        <Button type="primary" className="discussion-count" style={single ? {display: "none"} : {display: "inline-block"}}>
                            <Link to={`/posts/${posts._id}`}>
                                Discussion <span>{posts.comments.length}</span>
                            </Link>
                        </Button>
                        {
                            user._id === posts.user ?
                                <Button type="danger" onClick={() => deletepost(posts._id)}>
                                    <Icon type="delete"/>
                                </Button>
                                : null
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

PostCard.propTypes = {
    posts: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default PostCard;
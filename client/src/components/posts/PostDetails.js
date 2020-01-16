import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getSinglePost, likePost, unlikePost, deletePost} from "../../store/actions/postActions";
import PostCard from "./PostCard";
import moment from "moment";
import _ from "lodash";
import "./PostDetails.scss";

const PostDetails = ({match, getSinglePost, post, userData, likePost, unlikePost, deletePost}) => {

    useEffect(() => {
        getSinglePost(match.params.id)
    }, []);

    const addLikeToPost = postId => {
        likePost(postId);
    };

    const unlikeAPost = postId => {
        unlikePost(postId)
    };

    const deleteAPost = postId => {
        deletePost(postId)
    };

    const renderPost = () => {
        if (!_.isEmpty(post)) {
            return <PostCard
                user={userData}
                posts={post}
                single={true}
                like={() => addLikeToPost(post._id)}
                unlike={() => unlikeAPost(post._id)}
                deletepost={() => deleteAPost(post._id)}
            />
        }
    };

    const renderPostComments = () => {
        if (!_.isEmpty(post)) {
            return _.map(post.comments, (comment, index) => {
                console.log(comment);
            })
        }
    };

    return (
        <div id="post-details">
            <div className="container">
                {renderPost()}
                {renderPostComments()}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        post: state.post.post,
        userData: state.auth.user,
    }
};

export default connect(mapStateToProps, {getSinglePost, likePost, unlikePost, deletePost})(PostDetails);
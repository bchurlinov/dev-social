import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {getSinglePost, likePost, unlikePost, deletePost, postComment} from "../../store/actions/postActions";
import PostCard from "./PostCard";
import moment from "moment";
import _ from "lodash";
import {Modal, Button, Input, message} from "antd";
import "./PostDetails.scss";

const {TextArea} = Input;

const PostDetails = ({match, getSinglePost, post, userData, likePost, unlikePost, deletePost, postComment}) => {

    const [modal, setModal] = useState({isVisible: false});
    const [input, setInput] = useState({comment: ""});

    const toggleModal = () => {
        setModal({
            ...modal,
            isVisible: !modal.isVisible
        })
    };

    const handleInput = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    };

    const submitComment = () => {
        if (input.comment.length !== 0) {
            postComment(post._id, {
                text: input.comment,
                name: userData.name,
                avatar: userData.avatar
            });

            setModal({
                ...modal,
                isVisible: !modal.isVisible
            })
        } else {
            error("This input shouldn't be empty. Please type something")
        }
    };

    const error = msg => {
        message.error(msg);
    };

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
                return (
                    <div className="post-details-wrap" key={index}>
                        <div className="post-details-wrap__item">
                            <img src={comment.avatar} alt="Avatar"/>
                        </div>

                        <div className="post-details-wrap__item">
                            <h6>{comment.name} wrote:</h6>
                            <p>{comment.text}</p>
                            <span><b>Posted on</b>: {moment(comment.date).format("DD-MMM-YYYY")}</span>
                        </div>
                    </div>
                )
            })
        }
    };

    return (
        <div id="post-details" className="animated fadeInDown">
            <div className="container">
                <div style={{marginBottom: "50px"}}>
                    {renderPost()}
                </div>
                <div className="text-center toggle-comment-modal">
                    <Button type="default" onClick={toggleModal}>
                        Comment on this post
                    </Button>
                </div>
                {renderPostComments()}
                <div className="toggle-comment-modal">
                </div>
            </div>

            <Modal
                title={<h4>Add a comment</h4>}
                visible={modal.isVisible}
                onCancel={toggleModal}
                footer={
                    <Button type="primary" onClick={submitComment}>
                        Submit comment
                    </Button>
                }
            >
                <div style={{padding: "30px 15px"}}>
                    <label>Comment</label>
                    <TextArea
                        name="comment"
                        onChange={handleInput}
                        rows={5}
                        placeholder="Post something interesting"
                    />
                </div>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        post: state.post.post,
        userData: state.auth.user,
    }
};

export default connect(mapStateToProps,
    {
        getSinglePost,
        likePost,
        unlikePost,
        deletePost,
        postComment
    })(PostDetails);
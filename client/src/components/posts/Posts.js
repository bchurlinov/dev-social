import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {loadPosts, addPost, deletePost, unlikePost, likePost} from "../../store/actions/postActions";
import PostCard from "./PostCard";
import {renderProfileSpinner} from "../../utilities/config";
import _ from "lodash";
import {Input, Button, message} from "antd";
import "./Posts.scss";

const {TextArea} = Input;

const Posts = ({posts, userData, addPost, likePost, unlikePost, deletePost, loadPosts, count, postsLoader}) => {

    const [input, setInput] = useState({
        text: ""
    });

    const [limit, setLimit] = useState({amount: 4});

    useEffect(() => {
        loadPosts(limit.amount)
    }, [limit]);

    const inputHandler = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    };

    const submitPost = () => {
        if (checkTextArea()) {
            addPost(input);
            success("Successfully posted");

            setInput({
                ...input,
                text: ""
            });

        } else {
            error("Post should contain at least 10 characters")
        }

    };

    const addLikeToPost = postId => {
        likePost(postId);
    };

    const unlikeAPost = postId => {
        unlikePost(postId)
    };

    const deleteAPost = postId => {
        deletePost(postId)
    };

    const checkTextArea = () => {
        return input.text.length >= 10;
    };

    const success = msg => {
        message.success(msg);
    };

    const error = msg => {
        message.error(msg)
    };

    const renderPosts = () => {
        return posts && _.map(posts, (post, index) => {
            return (
                <PostCard
                    key={index}
                    posts={post}
                    user={userData}
                    like={(id) => addLikeToPost(id)}
                    unlike={(id) => unlikeAPost(id)}
                    deletepost={(id) => deleteAPost(id)}
                />
            )
        });
    };

    const loadMorePosts = () => {
        setLimit({
            ...limit,
            amount: limit.amount + 4
        });
    };

    const checkPostsLength = () => {
       return posts.length === count ? "load-more-button" : ""
    };

    return (
        <div className="post-container">
            <div className="container">
                <div className="create-post">
                    <h2>Create a post</h2>
                    <div className="create-post__topic">
                        <div>
                            <img src={userData.avatar} alt="Avatar"/>
                            <p>{userData.name}</p>
                        </div>
                        <div>
                            <TextArea
                                rows={5}
                                name="text"
                                onChange={inputHandler}
                                value={input.text}
                                placeholder="Tell us something that our community will be really interested in"
                            />
                        </div>
                        <div>
                            <Button type="primary" onClick={submitPost}>
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
                <h2>Posts</h2>
                <div className="posts-wrapper">
                    {
                        posts.length !== 0 ?
                            renderPosts()
                            :
                            renderProfileSpinner()
                    }
                </div>
                <div className="text-center">
                    <Button
                        type="default"
                        onClick={loadMorePosts}
                        style={{marginTop: "20px"}}
                        className={checkPostsLength()}
                        loading={postsLoader}
                        disabled={postsLoader}
                    >
                        Load More Posts
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        userData: state.auth.user,
        count: state.post.count,
        postsLoader: state.post.postsLoader
    }
};

export default connect(mapStateToProps, {
    loadPosts,
    addPost,
    deletePost,
    likePost,
    unlikePost
})(Posts);
import axios from "axios";
import {url} from "../../utilities/config";
import {
    LOAD_POSTS,
    SINGLE_POST,
    POSTS_LOADER,
    LOAD_MORE_LESS,
    POST_DELETED_MESSAGE,
    CLEAR_POSTS
} from "../types";

export const loadPosts = (page = 1) => {
    return async (dispatch) => {
        dispatch({type: POSTS_LOADER});
        try {

            const posts = await axios.get(`${url}/posts?page=${page}`);
            console.log(posts);

            dispatch({
                type: LOAD_POSTS,
                payload: posts.data.data,
                count: posts.data.count
            });

        } catch (err) {
            console.log(err.response);
        }
    }
};

export const loadMoreLessAction = () => {
    return (dispatch) => {
        dispatch({type: LOAD_MORE_LESS});
    }
};

export const addPost = post => {
    return async (dispatch) => {
        try {

            const posted = await axios.post(`${url}/posts`, post);
            dispatch(loadPosts(1));

        } catch (err) {
            console.log(err);
        }
    }
};

export const getSinglePost = postId => {
    return async (dispatch) => {

        try {
            const post = await axios.get(`${url}/posts/${postId}`);
            dispatch({
                type: SINGLE_POST,
                payload: post.data
            })
        } catch (err) {
            console.log(err);
        }

    }
};

export const likePost = (postId, limit) => {
    return async (dispatch) => {
        try {

            const like = await axios.post(`${url}/posts/likes/${postId}`);
            dispatch(getSinglePost(postId));
            dispatch(loadPosts(limit));

        } catch (err) {
            console.log(err);
        }
    }
};

export const unlikePost = (postId, limit) => {
    return async (dispatch) => {
        try {

            const unlike = await axios.post(`${url}/posts/unlikes/${postId}`);
            dispatch(loadPosts(limit));
            dispatch(getSinglePost(postId));

        } catch (err) {
            console.log(err);
        }
    }
};

export const deletePost = postId => {
    return async (dispatch) => {
        try {
            const deletePost = await axios.delete(`${url}/posts/delete/${postId}`);
            dispatch(loadPosts());
            dispatch({
                type: POST_DELETED_MESSAGE
            });

            setTimeout(() => {
                dispatch({
                    type: CLEAR_POSTS
                })
            }, 1000);

        } catch (err) {
            console.log(err);
        }
    }
};

export const postComment = (postId, comment) => {
    return async (dispatch) => {
        try {

            const addComment = await axios.post(`${url}/posts/comments/${postId}`, comment);
            dispatch(getSinglePost(postId));

            // Add post comment via redux success message
        } catch (err) {
            console.log(err)
        }
    }
};
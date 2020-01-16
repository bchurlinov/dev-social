import axios from "axios";
import {url} from "../../utilities/config";
import {LOAD_POSTS, SINGLE_POST, POSTS_LOADER} from "../types";

export const loadPosts = (limit) => {
    return async (dispatch) => {
        dispatch({type: POSTS_LOADER});
        try {
            const posts = await axios.get(`${url}/posts?limit=${limit}`);
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

export const addPost = post => {
    return async (dispatch) => {
        try {

            const posted = await axios.post(`${url}/posts`, post);
            dispatch(loadPosts());

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

export const likePost = postId => {
    return async (dispatch) => {
        try {

            const like = await axios.post(`${url}/posts/likes/${postId}`);
            dispatch(getSinglePost(postId));
            dispatch(loadPosts());

        } catch (err) {
            console.log(err);
        }
    }
};

export const unlikePost = postId => {
    return async (dispatch) => {
        try {

            const unlike = await axios.post(`${url}/posts/unlikes/${postId}`);
            dispatch(loadPosts());
            dispatch(getSinglePost(postId));

        } catch (err) {
            console.log(err);
        }
    }
};

export const deletePost = postId => {
    return async (dispatch) => {
        try {

            console.log(postId);
            const deletePost = await axios.delete(`${url}/posts/delete/${postId}`);
            dispatch(loadPosts());

        } catch (err) {
            console.log(err);
        }
    }
};
import {
    LOAD_POSTS,
    SINGLE_POST,
    POSTS_LOADER,
    LOAD_MORE_LESS,
    POST_DELETED_MESSAGE,
    CLEAR_POSTS
} from "../types";

const initialState = {
    posts: [],
    post: {},
    count: null,
    postsLoader: false,
    loadMore: false,
    postDeletedMessage: ""
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS :
            return {
                ...state,
                posts: action.payload,
                count: action.count,
                postsLoader: false,
                loadMore: false

            };
        case SINGLE_POST :
            return {
                ...state,
                post: action.payload
            };
        case POSTS_LOADER :
            return {
                ...state,
                postsLoader: true
            };
        case LOAD_MORE_LESS :
            return {
                ...state,
                loadMore: true
            };
        case POST_DELETED_MESSAGE :
            return {
                ...state,
                postDeletedMessage: "Your post was successfully delete"
            };
        case CLEAR_POSTS :
            return {
                ...state,
                postDeletedMessage: ""
            };
        default:
            return state;
    }
};

export default postReducer;
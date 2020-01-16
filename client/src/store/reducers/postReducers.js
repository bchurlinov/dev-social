import {LOAD_POSTS, SINGLE_POST, POSTS_LOADER} from "../types";

const initialState = {
    posts: [],
    post: {},
    count: null,
    postsLoader: false
};

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_POSTS :
            return {
                ...state,
                posts: action.payload,
                count: action.count,
                postsLoader: false

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
        default:
            return state;
    }
};

export default postReducer;
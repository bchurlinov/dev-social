import {
    AUTH_LOADER,
    LOGIN_USER,
    CLEAR_AUTH,
    AUTH_ERROR_MESSAGE,
    AUTO_USER_AUTO,
    REGISTER_USER,
    LOG_OUT,
    LOAD_USER,
    CREATE_PROFILE
} from "../types";

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: [],
    errorMessage: "",
    profileCreated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER :
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_USER :
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case LOAD_USER :
            return {
                ...state,
                user: action.payload
            };
        case AUTH_LOADER :
            return {
                ...state,
                loading: true
            };
        case CLEAR_AUTH :
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                errorMessage: ""
            };
        case CREATE_PROFILE :
            return {
                ...state,
                loading: false
            }
        case AUTO_USER_AUTO :
            return {
                ...state,
                isAuthenticated: true
            };
        case AUTH_ERROR_MESSAGE :
            return {
                ...state,
                errorMessage: action.payload
            };
        case LOG_OUT :
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;

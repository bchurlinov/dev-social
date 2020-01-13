import axios from "axios";
import {url} from "../../utilities/config";
import {setToken, clearToken, requestInterceptor} from "../../utilities/LocalStorageService";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_LOADER,
    CLEAR_AUTH,
    AUTH_ERROR_MESSAGE,
    AUTO_USER_AUTO,
    LOG_OUT,
    LOAD_USER,
    CREATE_PROFILE
} from "../types";

export const registerUser = credentials => {
    return async (dispatch) => {
        dispatch({type: AUTH_LOADER});

        try {

            const register = await axios.post(`${url}/auth/register`, credentials);
            setToken(register.data.token);
            requestInterceptor(register.data.token);


            dispatch({
                type: REGISTER_USER
            })

        } catch (err) {
            console.log(err.response);

            dispatch({
                type: AUTH_ERROR_MESSAGE,
                payload: err.response.data.message
            });

            setTimeout(() => {
                dispatch({type: CLEAR_AUTH});
            }, 500);
        }
    }
};

export const logIn = credentials => {
    return async (dispatch) => {

        dispatch({type: AUTH_LOADER});

        try {
            const login = await axios.post(`${url}/auth/login`, credentials);
            setToken(login.data.token);
            requestInterceptor(login.data.token);

            dispatch({
                type: LOGIN_USER
            })

        } catch (err) {
            console.log(err.response);

            dispatch({
                type: AUTH_ERROR_MESSAGE,
                payload: err.response.data.message
            });

            setTimeout(() => {
                dispatch({type: CLEAR_AUTH});
            }, 500);
        }
    }
};

export const loadUser = () => {
    return async (dispatch) => {
        try {

            const userData = await axios.get(`${url}/auth/getuser`);

            dispatch({
                type: LOAD_USER,
                payload: userData.data
            });

        } catch (err) {
            console.log(err);
        }

    }
};

export const logOut = () => {
    return (dispatch) => {
        clearToken();
        dispatch({
            type: LOG_OUT
        })
    }
};

export const autoLoginUser = () => {
    return (dispatch) => {
        dispatch({
            type: AUTO_USER_AUTO
        })
    }
};

export const createProfile = profile => {
    return async (dispatch) => {
        dispatch({type: AUTH_LOADER});
        try {

            const skills = profile.skills.toString();
            const userProfile = {
                status: profile.status,
                website: profile.website,
                location: profile.location,
                bio: profile.bio,
                skills,
                facebook: "http://facebook.com/",
                twitter: "http://twitter.com/",
                github: "http://github.com/",
                linkedin: "http://linkedin.com/",
                youtube: "http://youtube.com/",
                instagram: "http://instagram.com/"
            };


            const profileCreation = await axios.post(`${url}/profile`, userProfile);

            await axios.post(`${url}/auth/edituser`);

            dispatch(loadUser());
            dispatch({
                type: CREATE_PROFILE
            })


        } catch (err) {
            console.log(err);
        }
    }
};

export const deleteUserAccount = () => {
    return async (dispatch) => {

        try {

            await axios.delete(`${url}/auth/delete-user`);
            clearToken();

            setTimeout(() => {
                dispatch({
                    type: LOG_OUT
                });
            }, 1000)


        } catch (err) {
            console.log(err);
        }
    }
};
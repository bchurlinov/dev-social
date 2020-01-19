import axios from "axios";
import {loadUser} from "./authActions";
import {url} from "../../utilities/config";
import {
    LOAD_PROFILES,
    GET_MY_PROFILE,
    EDIT_PROFILE,
    PROFILE_LOADER,
    CLEAR_PROFILE,
    PROFILE_UPDATED,
    EDUCATION_LOADER,
    EDIT_EDUCATION,
    GET_SINGLE_PROFILE,
    DELETE_EDUCATION,
    ADD_EXPERIENCE,
    EXPERIENCE_LOADER,
    DELETE_EXPERIENCE
} from "../types";


export const loadProfiles = (status = "", skills = "", location = "") => {
    return async (dispatch) => {
        try {

            console.log(status);
            console.log(skills);
            console.log(location);
            const profiles = await axios.get(`${url}/profile?status=${status}&skills=${skills}&location=${location}`);
            dispatch({
                type: LOAD_PROFILES,
                payload: profiles.data
            })

        } catch (err) {
            console.log(err);
        }
    }
};

export const getMyProfile = () => {
    return async (dispatch) => {
        try {

            const myProfile = await axios.get(`${url}/profile/me`);
            dispatch({
                type: GET_MY_PROFILE,
                payload: myProfile.data
            })

        } catch (err) {
            console.log(err)
        }
    }
};

export const getSingleProfile = params => {
    return async (dispatch) => {
        try {

            const profile = await axios.get(`${url}/profile/user/${params}`);

            dispatch({
                type: GET_SINGLE_PROFILE,
                payload: profile.data
            })

        } catch (err) {
            console.log(err);
        }
    }
};

export const editProfile = profile => {

    return async (dispatch) => {
        dispatch({type: PROFILE_LOADER});
        try {

            const skills = profile.skills.toString();

            const userProfile = {
                status: profile.status,
                website: profile.website,
                location: profile.location,
                bio: profile.bio,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                github: profile.github,
                youtube: profile.youtube,
                instagram: profile.instagram,
                twitter: profile.twitter,
                skills
            };

            const editProfile = await axios.post(`${url}/profile`, userProfile);
            if (editProfile) {
                await axios.post(`${url}/auth/edituser`, userProfile);

                dispatch({
                    type: EDIT_PROFILE
                });

                dispatch({
                    type: PROFILE_UPDATED
                });

                dispatch(loadUser());

                setTimeout(() => {
                    dispatch({type: CLEAR_PROFILE})
                }, 500);
            }


        } catch (err) {
            console.log(err);
        }
    }
};

export const deleteEducation = (educationId, params) => {
    return async (dispatch) => {
        try {

            await axios.delete(`${url}/profile/education/${educationId}`);

            dispatch({
                type: DELETE_EDUCATION
            });

            dispatch(getSingleProfile(params));

            setTimeout(() => {
                dispatch({type: CLEAR_PROFILE})
            }, 500);


        } catch (err) {
            console.log(err);
        }
    }
};

export const editEducation = education => {
    return async (dispatch) => {

        dispatch({type: EDUCATION_LOADER});

        try {

            await axios.post(`${url}/profile/add-education`, education);

            dispatch({
                type: EDIT_EDUCATION
            });

            dispatch({
                type: PROFILE_UPDATED
            });

            dispatch(loadUser());

            setTimeout(() => {
                dispatch({type: CLEAR_PROFILE})
            }, 500);


        } catch (err) {
            console.log(err);
        }
    }
};

export const addExperience = experience => {
    return async (dispatch) => {

        try {

            dispatch({
                type: EXPERIENCE_LOADER
            });

            await axios.post(`${url}/profile/add-experience`, experience);

            dispatch({type: ADD_EXPERIENCE});

            dispatch({
                type: PROFILE_UPDATED
            });

            dispatch(loadUser());

            setTimeout(() => {
                dispatch({type: CLEAR_PROFILE})
            }, 500);
        } catch (err) {
            console.log(err);
        }
    }
};

export const deleteExperience = (experienceId, params) => {
    return async (dispatch) => {
        try {

            console.log(experienceId);
            console.log(params);

            await axios.delete(`${url}/profile/experience/${experienceId}`);

            dispatch({
                type: DELETE_EXPERIENCE
            });

            dispatch(getSingleProfile(params));

            setTimeout(() => {
                dispatch({type: CLEAR_PROFILE})
            }, 500);


        } catch (err) {
            console.log(err);
        }
    }
};
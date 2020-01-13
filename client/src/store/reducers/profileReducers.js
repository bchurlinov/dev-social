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
    EXPERIENCE_LOADER,
    ADD_EXPERIENCE,
    DELETE_EXPERIENCE
} from "../types";

const initialState = {
    profiles: [],
    profile: [],
    isLoading: false,
    educationLoading: false,
    successMessage: "",
    errorMessage: "",
    successEducation: "",
    profileUpdated: false,
    educationDeletedMessage: "",
    experienceLoading: false,
    successExperience: "",
    experienceDeleteMessage: "",
    singleProfile: []
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PROFILES :
            return {
                ...state,
                profiles: action.payload
            };
        case GET_MY_PROFILE :
            return {
                ...state,
                profile: action.payload
            };
        case GET_SINGLE_PROFILE :
            return {
                ...state,
                singleProfile: action.payload
            };
        case EDIT_PROFILE :
            return {
                ...state,
                isLoading: false,
                successMessage: "Profile updated successfully"
            };
        case DELETE_EDUCATION :
            return {
                ...state,
                educationDeletedMessage: "Education successfully deleted"
            };
        case DELETE_EXPERIENCE :
            return {
                ...state,
                experienceDeleteMessage: "Experience successfully deleted"
            };
        case PROFILE_LOADER :
            return {
                ...state,
                isLoading: true
            };
        case EXPERIENCE_LOADER :
            return {
                ...state,
                experienceLoading: true
            };
        case EDUCATION_LOADER :
            return {
                ...state,
                educationLoading: true
            };
        case ADD_EXPERIENCE :
            return {
                ...state,
                experienceLoading: false,
                successExperience: "Experience successfully added"
            };
        case EDIT_EDUCATION :
            return {
                ...state,
                educationLoading: false,
                successEducation: "Education added successfully"
            };
        case CLEAR_PROFILE :
            return {
                ...state,
                isLoading: false,
                profileUpdated: false,
                educationLoading: false,
                successMessage: "",
                errorMessage: "",
                successEducation: "",
                educationDeletedMessage: "",
                successExperience: "",
                experienceLoading: false,
                experienceDeleteMessage: ""
            };
        case PROFILE_UPDATED :
            return {
                ...state,
                profileUpdated: true
            };
        default:
            return state
    }
};

export default profileReducer;
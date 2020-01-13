import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loadUser} from "./store/actions/authActions";
import {loadPosts} from "./store/actions/postActions";
import {requestInterceptor} from "./utilities/LocalStorageService";
import {loadProfiles} from "./store/actions/profileActions";
import ProfileCard from "./components/profiles/ProfileCard";
import PostCard from "./components/posts/PostCard";
import _ from "lodash";
import {Spin} from "antd";
import "./App.scss";

const App = ({loadUser, loadPosts, userData, loadProfiles, profiles}) => {

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token) {
            requestInterceptor(token);
            loadUser();
            loadProfiles();
            loadPosts();
        }
    }, []);

    const renderProfiles = () => {
        return _.map(profiles, (item, index) => {
            return <ProfileCard key={index} profile={item}/>
        })
    };

    const renderProfileSpinner = () => {
        return (
            <div className="profile-spinner">
                <Spin size="large"/>
            </div>
        )
    };

    if (!userData.profile) {
        return <Redirect to="/create-profile"/>
    }

    return (
        <>
            <div className="App container">
                <h1>Latest Profiles</h1>
                <div className="app-posts-container">
                    <div className="app-posts-container__item">
                        {profiles.length !== 0 ?
                            renderProfiles()
                            :
                            renderProfileSpinner()
                        }
                    </div>

                    <div className="app-posts-container__item">
                        <PostCard/>
                    </div>
                </div>
            </div>
        </>

    );
};

const mapStateToProps = state => {
    return {
        userData: state.auth.user,
        profiles: state.profile.profiles
    }
};

export default connect(mapStateToProps, {loadUser, loadProfiles, loadPosts})(App);

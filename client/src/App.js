import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {loadUser} from "./store/actions/authActions";
import {loadPosts, likePost, unlikePost, deletePost} from "./store/actions/postActions";
import {requestInterceptor} from "./utilities/LocalStorageService";
import {loadProfiles} from "./store/actions/profileActions";
import ProfileCard from "./components/profiles/ProfileCard";
import PostCard from "./components/posts/PostCard";
import {renderProfileSpinner} from "./utilities/config";
import {Button, message} from "antd";
import _ from "lodash";
import "./App.scss";

const App = ({loadUser, loadPosts, userData, loadProfiles, profiles, posts, likePost, unlikePost, deletePost, postDeletedMessage}) => {

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token) {
            requestInterceptor(token);
            loadUser();
            loadProfiles();
            loadPosts(4);
        }
    }, []);

    useEffect(() => {
        if(postDeletedMessage) {
            error(postDeletedMessage)
        }
    }, [postDeletedMessage]);

    const addLikeToPost = postId => {
        likePost(postId);
    };

    const unlikeAPost = postId => {
        unlikePost(postId)
    };

    const deleteAPost = postId => {
        deletePost(postId)
    };

    const renderProfiles = () => {
        return _.map(profiles.slice(0, 3), (item, index) => {
            return <ProfileCard key={index} profile={item}/>
        })
    };

    const renderPosts = () => {
        if (posts.length !== 0) {
            return _.map(posts.slice(0, 4), (item, index) => {
                return <PostCard
                    key={index}
                    posts={item}
                    user={userData}
                    like={(id) => addLikeToPost(id)}
                    unlike={(id) => unlikeAPost(id)}
                    deletepost={(id) => deleteAPost(id)}
                    single={false}
                />
            });
        } else {
            return renderProfileSpinner();
        }
    };

    const renderProfilesLink = () => {
        return profiles.length !== 0 && (
            <Button type="default" className="animated fadeInLeft">
                <Link to="/developers">
                    Find Developers
                </Link>
            </Button>)
    };

    const renderPostsLink = () => {
      return posts.length !== 0 && (
          <Button type="default" className="animated fadeInRight">
              <Link to="/posts">
                  Find Topics
              </Link>
          </Button>
      )
    };

    const error = msg => {
        message.error(msg);
    };

    if (!userData.profile) {
        return <Redirect to="/create-profile"/>
    }

    return (
        <>
            <div className="App container">
                <div className="app-posts-container">
                    <div className="app-posts-container__item">
                        <h3>Latest profiles</h3>
                        {profiles.length !== 0 ?
                            renderProfiles()
                            :
                            renderProfileSpinner()
                        }
                        <div className="text-center">
                            {renderProfilesLink()}
                        </div>
                    </div>

                    <div className="app-posts-container__item">
                        <h3>Latest topics</h3>
                        {renderPosts()}
                        <div className="text-center">
                            {renderPostsLink()}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

const mapStateToProps = state => {
    return {
        userData: state.auth.user,
        profiles: state.profile.profiles,
        posts: state.post.posts,
        postDeletedMessage: state.post.postDeletedMessage
    }
};

export default connect(mapStateToProps, {
    loadUser,
    loadProfiles,
    loadPosts,
    likePost,
    unlikePost,
    deletePost
})(App);

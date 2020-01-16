import React, {useState, useEffect} from 'react';
import {Redirect, Link} from "react-router-dom";
import {connect} from "react-redux";
import EditProfile from "./editprofile/EditProfile";
import Education from "./editprofile/Education";
import Experience from "./editprofile/Experience";
import {loadUser, deleteUserAccount} from "../../store/actions/authActions";
import {getMyProfile} from "../../store/actions/profileActions";
import {Icon, Menu, Dropdown, Modal, Button} from "antd";
import "./Dashboard.scss"

const Dashboard = ({isAuthenticated, loadUser, deleteUserAccount, getMyProfile, profile, history}) => {

    useEffect(() => {
        loadUser();
        getMyProfile();
    }, []);

    const [modal, setModal] = useState({isVisible: false});

    const toggleModal = () => {
        setModal({
            ...modal,
            isVisible: !modal.isVisible
        })
    };

    const deleteAcc = () => {
        deleteUserAccount();
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to={`/profile/${profile.user && profile.user._id}`}>
                    View your profile
                </Link>
            </Menu.Item>
            <Menu.Item>
                <a href="# " className="delete-account" onClick={toggleModal}>
                    Delete your account
                </a>
            </Menu.Item>
        </Menu>
    );

    if (!isAuthenticated) {
        return <Redirect to="/auth"/>
    }

    console.log(profile);
    return (
        <div className="container">
            <div id="dashboard">
                <div className="dashboard-header">
                    <h2><Icon type="profile"/> Dashboard</h2>
                    <h4>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <a className="ant-dropdown-link" href="# ">
                                <Icon type="user"/> Welcome, {" "} {profile.user && profile.user.name} <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </h4>
                    <div className="clearfix">{""}</div>
                </div>

                <div className="dashboard-wrapper">
                    <div className="dashboard-edit-profile">
                        <h3><Icon type="setting"/> Edit Profile</h3>
                        <EditProfile
                            profile={profile}
                            key={Math.random()}
                            history={history}
                        />
                    </div>

                    <div className="dashboard-edit-profile">
                        <h3><Icon type="flag"/> Add Experience</h3>
                        <Experience
                            profile={profile}
                            key={Math.random()}
                            history={history}
                        />
                    </div>

                    <div className="dashboard-edit-profile">
                        <h3><Icon type="book"/> Add Education</h3>
                        <Education
                            profile={profile}
                            key={Math.random()}
                            history={history}
                        />
                    </div>

                </div>
            </div>

            <Modal
                visible={modal.isVisible}
                onCancel={toggleModal}
                className="delete-account-modal"
                title={
                    <h4>
                        <Icon type="warning"/>Delete your account
                    </h4>
                }
                footer={
                    <Button type="danger" onClick={deleteAcc}>Delete Account</Button>
                }
            >
                <p>This will delete your account permanently</p>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profile: state.profile.profile
    }
};

export default connect(mapStateToProps, {loadUser, getMyProfile, deleteUserAccount})(Dashboard);
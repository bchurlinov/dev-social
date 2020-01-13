import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {loadUser} from "../../../store/actions/authActions";
import {editProfile} from "../../../store/actions/profileActions";
import {Input, Select, Spin, Button, Icon, message} from "antd";
import {getUserPosition} from "../../../utilities/config";
import "./EditProfile.scss";

const {TextArea} = Input;
const {Option} = Select;

const EditProfile = ({profile, editProfile, isLoading, successMessage, loadUser, profileUpdated, history}) => {

    const [inputs, setInputs] = useState({
        status: "",
        skills: [],
        website: "",
        location: "",
        bio: "",
        facebook: "",
        instagram: "",
        youtube: "",
        github: "",
        linkedin: "",
        twitter: ""
    });

    useEffect(() => {
        if (successMessage) {
            success(successMessage);
            loadUser();
        }
    }, [successMessage]);

    useEffect(() => {
        if (profileUpdated) {
            setTimeout(() => {
                history.push(`/profile/${profile.user._id}`);
            }, 2000)
        }
    }, [profileUpdated])

    const selectChange = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    };

    const inputHandler = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    };

    const submitHandler = event => {
        event.preventDefault();

        if (editFormValid()) {
            editProfile(inputs);
        }
    };

    const editFormValid = () => {
        if (!checkLocation()) {
            error("Location should contain at least 2 characters");
            return false;
        } else if (!skillsInput()) {
            error("You need to have at least 1 skill");
            return false
        } else if (!checkValidUrl()) {
            error("Please enter a valid website URL");
            return false;
        } else {
            return true;
        }
    };

    const skillsInput = () => {
        return inputs.skills.length > 0 || profile.skills.length !== 0;
    };

    const checkValidUrl = () => {
        return !!(inputs.website.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm) || profile.website.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm));
    };

    // const checkSocialValidUrl = () => {
    //     const matchReg = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    //
    //     return !!(inputs.facebook.match(matchReg) || inputs.github.match(matchReg) || inputs.linkedin.match(matchReg) || inputs.instagram.match(matchReg) || inputs.twitter.match(matchReg) || inputs.youtube.match(matchReg));
    // };

    const checkLocation = () => {
        return inputs.location.length > 2 || inputs.location.length === 0
    };

    const skills = profile.skills !== undefined ? profile.skills : null;

    const error = msg => {
        message.error(msg);
    };

    const success = msg => {
        message.success(msg);
    };

    return (
        <div className="edit-user-wrap">
            <form onSubmit={submitHandler} className="edit-user-form" noValidate>
                {profile.length !== 0 ?
                    <>
                        <div className="edit-user-form__group">
                            <label>Edit your status:</label>
                            <Select
                                placeholder={profile.status && getUserPosition(profile.status)}
                                onChange={(value) => selectChange(value, "status")}
                                allowClear={true}
                            >
                                <Option value="front_end">Front End Developer</Option>
                                <Option value="back_end">Back End Developer</Option>
                                <Option value="full_stack">Full Stack Developer</Option>
                            </Select>
                        </div>
                        <div className="edit-user-form__group">
                            <label>Edit your location:</label>
                            <Input
                                name="location"
                                placeholder={profile.location ? profile.location : "Where are you from ?"}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="edit-user-form__group">
                            <label>Edit your personal website:</label>
                            <Input
                                name="website"
                                placeholder={profile.website ? profile.website : "Do you have your own personal website ?"}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="edit-user-form__group">
                            <label>Edit your personal skills:</label>
                            <Select
                                mode="multiple"
                                defaultValue={skills}
                                onChange={(value) => selectChange(value, "skills")}
                            >
                                <Option value="html5">HTML 5</Option>
                                <Option value="css3">CSS 3</Option>
                                <Option value="javascript">Javascript</Option>
                                <Option value="jquery">JQuery</Option>
                                <Option value="node">Node.js</Option>
                                <Option value="php">PHP</Option>
                                <Option value="python">Python</Option>
                                <Option value="bootstrap">Bootstrap</Option>
                                <Option value="react">React.JS</Option>
                                <Option value="vue">Vue.JS</Option>
                                <Option value="angular">Angular.JS</Option>
                            </Select>
                        </div>

                        <div className="edit-user-form__group">
                            <label>Edit your bio:</label>
                            <TextArea
                                name="bio"
                                rows={5}
                                placeholder={profile.bio ? profile.bio : "Tell us something about yourself"}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="edit-user-form__group">
                            <label><Icon type="facebook"/>Facebook:</label>
                            <Input
                                name="facebook"
                                placeholder={profile.social ? profile.social.facebook : "Enter your Facebook's URL"}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="edit-user-form__group">
                            <label><Icon type="linkedin"/>Linkedin:</label>
                            <Input
                                name="linkedin"
                                placeholder={profile.social ? profile.social.linkedin : "Enter your Linkedin's URL"}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="edit-user-form__group">
                            <label><Icon type="github"/>Github:</label>
                            <Input
                                name="github"
                                placeholder={profile.social ? profile.social.github : "Enter your Github's URL"}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="edit-user-form__group">
                            <label><Icon type="youtube"/>Youtube:</label>
                            <Input
                                name="youtube"
                                placeholder={profile.social ? profile.social.youtube : "Enter your Youtube's URL"}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="edit-user-form__group">
                            <label><Icon type="instagram"/>Instagram:</label>
                            <Input
                                name="instagram"
                                placeholder={profile.social ? profile.social.instagram : "Enter your Instagram's URL"}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="edit-user-form__group">
                            <label><Icon type="twitter"/>Twitter:</label>
                            <Input
                                name="twitter"
                                placeholder={profile.social ? profile.social.twitter : "Enter your Twitter's URL"}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="edit-user-form__group">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Submit Changes
                            </Button>
                        </div>
                    </>
                    :
                    <Spin size="large"/>
                }

            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.profile.isLoading,
        successMessage: state.profile.successMessage,
        errorMessage: state.profile.successMessage,
        profileUpdated: state.profile.profileUpdated
    }
};

export default connect(mapStateToProps, {editProfile, loadUser})(EditProfile);
import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {createProfile, loadUser} from "../../store/actions/authActions";
import {Input, Select, Button, Icon, message, Progress} from "antd";
import Loader from "../widgets/Loader";
import _ from "lodash";
import "./CreateProfiles.scss";

const {Option} = Select;
const {TextArea} = Input;

const CreateProfile = ({createProfile, userData, loading, history}) => {

    useEffect(() => {
        if (userData.profile) {
            history.push("/");
        }
    }, [userData]);

    const [inputs, setInputs] = useState({
        status: "",
        skills: [],
        website: "",
        location: "",
        bio: ""
    });

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
        if (formValid()) {
            createProfile(inputs);
        }
    };


    const formValid = () => {
        if (inputFields()) {
            error("All fields should be populated");
            return false;
        } else if (!checkValidUrl()) {
            error("Please enter a valid website URL");
            return false;
        } else {
            return true;
        }
    };

    const inputFields = () => {
        return (
            !inputs.status.length || !inputs.skills.length || !inputs.website.length || !inputs.location.length || !inputs.bio.length
        )
    };

    const checkValidUrl = () => {
        return !!inputs.website.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm);
    };


    const error = msg => {
        message.error(msg);
    };

    const success = msg => {
        message.success(msg);
    };

    return (
        <>
            {userData.length !== 0 ?
                <div className="container">
                    <div className="create-profile-wrap">
                        <h2>Create your profile</h2>
                        <h3><Icon type="user"/> Let's get some information to make your profile stand out</h3>
                    </div>
                    <form className="create-profile-form" onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>What type of developer are you ?</label>
                            <Select
                                placeholder="Choose from the options"
                                onChange={(value) => selectChange(value, "status")}
                                allowClear={true}
                            >
                                <Option value="front_end">Front End Developer</Option>
                                <Option value="back_end">Back End Developer</Option>
                                <Option value="full_stack">Full Stack Developer</Option>
                            </Select>
                        </div>

                        <div className="form-group">
                            <label>What type of skills do you posses as a developer ?</label>
                            <Select
                                mode="multiple"
                                name="skills"
                                placeholder="Select at least one skill"
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

                        <div className="form-group">
                            <label>Please share a link to your personal website</label>
                            <Input
                                name="website"
                                placeholder="Example: https://www.bojanchurlinov.com"
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="form-group">
                            <label>Where do you live ?</label>
                            <Input
                                name="location"
                                placeholder="Location"
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="form-group">
                            <label>A short bio of yourself</label>
                            <TextArea rows={5}
                                      name="bio"
                                      placeholder="Tell us something about yourself"
                                      onChange={inputHandler}
                            />
                        </div>

                        <div className="form-group text-center">
                            <Button type="primary" htmlType="submit" loading={loading}>Submit Profile</Button>
                        </div>
                    </form>
                </div>

                :

                <Loader/>
            }

        </>
    );
};

const mapStateToProps = state => {
    return {
        userData: state.auth.user,
        loading: state.auth.loading
    }
};


export default connect(mapStateToProps, {createProfile, loadUser})(CreateProfile);
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {deleteEducation, deleteExperience, getSingleProfile} from "../../store/actions/profileActions";
import moment from "moment"
import {getUserPosition} from "../../utilities/config";
import {Icon, Button, message, Popconfirm, Modal} from "antd"
import Loader from "../widgets/Loader";
import _ from "lodash";
import "./Profile.scss";

const Profile = ({match, history, user, getSingleProfile, deleteExperience, deleteEducation, singleProfile, educationDeletedMessage, experienceDeleteMessage}) => {

    const [modal, setModal] = useState({isVisible: false});

    const toggleModal = () => {
        setModal({
            ...modal,
            isVisible: !modal.isVisible
        })
    };

    const renderTopics = () => {
        return _.map(singleProfile, profile => {
            return _.map(profile.topics, (topic, index) => {
                return (
                    <div key={index}>
                        <Link to={`/posts/${topic._id}`}>
                            <div className="modal-topic-wrap">
                                <div>
                                    <img src={topic.avatar} alt="avatar"/>
                                    <p>{topic.name}</p>
                                </div>
                                <div>
                                    <p>{topic.text}</p>
                                    <span><b>Posted on</b>: {moment(topic.date).format("MMM-DDD-YYYY")}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
        })
    };

    useEffect(() => {
        if (experienceDeleteMessage) {
            success(experienceDeleteMessage);
        }
    }, [experienceDeleteMessage]);

    useEffect(() => {
        getSingleProfile(match.params.id);
    }, []);

    useEffect(() => {
        if (educationDeletedMessage) {
            success(educationDeletedMessage);
        }
    }, [educationDeletedMessage]);

    const success = msg => {
        message.success(msg);
    };

    const getSkills = skills => {
        return _.map(skills, (skill, index) => {
            return (
                <li key={index}>
                    <Icon type="check"/> {skill.toUpperCase()}
                </li>
            )
        })
    };

    const renderSocial = social => {
        return _.map(social, (item, index) => {
            if (item) {
                return (
                    <li key={index}>
                        <a href={`http://www.${index}.com`} target="_blank">
                            <Icon type={index}/>
                        </a>
                    </li>
                )
            }

        })
    };

    const currentCheck = (to, current) => {
        if (!current) {
            return moment(to).format("MMM DD YYYY")
        } else {
            return "Current"
        }
    };

    const websiteCheck = item => {
        if (item.website) {
            return (
                <p>
                    <Icon type="global"/>
                    <b>{item.user.name}'s personal website:</b>
                    <a href={item.website}>{item.website}</a>
                </p>
            )
        } else {
            return (
                <p>{item.user.name} hasn't submitted personal website</p>
            )
        }
    };

    const confirmAndDeleteEducation = educationId => {
        deleteEducation(educationId, match.params.id);
    };

    const checkUserDeleteEducation = (profileUser, user, educationId) => {
        if (profileUser === user._id) {
            return (
                <Popconfirm
                    title="Are you sure delete this education ?"
                    onConfirm={() => confirmAndDeleteEducation(educationId)}
                    okText="Yes"
                    cancelText="No"
                >
                    <span className="delete-education"><Icon
                        type="delete"/></span>
                </Popconfirm>
            )
        }
    };

    const checkUserDeleteExperience = (profileUser, user, experienceId) => {
        if (profileUser === user._id) {
            return (
                <Popconfirm
                    title="Are you sure delete this education ?"
                    onConfirm={() => confirmAndDeleteExperience(experienceId)}
                    okText="Yes"
                    cancelText="No"
                >
                    <span className="delete-experience"><Icon
                        type="delete"/></span>
                </Popconfirm>
            )
        }
    };

    const confirmAndDeleteExperience = experienceId => {
        deleteExperience(experienceId, match.params.id);
    };

    const renderProfile = () => {
        return singleProfile && _.map(singleProfile, (item, index) => {

            const profileEducation = () => {
                return _.map(item.education, (edu, index) => {
                    return (
                        <div key={index}>
                            <div className="single-profile-education__item">
                                <h3>{edu.school} {checkUserDeleteEducation(item.user._id, user, edu._id)}</h3>
                                <p>
                                    <b>Period: </b>{moment(edu.from).format("MMM DD YYYY")} - {currentCheck(edu.to, edu.current)}
                                </p>
                                <p><b>Degree: </b> {edu.degree}</p>
                                <p><b>Field of Study: </b> {edu.fieldofstudy}</p>
                                <p><b>Description:</b> {edu.description}</p>
                            </div>
                        </div>
                    )
                });
            };

            const profileExperience = () => {
                return _.map(item.experience, (exp, index) => {
                    return (
                        <div key={index}>
                            <div className="single-profile-experience__item">
                                <h3>{exp.company} {checkUserDeleteExperience(item.user._id, user, exp._id)}</h3>
                                <p>
                                    <b>Period: </b>{moment(exp.from).format("MMM DD YYYY")} - {currentCheck(exp.to, exp.current)}
                                </p>
                                <p><b>Position: </b> {exp.position}</p>
                                <p><b>Location: </b> {exp.location}</p>
                                <p><b>Description:</b> {exp.description}</p>
                            </div>
                        </div>
                    )
                })
            };

            return (
                <div key={index}>
                    <div className="single-profile">
                        <div className="single-profile-header">
                            <div className="single-profile-header__upper">
                                <div className="profile-image-wrapper">
                                    <img src={item.user.avatar} alt="Avatar"/>
                                </div>
                            </div>
                            <div className="single-profile-header__lower">
                                <h2>{item.user.name}</h2>
                                <h3>{getUserPosition(item.status)} Developer</h3>
                                <h4>Macedonia, {_.startCase(_.toLower(item.location))}</h4>
                                <div className="social-medias">
                                    <ul>
                                        {renderSocial(item.social)}
                                    </ul>
                                </div>
                                <div>
                                    <Button type="primary" onClick={toggleModal}>
                                        <span>{item.user.name}</span>' latest topics
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="single-profile-bio">
                            <h3>{item.user.name}'s Biography:</h3>
                            <p>
                                {item.bio}
                            </p>
                        </div>

                        <div className="single-profile-website">
                            {websiteCheck(item)}
                        </div>

                        <div className="single-profile-skills">
                            <h3><span>{item.user.name}</span>'s skills and areas of expertise:</h3>
                            <ul>
                                {getSkills(item.skills)}
                            </ul>
                        </div>

                        <div className="education-experience-wrap">

                            <div className="single-profile-experience">
                                <h2>Experience</h2>
                                {
                                    item.experience.length !== 0 ?
                                        profileExperience()
                                        :
                                        <p>{item.user.name} hasn't submitted any experience yet.</p>
                                }
                            </div>

                            <div className="single-profile-education">
                                <h2>Education</h2>
                                {
                                    item.education.length !== 0 ?
                                        profileEducation()
                                        :
                                        <p>{item.user.name} hasn't submitted any education yet.</p>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            )
        })
    };

    const checkIfTopics = () => {
        if (!_.isEmpty(singleProfile)) {
            return _.map(singleProfile, (item,index) => {
                return item.topics.length !== 0 ? renderTopics() : <div key={index}><p>Nothing to show</p></div>
            })
        }
    };

    return (
        <div id="single-profile" className="container">
            <Button onClick={history.goBack} type="primary" className="single-profile-back">
                <span><Icon type="left"/>{" "} Back</span>
            </Button>
            <div className="single-profile-wrap">
                {singleProfile.length !== 0 ?
                    renderProfile()
                    :
                    <Loader/>
                }

            </div>

            <Modal
                title="Latest topics"
                visible={modal.isVisible}
                onCancel={toggleModal}
                footer={null}
            >
                {checkIfTopics()}

            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        singleProfile: state.profile.singleProfile,
        educationDeletedMessage: state.profile.educationDeletedMessage,
        experienceDeleteMessage: state.profile.experienceDeleteMessage
    }
};

export default connect(mapStateToProps, {deleteEducation, getSingleProfile, deleteExperience})(Profile);